// --- CONEXIÓN DE SEGURIDAD ---
const supabaseUrl = 'https://pbxrqkcktetukqtehwns.supabase.co';
const supabaseKey = 'sb_publishable_s0eLXKp2okSYwppwrQvEVw_JNMKCIKw';
const clientSupabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- 1. DESCARGAR TODO DESDE LA NUBE ---
async function sincronizarTodoDesdeLaNube() {
    try {
        console.log("🔄 Descargando actualizaciones de la nube...");
        const { data, error } = await clientSupabase.from('quinielas').select('*');
        if (error) throw error;

        if (data) {
            // CAZA-FANTASMAS: Limpiamos las quinielas locales previas por si borraste algo en Supabase
            Object.keys(localStorage).forEach(key => {
                if (key.startsWith('quiniela_')) localStorage.removeItem(key);
            });

            data.forEach(fila => {
                if (fila.usuario && fila.predicciones) {
                    localStorage.setItem(`quiniela_${fila.usuario}`, JSON.stringify(fila.predicciones));
                }
                
                // ANTI-CACHÉ: Le ponemos la hora exacta al final de la URL para que el navegador baje la foto nueva obligatoriamente
                const timestamp = new Date().getTime();
                const urlFotoPublica = `${supabaseUrl}/storage/v1/object/public/avatares/${fila.usuario}.png?t=${timestamp}`;
                localStorage.setItem(`foto_${fila.usuario}`, urlFotoPublica);
            });
            
            if (typeof actualizarTablaGeneral === 'function') actualizarTablaGeneral();
            if (typeof dibujarAlineacionCancha === 'function') dibujarAlineacionCancha();
            console.log("✅ Sincronización local completada y limpia de fantasmas.");
        }
    } catch (err) {
        console.error("❌ Error al descargar de Supabase:", err.message);
    }
}

// --- 2. SUBIR PREDICCIONES A LA NUBE ---
async function subirQuinielaALaNube(usuario, predicciones) {
    try {
        console.log(`📤 Subiendo pronósticos de la quiniela de ${usuario}...`);
        const { error } = await clientSupabase
            .from('quinielas')
            .upsert({ usuario: usuario, predicciones: predicciones, updated_at: new Date().toISOString() });

        if (error) throw error;
        console.log("✅ Quiniela guardada con éxito en la nube.");
    } catch (err) {
        console.error("❌ Error al subir quiniela:", err.message);
    }
}

// --- 3. SUBIR FOTO DE PERFIL A LA NUBE ---
async function subirFotoALaNube(usuario, archivoImagen) {
    try {
        console.log(`📤 Subiendo archivo de imagen de ${usuario} al Storage...`);
        const { error } = await clientSupabase.storage
            .from('avatares')
            .upload(`${usuario}.png`, archivoImagen, { cacheControl: '0', upsert: true }); // cacheControl en 0 es vital

        if (error) throw error;
        
        const timestamp = new Date().getTime();
        const urlFotoPublica = `${supabaseUrl}/storage/v1/object/public/avatares/${usuario}.png?t=${timestamp}`;
        localStorage.setItem(`foto_${usuario}`, urlFotoPublica);
        
        await clientSupabase.from('quinielas').upsert({ usuario: usuario });

        console.log("✅ Foto guardada y reemplazada con éxito en el Storage.");
        if (typeof dibujarAlineacionCancha === 'function') dibujarAlineacionCancha();
    } catch (err) {
        console.error("❌ Error al subir la foto al Storage:", err.message);
    }
}

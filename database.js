// --- CONEXIÓN DE SEGURIDAD ---
const supabaseUrl = 'https://pbxrqkcktetukqtehwns.supabase.co';
const supabaseKey = 'sb_publishable_s0eLXKp2okSYwppwrQvEVw_JNMKCIKw';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- 1. DESCARGAR TODO DESDE LA NUBE ---
async function sincronizarTodoDesdeLaNube() {
    try {
        console.log("🔄 Descargando actualizaciones de la nube...");
        const { data, error } = await supabase.from('quinielas').select('*');
        if (error) throw error;

        if (data) {
            data.forEach(fila => {
                // Sincroniza las predicciones en el LocalStorage de cada usuario
                if (fila.usuario && fila.predicciones) {
                    localStorage.setItem(`quiniela_${fila.usuario}`, JSON.stringify(fila.predicciones));
                }
                
                // Las fotos ahora tienen una URL fija y pública en el Storage basado en su nombre
                const urlFotoPublica = `${supabaseUrl}/storage/v1/object/public/avatares/${fila.usuario}.png`;
                localStorage.setItem(`foto_${fila.usuario}`, urlFotoPublica);
            });
            
            // Refrescar pantallas de la Quiniela de forma segura
            if (typeof actualizarTablaGeneral === 'function') actualizarTablaGeneral();
            if (typeof dibujarAlineacionCancha === 'function') dibujarAlineacionCancha();
            console.log("✅ Sincronización local completada.");
        }
    } catch (err) {
        console.error("❌ Error al descargar de Supabase:", err.message);
    }
}

// --- 2. SUBIR PREDICCIONES A LA NUBE ---
async function subirQuinielaALaNube(usuario, predicciones) {
    try {
        console.log(`📤 Subiendo pronósticos de la quiniela de ${usuario}...`);
        
        // Al ser 'usuario' la Primary Key, upsert guarda directo o actualiza si ya existe
        const { error } = await supabase
            .from('quinielas')
            .upsert({ 
                usuario: usuario, 
                predicciones: predicciones, 
                updated_at: new Date().toISOString() 
            });

        if (error) throw error;
        console.log("✅ Quiniela guardada con éxito en la nube.");
    } catch (err) {
        console.error("❌ Error al subir quiniela:", err.message);
    }
}

// --- 3. SUBIR FOTO DE PERFIL A LA NUBE (ADJUNTO DIRECTO AL STORAGE) ---
async function subirFotoALaNube(usuario, archivoImagen) {
    try {
        console.log(`📤 Subiendo archivo de imagen de ${usuario} al Storage...`);
        
        // Subimos el archivo adjunto real a la carpeta pública 'avatares' con el nombre del usuario
        // Usamos upsert: true para que si ya existe la foto, la reemplace/sobreescriba en silencio
        const { error } = await supabase.storage
            .from('avatares')
            .upload(`${usuario}.png`, archivoImagen, {
                cacheControl: '3600',
                upsert: true
            });

        if (error) throw error;
        
        // Generamos su ruta estática y la guardamos en local para uso inmediato
        const urlFotoPublica = `${supabaseUrl}/storage/v1/object/public/avatares/${usuario}.png`;
        localStorage.setItem(`foto_${usuario}`, urlFotoPublica);
        
        // Aseguramos que la fila del usuario exista en la tabla para que aparezca en la cancha
        await supabase.from('quinielas').upsert({ usuario: usuario });

        console.log("✅ Foto guardada y reemplazada con éxito en el Storage.");
        
        if (typeof dibujarAlineacionCancha === 'function') dibujarAlineacionCancha();
    } catch (err) {
        console.error("❌ Error al subir la foto al Storage:", err.message);
    }
}

// --- CONEXIÓN DE SEGURIDAD A SUPABASE ---
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
                // Sincroniza las fotos de perfil en el LocalStorage de cada usuario
                if (fila.usuario && fila.foto_perfil) {
                    localStorage.setItem(`foto_${fila.usuario}`, fila.foto_perfil);
                }
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
        console.log(`📤 Consultando existencia de la quiniela de ${usuario}...`);
        
        // Buscamos si ya existe una fila creada para este usuario
        const { data: existente, error: errFetch } = await supabase
            .from('quinielas')
            .select('id')
            .eq('usuario', usuario)
            .maybeSingle();

        if (errFetch) throw errFetch;

        if (existente) {
            // Si el usuario ya existe, actualizamos sus predicciones usando su ID único
            console.log(`📝 Actualizando pronósticos en el registro ID: ${existente.id}`);
            const { error } = await supabase
                .from('quinielas')
                .update({ predicciones: predicciones, updated_at: new Date().toISOString() })
                .eq('id', existente.id);
            if (error) throw error;
        } else {
            // Si es la primera vez del usuario, insertamos la fila completa
            console.log(`🆕 Creando nueva fila de quiniela para: ${usuario}`);
            const { error } = await supabase
                .from('quinielas')
                .insert([{ usuario: usuario, predicciones: predicciones }]);
            if (error) throw error;
        }
        console.log("✅ Quiniela guardada con éxito en la nube.");
    } catch (err) {
        console.error("❌ Error al subir quiniela:", err.message);
    }
}

// --- 3. SUBIR FOTO DE PERFIL A LA NUBE ---
async function subirFotoALaNube(usuario, fotoBase64) {
    try {
        console.log(`📤 Consultando existencia para actualizar foto de ${usuario}...`);
        
        const { data: existente, error: errFetch } = await supabase
            .from('quinielas')
            .select('id')
            .eq('usuario', usuario)
            .maybeSingle();

        if (errFetch) throw errFetch;

        if (existente) {
            // Si ya existe la fila, actualizamos la columna de la foto
            console.log(`📝 Actualizando columna de foto en ID: ${existente.id}`);
            const { error } = await supabase
                .from('quinielas')
                .update({ foto_perfil: fotoBase64, updated_at: new Date().toISOString() })
                .eq('id', existente.id);
            if (error) throw error;
        } else {
            // Si no existe, creamos el registro inicial guardando la foto
            console.log(`🆕 Creando registro inicial con foto para: ${usuario}`);
            const { error } = await supabase
                .from('quinielas')
                .insert([{ usuario: usuario, foto_perfil: fotoBase64, predicciones: {} }]);
            if (error) throw error;
        }
        console.log("✅ Foto guardada con éxito en la nube.");
    } catch (err) {
        console.error("❌ Error al subir la foto:", err.message);
    }
}

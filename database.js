// --- CONEXIÓN DE SEGURIDAD A SUPABASE ---
const supabaseUrl = 'https://pbxrqkcktetukqtehwns.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBieHJxa2NrdGV0dWtxdGVod25zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIyOTQyMTMsImV4cCI6MjA5Nzg3MDIxM30.6OMrxTw-vslZtBwtiM3rK7ZAS4BalvfoEBon02cW12w';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// --- 1. SINCRONIZAR TODO DESDE LA NUBE ---
async function sincronizarTodoDesdeLaNube() {
    try {
        const { data, error } = await supabase.from('quinielas').select('*');
        if (error) throw error;

        if (data) {
            data.forEach(fila => {
                // Sincroniza predicciones en el LocalStorage local
                if (fila.predicciones) {
                    localStorage.setItem(`quiniela_${fila.usuario}`, JSON.stringify(fila.predicciones));
                }
                // Sincroniza las fotos de perfil en el LocalStorage local
                if (fila.foto_perfil) {
                    localStorage.setItem(`foto_${fila.usuario}`, fila.foto_perfil);
                }
            });
            
            // Re-renderiza la interfaz con los nuevos datos de internet
            if (typeof actualizarTablaGeneral === 'function') actualizarTablaGeneral();
            if (typeof dibujarAlineacionCancha === 'function') dibujarAlineacionCancha();
        }
    } catch (err) {
        console.error("Error al descargar datos de Supabase:", err.message);
    }
}

// --- 2. SUBIR PREDICCIONES A LA NUBE ---
async function subirQuinielaALaNube(usuario, predicciones) {
    try {
        // Primero verificamos si el usuario ya tiene una fila creada
        const { data } = await supabase.from('quinielas').select('usuario').eq('usuario', usuario).single();

        let payload = { usuario: usuario, predicciones: predicciones };

        if (data) {
            // Si ya existe, actualizamos su registro
            await supabase.from('quinielas').update(payload).eq('usuario', usuario);
        } else {
            // Si es nuevo, insertamos la fila por primera vez
            await supabase.from('quinielas').insert([payload]);
        }
    } catch (err) {
        console.error("Error al subir quiniela:", err.message);
    }
}

// --- 3. SUBIR FOTO DE PERFIL A LA NUBE ---
async function subirFotoALaNube(usuario, base64Foto) {
    try {
        const { data } = await supabase.from('quinielas').select('usuario').eq('usuario', usuario).single();

        let payload = { usuario: usuario, foto_perfil: base64Foto };

        if (data) {
            await supabase.from('quinielas').update(payload).eq('usuario', usuario);
        } else {
            await supabase.from('quinielas').insert([payload]);
        }
    } catch (err) {
        console.error("Error al subir la foto de perfil:", err.message);
    }
}

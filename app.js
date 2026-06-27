// Variable de control global para evitar que se pisen las sesiones
if (typeof window.mascotaAsignadaSesion === 'undefined') {
    window.mascotaAsignadaSesion = "m1.png";
}
let usuarioLogueado = "";
let modalEsEditable = true;
let modalNombreAmigoActivo = "";
let juegoVisible = false;

window.onload = function() {
    const select = document.getElementById('select-favorito');
    // Genera la lista de países en orden alfabético
    Object.keys(banderasPaises).sort().forEach(pais => {
        const opt = document.createElement('option');
        opt.value = pais; opt.innerText = pais;
        select.appendChild(opt);
    });
};

function intentarLogin() {
    const usuario = document.getElementById('login-usuario').value;
    const clave = document.getElementById('login-clave').value.trim();
    const errorMsg = document.getElementById('error-login');

    if (credenciales[usuario] && credenciales[usuario] === clave) {
        usuarioLogueado = usuario;
        errorMsg.style.display = 'none';
        document.getElementById('login-clave').value = "";
        
        document.body.classList.remove('login-bg');
        document.getElementById('seccion-login').style.display = 'none';
        document.getElementById('seccion-dashboard').style.display = 'grid';
        
        mascotaAsignadaSesion = poolMascotas[Math.floor(Math.random() * poolMascotas.length)];
        document.getElementById('foto-mascota').src = mascotaAsignadaSesion;

        cargarDatosPerfil();
        dibujarAlineacionCancha();
        actualizarTablaGeneral();
        renderizarArbolBanderas();

        // --- ENGANCHE CON SUPABASE (DATABASE.JS) ---
        if (typeof sincronizarTodoDesdeLaNube === 'function') {
            sincronizarTodoDesdeLaNube(); // Descarga todo al entrar
            setInterval(sincronizarTodoDesdeLaNube, 30000); // Revisa internet cada 30 segundos
        }

        actualizarTitularesNoticiero();
        setInterval(actualizarTitularesNoticiero, 45000);
    } else {
        errorMsg.style.display = 'block';
    }
}

function cargarDatosPerfil() {
    document.getElementById('mi-nombre').innerText = usuarioLogueado;
    const fotoGuardada = localStorage.getItem(`foto_${usuarioLogueado}`);
    document.getElementById('mi-avatar').src = fotoGuardada || "https://cdn-icons-png.flaticon.com/512/53/53283.png";

    const favGuardado = localStorage.getItem(`fav_${usuarioLogueado}`) || "";
    document.getElementById('select-favorito').value = favGuardado;
    actualizarEquipoFavorito(favGuardado);
}

function procesarFoto(event) {
    const archivoImagen = event.target.files[0];
    if (!archivoImagen) return;

    const urlLocal = URL.createObjectURL(archivoImagen);
    document.getElementById('mi-avatar').src = urlLocal;
    
    if (typeof subirFotoALaNube === 'function') {
        subirFotoALaNube(usuarioLogueado, archivoImagen);
    }
    
    setTimeout(() => {
        if (typeof dibujarAlineacionCancha === 'function') dibujarAlineacionCancha();
    }, 500);
}

function actualizarEquipoFavorito(pais) {
    if(!pais) {
        document.getElementById('flag-fav').style.display = "none";
        document.getElementById('curiosidad-fav').innerText = "Selecciona un país para ver datos de interés y juegos.";
        document.getElementById('calendario-fav').innerHTML = "";
        return;
    }
    localStorage.setItem(`fav_${usuarioLogueado}`, pais);
    
    const flag = document.getElementById('flag-fav');
    flag.src = `https://flagcdn.com/${banderasPaises[pais]}.svg`;
    flag.style.display = "block";

    const bloqueCuriosidad = document.getElementById('curiosidad-fav');
    bloqueCuriosidad.innerHTML = "";
    let poolCopia = [...(poolCuriosidades[pais] || [`¡Sabías que ${pais} compite con el máximo orgullo en esta edición del torneo mundial!`])];
    
    for(let i=0; i<3; i++) {
        if(poolCopia.length === 0) break;
        let randomIdx = Math.floor(Math.random() * poolCopia.length);
        let divElement = document.createElement('div');
        divElement.classList.add('datos-curiosos');
        divElement.innerText = poolCopia[randomIdx];
        bloqueCuriosidad.appendChild(divElement);
        poolCopia.splice(randomIdx, 1);
    }

    const juegos = baseCalendarios[pais] || ["📅 Próximo encuentro: Por definir en fases avanzadas."];
    document.getElementById('calendario-fav').innerHTML = `
        <p style="font-weight:bold; margin-bottom:3px;">Próximos Partidos:</p>
        ${juegos.map(j => `<div class="juego-item">▪️ ${j}</div>`).join('')}
    `;
}

function dibujarAlineacionCancha() {
    const cancha = document.getElementById('cancha');
    cancha.innerHTML = "";

    Object.keys(credenciales).forEach(nombre => {
        if (nombre === usuarioLogueado) return;

        const divAmigo = document.createElement('div');
        divAmigo.classList.add('amigo-cancha');
        divAmigo.onclick = () => abrirModalMenuFases(false, nombre);

        const fotoAmigo = localStorage.getItem(`foto_${nombre}`) || "https://cdn-icons-png.flaticon.com/512/53/53283.png";
        
        divAmigo.innerHTML = `
            <div class="amigo-avatar"><img src="${fotoAmigo}" alt="${nombre}"></div>
            <div class="amigo-nombre">${nombre}</div>
        `;
        cancha.appendChild(divAmigo);
    });
}

// ... (El inicio de app.js queda igual hasta abrirModalMenuFases)

function abrirModalMenuFases(esEditable, nombreAmigo = "") {
    modalEsEditable = esEditable;
    modalNombreAmigoActivo = nombreAmigo;
    
    if (esEditable && localStorage.getItem(`quiniela_${usuarioLogueado}`)) {
        modalEsEditable = false;
        modalNombreAmigoActivo = usuarioLogueado;
    }

    document.getElementById('modal-q').style.display = "flex";
    
    const tabGrupos = document.getElementById('fase-tab-grupos');
    const tabOctavos = document.getElementById('fase-tab-octavos');
    
    if (tabGrupos && tabOctavos) {
        tabGrupos.innerText = "📊 Clasificación Final (Grupos)";
        tabOctavos.innerText = "⚔️ Dieciseisavos de Final";
        tabOctavos.disabled = false;
    }

    cambiarFaseVisualizacion('dieciseisavos'); // Entramos directo a la acción
}

function cambiarFaseVisualizacion(fase) {
    const grid = document.getElementById('modal-grid-grupos');
    const btnGuardar = document.getElementById('btn-modal-guardar');
    const titulo = document.getElementById('modal-titulo');
    
    document.querySelectorAll('.btn-fase').forEach(b => b.classList.remove('activa'));
    if (fase === 'grupos') document.getElementById('fase-tab-grupos')?.classList.add('activa');
    if (fase === 'dieciseisavos') document.getElementById('fase-tab-octavos')?.classList.add('activa');

    grid.innerHTML = "";

    const targetUser = modalNombreAmigoActivo || usuarioLogueado;
    const datosTarget = JSON.parse(localStorage.getItem(`quiniela_${targetUser}`)) || {};
    const yaTieneQuiniela = localStorage.getItem(`quiniela_${targetUser}`) !== null;

    if (targetUser === usuarioLogueado) {
        titulo.innerHTML = modalEsEditable 
            ? "📝 Rellena tus Predicciones Mundialistas" 
            : `<div style="color:#d32f2f; text-align:center; font-size:14px; background:#ffebee; padding:8px; border-radius:6px; font-weight:bold;">⚠️ Estas son tus predicciones peluchón, estás seguro de ellas, mira que luego no podrás cambiarla y si no te gusta vaya a llorar pal valle!</div>`;
    } else {
        titulo.innerText = `Pronósticos de ${targetUser}`;
    }

    // El botón guardar SOLO aparece si estamos en dieciseisavos, es editable, y no hay datos previos
    btnGuardar.style.display = (fase === 'dieciseisavos' && modalEsEditable && !yaTieneQuiniela) ? "block" : "none";

    // PESTAÑA INFORMATIVA DE GRUPOS
    if (fase === 'grupos') {
        Object.keys(posicionesGrupos).forEach(letra => {
            const equipos = posicionesGrupos[letra];
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-grupo');
            
            let filasTabla = equipos.map((eq, i) => `
                <tr style="border-bottom: 1px solid #333; font-size:11px;">
                    <td style="padding:4px;">${i + 1}</td>
                    <td style="display:flex; align-items:center; gap:5px; padding:4px;">
                        <img style="width:16px; border-radius:2px;" src="https://flagcdn.com/${banderasPaises[eq.equipo] || 'un'}.svg">
                        ${eq.equipo}
                    </td>
                    <td style="padding:4px; text-align:center;">${eq.pj}</td>
                    <td style="padding:4px; text-align:center; color:var(--dorado); font-weight:bold;">${eq.pts}</td>
                </tr>
            `).join('');

            tarjeta.innerHTML = `
                <h4 style="margin-bottom:5px;">Grupo ${letra}</h4>
                <table style="width:100%; border-collapse: collapse; text-align:left;">
                    <thead>
                        <tr style="border-bottom: 2px solid #555; font-size:10px; color:#aaa;">
                            <th>Pos</th><th>Equipo</th><th style="text-align:center;">PJ</th><th style="text-align:center;">Pts</th>
                        </tr>
                    </thead>
                    <tbody>${filasTabla}</tbody>
                </table>
            `;
            grid.appendChild(tarjeta);
        });
    }

    // PESTAÑA DE PREDICCIONES (DIECISEISAVOS)
    if (fase === 'dieciseisavos') {
        Object.keys(llavesDieciseisavos).forEach(idLlave => {
            const [eq1, eq2] = llavesDieciseisavos[idLlave];
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-grupo');
            tarjeta.style.borderColor = "var(--dorado)";

            if (modalEsEditable && !yaTieneQuiniela) {
                // Solo se muestran los 2 equipos que se enfrentan
                let opcionesHTML = `<option value="">-- Elige un ganador --</option>`;
                opcionesHTML += `<option value="${eq1}">${eq1}</option>`;
                opcionesHTML += `<option value="${eq2}">${eq2}</option>`;

                tarjeta.innerHTML = `
                    <h4>Llave ${idLlave}</h4>
                    <div style="display:flex; justify-content:space-between; align-items:center; font-size:11px; margin-bottom:8px; background:rgba(0,0,0,0.2); padding:5px; border-radius:4px;">
                        <span style="font-weight:bold; color:white;">${eq1}</span> 
                        <span style="color:var(--dorado);">VS</span> 
                        <span style="font-weight:bold; color:white;">${eq2}</span>
                    </div>
                    <label style="font-size:11px; font-weight:bold; display:block; color:var(--verde-grama);">🏆 ¿Quién avanza a Octavos?:</label>
                    <select class="selector-clasificado" id="mod-llave-${idLlave}">${opcionesHTML}</select>
                `;
                grid.appendChild(tarjeta);

                if (datosTarget.dieciseisavos?.[idLlave]) {
                    document.getElementById(`mod-llave-${idLlave}`).value = datosTarget.dieciseisavos[idLlave] || "";
                }
            } else {
                let ganador = datosTarget.dieciseisavos?.[idLlave] || "No elegido";
                let flagG = banderasPaises[ganador] ? `<img class="bandera-img" src="https://flagcdn.com/${banderasPaises[ganador]}.svg">` : "";

                tarjeta.innerHTML = `
                    <h4>Llave ${idLlave}</h4>
                    <p style="font-size:10px; color:#777; margin-bottom:5px; text-align:center;">${eq1} vs ${eq2}</p>
                    <div class="voto-vista" style="text-align:center; background:#1a1a1a; padding:8px; border-radius:5px;">🚀 Avanza:<br> ${flagG} <b style="color:var(--dorado); font-size:14px;">${ganador}</b></div>
                `;
                grid.appendChild(tarjeta);
            }
        });
    }
}

function guardarMiQuiniela() {
    if (localStorage.getItem(`quiniela_${usuarioLogueado}`)) {
        alert("¡Ya tienes una quiniela registrada y no puedes modificarla!");
        return;
    }

    let paqueteQuiniela = { dieciseisavos: {} };
    let incompleto = false;

    // Solo verificamos la pestaña activa (Dieciseisavos)
    Object.keys(llavesDieciseisavos).forEach(idLlave => {
        const elLlave = document.getElementById(`mod-llave-${idLlave}`);
        if(elLlave) {
            const ganador = elLlave.value;
            if (!ganador) incompleto = true;
            paqueteQuiniela.dieciseisavos[idLlave] = ganador;
        }
    });

    if (incompleto) {
        alert("🚨 ¡Epa Peluchón! No puedes dejar casillas vacías. Completa todas las Llaves de Dieciseisavos antes de guardar.");
        return;
    }

    localStorage.setItem(`quiniela_${usuarioLogueado}`, JSON.stringify(paqueteQuiniela));
    
    if (typeof subirQuinielaALaNube === 'function') {
        subirQuinielaALaNube(usuarioLogueado, paqueteQuiniela);
    }
    
    alert("🏆 ¡Tus predicciones se han guardado con éxito! Quedaron bloqueadas de por vida.");
    cerrarModal();
    actualizarTablaGeneral();
}

// ... (El resto del archivo app.js queda intacto hacia abajo)

function cerrarModal() { 
    document.getElementById('modal-q').style.display = "none"; 
}

function calcularAciertosUsuario(nombreUsuario) {
    const datos = localStorage.getItem(`quiniela_${nombreUsuario}`);
    let conteo = { perfectos: 0, parciales: 0, total: 0 };

    if (!datos) return conteo;
    const estructura = JSON.parse(datos);
    const prediccionesGrupos = estructura.grupos || estructura; // Resiliencia de datos antiguos

    Object.keys(resultadosReales).forEach(letra => {
        const pred = prediccionesGrupos[letra];
        const real = resultadosReales[letra];

        if (pred) {
            let aciertosGrupo = 0;
            if (pred["1ro"] === real["1ro"]) aciertosGrupo++;
            if (pred["2do"] === real["2do"]) aciertosGrupo++;

            if (aciertosGrupo === 2) { conteo.perfectos++; conteo.total += 2; }
            else if (aciertosGrupo === 1) { conteo.parciales++; conteo.total += 1; }
        }
    });
    return conteo;
}

function actualizarTablaGeneral() {
    const cuerpo = document.getElementById('cuerpo-tabla');
    if (!cuerpo) return;
    cuerpo.innerHTML = "";

    const listaOrdenada = Object.keys(credenciales).map(nombre => {
        return { nombre: nombre, datosCalculados: calcularAciertosUsuario(nombre) };
    }).sort((a, b) => b.datosCalculados.total - a.datosCalculados.total);

    listaOrdenada.forEach((amigo, indice) => {
        const fila = document.createElement('tr');
        if (amigo.nombre === usuarioLogueado) {
            fila.style.backgroundColor = "#c8e6c9";
            fila.style.fontWeight = "bold";
        }

        fila.innerHTML = `
            <td>${indice + 1}</td>
            <td>${amigo.nombre}</td>
            <td>${amigo.datosCalculados.perfectos}</td>
            <td>${amigo.datosCalculados.parciales}</td>
            <td style="color:var(--verde-grama); font-weight:bold;">${amigo.datosCalculados.total} pts</td>
        `;
        cuerpo.appendChild(fila);
    });
}

function actualizarTitularesNoticiero() {
    const listaOrdenada = Object.keys(credenciales).map(nombre => {
        const datosUsuario = calcularAciertosUsuario(nombre);
        const tieneRegistro = localStorage.getItem(`quiniela_${nombre}`) !== null;
        return { nombre: nombre, datos: datosUsuario, registrado: tieneRegistro };
    }).sort((a, b) => b.datos.total - a.datos.total);

    const lider = listaOrdenada[0];
    const segundo = listaOrdenada[1];
    const penultimo = listaOrdenada[listaOrdenada.length - 2];
    const colista = listaOrdenada[listaOrdenada.length - 1];
    let titularesValidos = [];

    const sinRegistro = listaOrdenada.filter(amigo => !amigo.registrado).map(amigo => amigo.nombre);
    if (sinRegistro.length > 0) titularesValidos.push(`👀 Epa, ¡pónganse las pilas! ${sinRegistro.join(', ')} no han registrado ni un bicho en la quiniela. ¿Están durmiendo en los laureles?`);

    const perfectoAbsoluto = listaOrdenada.find(amigo => amigo.datos.perfectos === 12);
    if (perfectoAbsoluto) titularesValidos.push(`🔮 ¡Paren todo! ${perfectoAbsoluto.nombre} metió todos los grupos perfectos. ¡Ese lo que es un brujo o tiene el mundial arreglado!`);

    const ceroAciertos = listaOrdenada.find(amigo => amigo.registrado && amigo.datos.total === 0);
    if (ceroAciertos) titularesValidos.push(`🚨 ¡Ay papá! ${ceroAciertos.nombre} lleva la brújula totalmente dañada: ¡cero aciertos! No le pega un tiro al piso.`);

    if (lider && lider.datos.total > 0) {
        const liderSolitario = lider.datos.total > segundo.datos.total;
        if (liderSolitario) {
            const diferenciaConSegundo = lider.datos.total - segundo.datos.total;
            if (diferenciaConSegundo === 1) titularesValidos.push(`🔥 ¡Pura candela! ${lider.nombre} va mandando en la punta, pero ${segundo.nombre} le va pisando los talones a un solo punto. ¡No te descuides!`);
            else if (diferenciaConSegundo > 3) titularesValidos.push(`🚀 ¡Na' guará! ${lider.nombre} se escapó en solitario y les sacó más de 3 puntos de ventaja. ¡Véanle la placa si pueden!`);
            else titularesValidos.push(`👑 Rey de la cancha: ${lider.nombre} domina el primer puesto en solitario. Los demás están remando en el barro.`);
        } 
        if (lider.datos.total === segundo.datos.total) {
            const empatadosLideres = listaOrdenada.filter(amigo => amigo.datos.total === lider.datos.total).map(amigo => amigo.nombre);
            titularesValidos.push(`⚠️ ¡Tremendo bonche en la punta! Tenemos un empate técnico entre ${empatadosLideres.join(' y ')} con ${lider.datos.total} puntos.`);
        }
        for (let i = 1; i < listaOrdenada.length - 1; i++) {
            if (listaOrdenada[i].datos.total === listaOrdenada[i+1].datos.total && listaOrdenada[i].datos.total !== lider.datos.total) {
                titularesValidos.push(`⚖️ Zona de fuego: ${listaOrdenada[i].nombre} y ${listaOrdenada[i+1].nombre} van parejos arrastrando los mismos puntos.`);
                break;
            }
        }
        if (penultimo && penultimo.nombre !== lider.nombre && penultimo.nombre !== colista.nombre) titularesValidos.push(`😰 ¡Mosca! ${penultimo.nombre} está en el penúltimo lugar, oliendo el sótano. Un resbalón más y se va al fondo.`);
        if (colista && colista.nombre !== lider.nombre) titularesValidos.push(`📉 Alerta roja: ${colista.nombre} va cargando el camión de la basura en el último puesto. ¡Póngase a rezar a ver si remonta!`);
    }

    titularesValidos.push("🦜 ¡Epa chamo! Menos mal que esta quiniela no es floja como tú, que te la pasas recostado.");
    titularesValidos.push("🛸 ¿Qué es lo tuyo? Hay algunos aquí metiendo unos pronósticos tan locos que parecen sacados de una película de ciencia ficción.");
    titularesValidos.push("🥖 ¡Cónchale vale! Dejen de quejarse de la mala suerte y pónganse a estudiar bien los partidos de la Roja.");
    titularesValidos.push("🧤 ¡Epa chamo! No vale la pena andar picado por un puntico de nada. ¡Al mal tiempo, buena cara y a seguir jugando!");
    titularesValidos.push("🌴 ¡Tranquilito papá! Agárrenlo con calma que esto apenas está empezando y la quiniela da más vueltas que un trompo.");
    titularesValidos.push("📢 ¡De verdad que son un tiro al piso! Sigan inventando combinaciones raras con los equipos asiáticos y van a quedar en la lona.");

    const titularFinal = titularesValidos[Math.floor(Math.random() * titularesValidos.length)];
    const elNoticia = document.getElementById('texto-noticia');
    if (elNoticia) elNoticia.innerText = titularFinal;
}

// --- MANEJADOR DRAG AND DROP NATIVO ---
let bloqueArrastrado = null;
let distX = 0, distY = 0;

function iniciarArrastre(e, id) {
    bloqueArrastrado = document.getElementById(id);
    distX = e.clientX - bloqueArrastrado.offsetLeft;
    distY = e.clientY - bloqueArrastrado.offsetTop;
    document.addEventListener('mousemove', arrastrarMesa);
    document.addEventListener('mouseup', soltarMesa);
}

function arrastrarMesa(e) {
    if (bloqueArrastrado) {
        bloqueArrastrado.style.left = (e.clientX - distX) + 'px';
        bloqueArrastrado.style.top = (e.clientY - distY) + 'px';
    }
}

function soltarMesa() {
    bloqueArrastrado = null;
    document.removeEventListener('mousemove', arrastrarMesa);
    document.removeEventListener('mouseup', soltarMesa);
}

// --- MOTOR CLICK SPARK ---
const canvas = document.getElementById('spark-canvas');
const ctx = canvas.getContext('2d');
let chispas = [];

function ajustarVentanaCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', ajustarVentanaCanvas);
ajustarVentanaCanvas();

window.addEventListener('click', (e) => {
    detonarChispas(e.clientX, e.clientY);
});

function detonarChispas(x, y) {
    const limiteParticulas = 8;
    for (let i = 0; i < limiteParticulas; i++) {
        const radianes = (Math.PI * 2 / limiteParticulas) * i;
        chispas.push({
            x: x, y: y,
            fuerzaX: Math.cos(radianes) * (Math.random() * 3 + 2),
            fuerzaY: Math.sin(radianes) * (Math.random() * 3 + 2),
            alfa: 1,
            diametro: 10
        });
    }
}

function renderizadorChispas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = chispas.length - 1; i >= 0; i--) {
        let c = chispas[i];
        c.x += c.fuerzaX;
        c.y += c.fuerzaY;
        c.alfa -= 0.025;
        if (c.alfa <= 0) { chispas.splice(i, 1); continue; }
        ctx.fillStyle = `rgba(255, 255, 255, ${c.alfa})`;
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.diametro * c.alfa, 0, Math.PI * 2);
        ctx.fill();
    }
    requestAnimationFrame(renderizadorChispas);
}
renderizadorChispas();

function cerrarSesion() {
    usuarioLogueado = "";
    document.body.classList.add('login-bg');
    document.getElementById('seccion-dashboard').style.display = 'none';
    document.getElementById('seccion-login').style.display = 'block';
}

function toggleJuego() {
    const bloqueJuego = document.getElementById('frame-juego');
    const bloqueCancha = document.querySelector('.bloque-superior-juego');
    const btnJuego = document.getElementById('btn-toggle-juego');

    juegoVisible = !juegoVisible;

    if (juegoVisible) {
        bloqueJuego.src = "juego.html"; 
        bloqueCancha.style.display = 'none';
        bloqueJuego.style.display = 'block';
        btnJuego.innerText = '⚽ Volver a la Quiniela Peluchón!! ';
        btnJuego.style.background = '#cc2424'; 
    } else {
        bloqueJuego.removeAttribute('src'); 
        bloqueCancha.style.display = 'block';
        bloqueJuego.style.display = 'none';
        btnJuego.innerText = '🎮 Jugar Minijuego';
        btnJuego.style.background = '#005A9C'; 
    }
}

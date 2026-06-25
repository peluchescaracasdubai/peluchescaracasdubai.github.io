let mascotaAsignadaSesion = "m1.png";
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
    const lector = new FileReader();
    lector.onload = function() {
        localStorage.setItem(`foto_${usuarioLogueado}`, lector.result);
        document.getElementById('mi-avatar').src = lector.result;
        
        // --- ENVÍA LA FOTO A LA NUBE (DATABASE.JS) ---
        if (typeof subirFotoALaNube === 'function') {
            subirFotoALaNube(usuarioLogueado, lector.result);
        }
        
        dibujarAlineacionCancha();
    }
    lector.readAsDataURL(event.target.files[0]);
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

function abrirModalMenuFases(esEditable, nombreAmigo = "") {
    modalEsEditable = esEditable;
    modalNombreAmigoActivo = nombreAmigo;
    document.getElementById('modal-q').style.display = "flex";
    cambiarFaseVisualizacion('grupos');
}

function cambiarFaseVisualizacion(fase) {
    const grid = document.getElementById('modal-grid-grupos');
    const btnGuardar = document.getElementById('btn-modal-guardar');
    const titulo = document.getElementById('modal-titulo');
    grid.innerHTML = "";

    if (fase === 'grupos') {
        titulo.innerText = modalEsEditable ? "Mis Pronósticos a Octavos de Final" : `Pronósticos de ${modalNombreAmigoActivo}`;
        btnGuardar.style.display = modalEsEditable ? "block" : "none";

        const datosTarget = modalEsEditable ? 
            (JSON.parse(localStorage.getItem(`quiniela_${usuarioLogueado}`)) || {}) : 
            (JSON.parse(localStorage.getItem(`quiniela_${modalNombreAmigoActivo}`)) || {});

        Object.keys(gruposMundial).forEach(letra => {
            const equipos = gruposMundial[letra];
            const tarjeta = document.createElement('div');
            tarjeta.classList.add('tarjeta-grupo');

            if (modalEsEditable) {
                let opciones = `<option value="">-- Seleccionar --</option>`;
                equipos.forEach(eq => { opciones += `<option value="${eq}">${eq}</option>`; });

                tarjeta.innerHTML = `
                    <h4>Grupo ${letra}</h4>
                    ${equipos.map(eq => `
                        <div class="fila-bandera">
                            <img class="bandera-img" src="https://flagcdn.com/${banderasPaises[eq]}.svg">
                            <span>${eq}</span>
                        </div>
                    `).join('')}
                    <label style="font-size:11px; font-weight:bold; margin-top:5px; display:block;">🥇 1º Puesto:</label>
                    <select class="selector-clasificado" id="mod-grupo-${letra}-1ro">${opciones}</select>
                    <label style="font-size:11px; font-weight:bold; margin-top:5px; display:block;">🥈 2º Puesto:</label>
                    <select class="selector-clasificado" id="mod-grupo-${letra}-2do">${opciones}</select>
                `;
                grid.appendChild(tarjeta);

                if (datosTarget[letra]) {
                    document.getElementById(`mod-grupo-${letra}-1ro`).value = datosTarget[letra]["1ro"] || "";
                    document.getElementById(`mod-grupo-${letra}-2do`).value = datosTarget[letra]["2do"] || "";
                }
            } else {
                let v1 = datosTarget[letra]?.["1ro"] || "No elegido";
                let v2 = datosTarget[letra]?.["2do"] || "No elegido";
                let flag1 = banderasPaises[v1] ? `<img class="bandera-img" src="https://flagcdn.com/${banderasPaises[v1]}.svg">` : "";
                let flag2 = banderasPaises[v2] ? `<img class="bandera-img" src="https://flagcdn.com/${banderasPaises[v2]}.svg">` : "";

                tarjeta.innerHTML = `
                    <h4>Grupo ${letra}</h4>
                    <div class="voto-vista">🥇 1ro: ${flag1} <b>${v1}</b></div>
                    <div class="voto-vista">🥈 2do: ${flag2} <b>${v2}</b></div>
                `;
                grid.appendChild(tarjeta);
            }
        });
    }
}

function renderizarArbolBanderas() {
    inyectarBanderasColumna('b-izq-octavos', llaveEliminatoriaReal.izq.octavos, 2);
    inyectarBanderasColumna('b-izq-cuartos', llaveEliminatoriaReal.izq.cuartos, 2);
    inyectarBanderasColumna('b-izq-semi', llaveEliminatoriaReal.izq.semi, 1);

    const centroFinal = document.getElementById('b-centro-final');
    if (centroFinal) {
        const flagIzq = banderasPaises[llaveEliminatoriaReal.izq.finalista] ? `<img class="bandera-bracket" src="https://flagcdn.com/${banderasPaises[llaveEliminatoriaReal.izq.finalista]}.svg">` : `<div class="bandera-bracket" style="background:rgba(255,255,255,0.1);"></div>`;
        const flagDer = banderasPaises[llaveEliminatoriaReal.der.finalista] ? `<img class="bandera-bracket" src="https://flagcdn.com/${banderasPaises[llaveEliminatoriaReal.der.finalista]}.svg">` : `<div class="bandera-bracket" style="background:rgba(255,255,255,0.1);"></div>`;
        centroFinal.innerHTML = `${flagIzq} <span style="color:white; font-weight:bold; font-size:11px;">VS</span> ${flagDer}`;
    }

    const centroCampeon = document.getElementById('b-centro-campeon');
    if (centroCampeon) {
        centroCampeon.innerHTML = banderasPaises[llaveEliminatoriaReal.campeon] ? 
            `<img class="bandera-bracket" style="width:45px; height:30px; border:2px solid gold;" src="https://flagcdn.com/${banderasPaises[llaveEliminatoriaReal.campeon]}.svg">` : 
            `<div class="bandera-bracket" style="width:45px; height:30px; background:rgba(255,255,255,0.1); border:1px dashed var(--dorado);"></div>`;
    }

    inyectarBanderasColumna('b-der-semi', llaveEliminatoriaReal.der.semi, 1);
    inyectarBanderasColumna('b-der-cuartos', llaveEliminatoriaReal.der.cuartos, 2);
    inyectarBanderasColumna('b-der-octavos', llaveEliminatoriaReal.der.octavos, 2);
}

function inyectarBanderasColumna(idContenedor, listaPaises, agruparPor) {
    const col = document.getElementById(idContenedor);
    if (!col) return;
    col.innerHTML = "";
    for (let i = 0; i < listaPaises.length; i += agruparPor) {
        const bloque = document.createElement('div');
        bloque.classList.add('pareja-bloque');
        for (let j = 0; j < agruparPor; j++) {
            const pais = listaPaises[i + j];
            if (pais && banderasPaises[pais]) {
                const img = document.createElement('img');
                img.classList.add('bandera-bracket');
                img.src = `https://flagcdn.com/${banderasPaises[pais]}.svg`;
                bloque.appendChild(img);
            } else {
                const slotVacio = document.createElement('div');
                slotVacio.classList.add('bandera-bracket');
                slotVacio.style.background = "rgba(255,255,255,0.05)";
                bloque.appendChild(slotVacio);
            }
        }
        col.appendChild(bloque);
    }
}

function guardarMiQuiniela() {
    let misPredicciones = {};
    Object.keys(gruposMundial).forEach(letra => {
        const prim = document.getElementById(`mod-grupo-${letra}-1ro`).value;
        const seg = document.getElementById(`mod-grupo-${letra}-2do`).value;
        misPredicciones[letra] = { "1ro": prim, "2do": seg };
    });

    localStorage.setItem(`quiniela_${usuarioLogueado}`, JSON.stringify(misPredicciones));
    
    // --- ENVÍA LOS PRONÓSTICOS A INTERNET (DATABASE.JS) ---
    if (typeof subirQuinielaALaNube === 'function') {
        subirQuinielaALaNube(usuarioLogueado, misPredicciones);
    }
    
    alert("¡Tus predicciones se guardaron correctamente!");
    cerrarModal();
    actualizarTablaGeneral();
}

function cerrarModal() { 
    document.getElementById('modal-q').style.display = "none"; 
}

function calcularAciertosUsuario(nombreUsuario) {
    const datos = localStorage.getItem(`quiniela_${nombreUsuario}`);
    let conteo = { perfectos: 0, parciales: 0, total: 0 };

    if (!datos) return conteo;
    const predicciones = JSON.parse(datos);

    Object.keys(resultadosReales).forEach(letra => {
        const pred = predicciones[letra];
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

// --- LÓGICA DEL MINIJUEGO DE FÚTBOL ---
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

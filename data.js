const credenciales = {
    "Saul": "4rgentina", "Jorge": "3spaña", "Osmel": "8rasil",
    "Edgar": "Fr4ncia", "Guillermo": "4lemani4", "Francisco": "P0rtug4l", "Gerardo": "1talia"
};

const banderasPaises = {
    "Argentina": "ar", "Francia": "fr", "Marruecos": "ma", "Canadá": "ca",
    "España": "es", "Alemania": "de", "Japón": "jp", "Ecuador": "ec",
    "Brasil": "br", "Portugal": "pt", "Corea del Sur": "kr", "Jamaica": "jm",
    "Italia": "it", "Bélgica": "be", "Argelia": "dz", "Honduras": "hn",
    "Uruguay": "uy", "Inglaterra": "gb-eng", "Australia": "au", "Irak": "iq",
    "Países Bajos": "nl", "Croacia": "hr", "Nigeria": "ng", "Panamá": "pa",
    "Colombia": "co", "Suiza": "ch", "Irán": "ir", "Sudáfrica": "za",
    "Estados Unidos": "us", "Gales": "gb-wls", "Arabia Saudita": "sa", "Perú": "pe",
    "México": "mx", "Dinamarca": "dk", "Túnez": "tn", "Nueva Zelanda": "nz",
    "Chile": "cl", "Austria": "at", "Egipto": "eg", "China": "cn",
    "Senegal": "sn", "Serbia": "rs", "Camerún": "cm", "Costa Rica": "cr",
    "Suecia": "se", "Polonia": "pl", "Ghana": "gh", "Chequia": "cz",
    // Nuevas banderas añadidas de tus capturas reales de 2026:
    "Bosnia y Herzegovina": "ba", "Catar": "qa", "Escocia": "gb-sct", "Haití": "ht",
    "Paraguay": "py", "Turquía": "tr", "Costa de Marfil": "ci", "Curazao": "cw",
    "Cabo Verde": "cv", "Noruega": "no", "Jordania": "jo", "RD Congo": "cd",
    "Uzbekistán": "uz"
};

const gruposMundial = {
    "A": ["Argentina", "Francia", "Marruecos", "Canadá"],
    "B": ["España", "Alemania", "Japón", "Ecuador"],
    "C": ["Brasil", "Portugal", "Corea del Sur", "Jamaica"],
    "D": ["Italia", "Bélgica", "Argelia", "Honduras"],
    "E": ["Uruguay", "Inglaterra", "Australia", "Irak"],
    "F": ["Países Bajos", "Croacia", "Nigeria", "Panamá"],
    "G": ["Colombia", "Suiza", "Irán", "Sudáfrica"],
    "H": ["Estados Unidos", "Gales", "Arabia Saudita", "Perú"],
    "I": ["México", "Dinamarca", "Túnez", "Nueva Zelanda"],
    "J": ["Chile", "Austria", "Egipto", "China"],
    "K": ["Senegal", "Serbia", "Camerún", "Costa Rica"],
    "L": ["Suecia", "Polonia", "Ghana", "Argentina"]
};

// --- DATA OFICIAL EXTRAÍDA DE TUS TABLAS REALES ---
const posicionesGrupos = {
    "A": [
        { equipo: "México", pj: 3, g: 3, e: 0, p: 0, gf: 6, gc: 0, dg: 6, pts: 9 },
        { equipo: "Sudáfrica", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 3, dg: -1, pts: 4 },
        { equipo: "Corea del Sur", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 3, dg: -1, pts: 3 },
        { equipo: "Chequia", pj: 3, g: 0, e: 1, p: 2, gf: 2, gc: 6, dg: -4, pts: 1 }
    ],
    "B": [
        { equipo: "Suiza", pj: 3, g: 2, e: 1, p: 0, gf: 7, gc: 3, dg: 4, pts: 7 },
        { equipo: "Canadá", pj: 3, g: 1, e: 1, p: 1, gf: 8, gc: 3, dg: 5, pts: 4 },
        { equipo: "Bosnia y Herzegovina", pj: 3, g: 1, e: 1, p: 1, gf: 5, gc: 6, dg: -1, pts: 4 },
        { equipo: "Catar", pj: 3, g: 0, e: 1, p: 2, gf: 2, gc: 10, dg: -8, pts: 1 }
    ],
    "C": [
        { equipo: "Brasil", pj: 3, g: 2, e: 1, p: 0, gf: 7, gc: 1, dg: 6, pts: 7 },
        { equipo: "Marruecos", pj: 3, g: 2, e: 1, p: 0, gf: 6, gc: 3, dg: 3, pts: 7 },
        { equipo: "Escocia", pj: 3, g: 1, e: 0, p: 2, gf: 1, gc: 4, dg: -3, pts: 3 },
        { equipo: "Haití", pj: 3, g: 0, e: 0, p: 3, gf: 2, gc: 8, dg: -6, pts: 0 }
    ],
    "D": [
        { equipo: "Estados Unidos", pj: 3, g: 2, e: 0, p: 1, gf: 8, gc: 4, dg: 4, pts: 6 },
        { equipo: "Australia", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 2, dg: 0, pts: 4 },
        { equipo: "Paraguay", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 4, dg: -2, pts: 4 },
        { equipo: "Turquía", pj: 3, g: 1, e: 0, p: 2, gf: 3, gc: 5, dg: -2, pts: 3 }
    ],
    "E": [
        { equipo: "Alemania", pj: 3, g: 2, e: 0, p: 1, gf: 10, gc: 4, dg: 6, pts: 6 },
        { equipo: "Costa de Marfil", pj: 3, g: 2, e: 0, p: 1, gf: 4, gc: 2, dg: 2, pts: 6 },
        { equipo: "Ecuador", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 2, dg: 0, pts: 4 },
        { equipo: "Curazao", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 9, dg: -8, pts: 1 }
    ],
    "F": [
        { equipo: "Países Bajos", pj: 3, g: 2, e: 1, p: 0, gf: 10, gc: 4, dg: 6, pts: 7 },
        { equipo: "Japón", pj: 3, g: 1, e: 2, p: 0, gf: 7, gc: 3, dg: 4, pts: 5 },
        { equipo: "Suecia", pj: 3, g: 1, e: 1, p: 1, gf: 7, gc: 7, dg: 0, pts: 4 },
        { equipo: "Túnez", pj: 3, g: 0, e: 0, p: 3, gf: 2, gc: 12, dg: -10, pts: 0 }
    ],
    "G": [
        { equipo: "Bélgica", pj: 3, g: 1, e: 2, p: 0, gf: 6, gc: 2, dg: 4, pts: 5 },
        { equipo: "Egipto", pj: 3, g: 1, e: 2, p: 0, gf: 5, gc: 3, dg: 2, pts: 5 },
        { equipo: "Irán", pj: 3, g: 0, e: 3, p: 0, gf: 3, gc: 3, dg: 0, pts: 3 },
        { equipo: "Nueva Zelanda", pj: 3, g: 0, e: 1, p: 2, gf: 4, gc: 10, dg: -6, pts: 1 }
    ],
    "H": [
        { equipo: "España", pj: 3, g: 2, e: 1, p: 0, gf: 5, gc: 0, dg: 5, pts: 7 },
        { equipo: "Cabo Verde", pj: 3, g: 0, e: 3, p: 0, gf: 2, gc: 2, dg: 0, pts: 3 },
        { equipo: "Uruguay", pj: 3, g: 0, e: 2, p: 1, gf: 3, gc: 4, dg: -1, pts: 2 },
        { equipo: "Arabia Saudita", pj: 3, g: 0, e: 2, p: 1, gf: 1, gc: 5, dg: -4, pts: 2 }
    ],
    "I": [
        { equipo: "Francia", pj: 3, g: 3, e: 0, p: 0, gf: 10, gc: 2, dg: 8, pts: 9 },
        { equipo: "Noruega", pj: 3, g: 2, e: 0, p: 1, gf: 8, gc: 7, dg: 1, pts: 6 },
        { equipo: "Senegal", pj: 3, g: 1, e: 0, p: 2, gf: 8, gc: 6, dg: 2, pts: 3 },
        { equipo: "Irak", pj: 3, g: 0, e: 0, p: 3, gf: 1, gc: 12, dg: -11, pts: 0 }
    ],
    "J": [
        { equipo: "Argentina", pj: 2, g: 2, e: 0, p: 0, gf: 5, gc: 0, dg: 5, pts: 6 },
        { equipo: "Austria", pj: 2, g: 1, e: 0, p: 1, gf: 3, gc: 3, dg: 0, pts: 3 },
        { equipo: "Argelia", pj: 2, g: 1, e: 0, p: 1, gf: 2, gc: 4, dg: -2, pts: 3 },
        { equipo: "Jordania", pj: 2, g: 0, e: 0, p: 2, gf: 2, gc: 5, dg: -3, pts: 0 }
    ],
    "K": [
        { equipo: "Colombia", pj: 2, g: 2, e: 0, p: 0, gf: 4, gc: 1, dg: 3, pts: 6 },
        { equipo: "Portugal", pj: 2, g: 1, e: 1, p: 0, gf: 6, gc: 1, dg: 5, pts: 4 },
        { equipo: "RD Congo", pj: 2, g: 0, e: 1, p: 1, gf: 1, gc: 2, dg: -1, pts: 1 },
        { equipo: "Uzbekistán", pj: 2, g: 0, e: 0, p: 2, gf: 1, gc: 8, dg: -7, pts: 0 }
    ],
    "L": [
        { equipo: "Inglaterra", pj: 2, g: 1, e: 1, p: 0, gf: 4, gc: 2, dg: 2, pts: 4 },
        { equipo: "Ghana", pj: 2, g: 1, e: 1, p: 0, gf: 1, gc: 0, dg: 1, pts: 4 },
        { equipo: "Croacia", pj: 2, g: 1, e: 0, p: 1, gf: 3, gc: 4, dg: -1, pts: 3 },
        { equipo: "Panamá", pj: 2, g: 0, e: 0, p: 2, gf: 0, gc: 2, dg: -2, pts: 0 }
    ]
};

// --- LLAVES DE DIECISEISAVOS EXTRAÍDAS DE TUS CAPTURAS ---
// Si un contrincante es "Por definir", la app sabrá que está bloqueado el enfrentamiento.
const llavesDieciseisavos = {
    "L1": ["Sudáfrica", "Canadá"],
    "L2": ["Brasil", "Japón"],
    "L3": ["Alemania", "Paraguay"],
    "L4": ["Países Bajos", "Marruecos"],
    "L5": ["Costa de Marfil", "Noruega"],
    "L6": ["Francia", "Suecia"],
    "L7": ["México", "Por definir"],
    "L8": ["Por definir", "Por definir"],
    "L9": ["Bélgica", "Por definir"],
    "L10": ["Estados Unidos", "Bosnia y Herzegovina"],
    "L11": ["España", "Por definir"],
    "L12": ["Por definir", "Por definir"],
    "L13": ["Suiza", "Por definir"],
    "L14": ["Australia", "Egipto"],
    "L15": ["Argentina", "Cabo Verde"],
    "L16": ["Por definir", "Por definir"]
};

const resultadosReales = {
    "A": { "1ro": "México", "2do": "Sudáfrica" }, 
    "B": { "1ro": "Suiza", "2do": "Canadá" }
    // Se calcula dinámicamente con las posiciones si es necesario.
};

const llaveEliminatoriaReal = {
    izq: {
        dieciseisavos: ["Sudáfrica", "Canadá", "Alemania", "Paraguay", "Costa de Marfil", "Noruega", "México", "Por definir"],
        octavos: ["", "", "", ""], 
        cuartos: ["", ""],
        semi: [""],
        finalista: ""
    },
    der: {
        dieciseisavos: ["Brasil", "Japón", "Países Bajos", "Marruecos", "Francia", "Suecia", "Por definir", "Por definir"],
        octavos: ["", "", "", ""],
        cuartos: ["", ""],
        semi: [""],
        finalista: ""
    },
    campeon: "" 
};

const poolCuriosidades = {
    "México": [
        "Es el país que ha disputado más partidos inaugurales en la historia de los mundiales.",
        "Ha sido el orgulloso organizador en solitario de dos ediciones históricas: 1970 y 1986.",
        "El estadio Azteca es el único en el mundo en albergar tres partidos inaugurales."
    ],
    "España": [
        "Ganó el Mundial de Sudáfrica 2010 anotando únicamente 8 goles.",
        "La mítica e inolvidable mascota oficial de su edición en 1982 fue Naranjito."
    ]
};

const baseCalendarios = {
    "España": ["Próximo encuentro: Dieciseisavos de Final ⏰ Por confirmar"],
    "México": ["Próximo encuentro: Dieciseisavos de Final ⏰ Por confirmar"]
};

const poolMascotas = ["m1.png", "m2.png", "m3.png"];

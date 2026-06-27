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
    "Suecia": "se", "Polonia": "pl", "Ghana": "gh", "Chequia": "cz"
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

// --- TABLA INFORMATIVA FINAL DE GRUPOS ---
// Estos datos son de ejemplo para que la tabla se vea bien en todos los grupos. 
// Cámbialos luego según los resultados reales del torneo de tu liga.
const posicionesGrupos = {
    "A": [
        { equipo: "México", pj: 3, g: 3, e: 0, p: 0, gf: 6, gc: 0, pts: 9 },
        { equipo: "Sudáfrica", pj: 3, g: 1, e: 1, p: 1, gf: 2, gc: 3, pts: 4 },
        { equipo: "Corea del Sur", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 3, pts: 3 },
        { equipo: "Chequia", pj: 3, g: 0, e: 1, p: 2, gf: 2, gc: 6, pts: 1 }
    ],
    "B": [
        { equipo: "España", pj: 3, g: 2, e: 1, p: 0, gf: 5, gc: 1, pts: 7 },
        { equipo: "Alemania", pj: 3, g: 2, e: 0, p: 1, gf: 4, gc: 2, pts: 6 },
        { equipo: "Japón", pj: 3, g: 1, e: 1, p: 1, gf: 3, gc: 3, pts: 4 },
        { equipo: "Ecuador", pj: 3, g: 0, e: 0, p: 3, gf: 1, gc: 7, pts: 0 }
    ],
    "C": [
        { equipo: "Brasil", pj: 3, g: 3, e: 0, p: 0, gf: 7, gc: 1, pts: 9 },
        { equipo: "Portugal", pj: 3, g: 2, e: 0, p: 1, gf: 4, gc: 2, pts: 6 },
        { equipo: "Corea del Sur", pj: 3, g: 0, e: 1, p: 2, gf: 2, gc: 5, pts: 1 },
        { equipo: "Jamaica", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 6, pts: 1 }
    ],
    "D": [
        { equipo: "Italia", pj: 3, g: 2, e: 1, p: 0, gf: 4, gc: 1, pts: 7 },
        { equipo: "Bélgica", pj: 3, g: 1, e: 2, p: 0, gf: 3, gc: 2, pts: 5 },
        { equipo: "Argelia", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 4, pts: 3 },
        { equipo: "Honduras", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 3, pts: 1 }
    ],
    "E": [
        { equipo: "Uruguay", pj: 3, g: 2, e: 1, p: 0, gf: 5, gc: 2, pts: 7 },
        { equipo: "Inglaterra", pj: 3, g: 2, e: 0, p: 1, gf: 4, gc: 3, pts: 6 },
        { equipo: "Australia", pj: 3, g: 1, e: 1, p: 1, gf: 3, gc: 3, pts: 4 },
        { equipo: "Irak", pj: 3, g: 0, e: 0, p: 3, gf: 0, gc: 4, pts: 0 }
    ],
    "F": [
        { equipo: "Países Bajos", pj: 3, g: 3, e: 0, p: 0, gf: 6, gc: 1, pts: 9 },
        { equipo: "Croacia", pj: 3, g: 1, e: 1, p: 1, gf: 3, gc: 3, pts: 4 },
        { equipo: "Nigeria", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 4, pts: 3 },
        { equipo: "Panamá", pj: 3, g: 0, e: 1, p: 2, gf: 2, gc: 5, pts: 1 }
    ],
    "G": [
        { equipo: "Colombia", pj: 3, g: 2, e: 1, p: 0, gf: 4, gc: 1, pts: 7 },
        { equipo: "Suiza", pj: 3, g: 1, e: 2, p: 0, gf: 2, gc: 1, pts: 5 },
        { equipo: "Irán", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 4, pts: 3 },
        { equipo: "Sudáfrica", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 3, pts: 1 }
    ],
    "H": [
        { equipo: "Estados Unidos", pj: 3, g: 2, e: 1, p: 0, gf: 5, gc: 2, pts: 7 },
        { equipo: "Gales", pj: 3, g: 1, e: 1, p: 1, gf: 3, gc: 3, pts: 4 },
        { equipo: "Arabia Saudita", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 4, pts: 3 },
        { equipo: "Perú", pj: 3, g: 0, e: 2, p: 1, gf: 2, gc: 3, pts: 2 }
    ],
    "I": [
        { equipo: "México", pj: 3, g: 2, e: 1, p: 0, gf: 4, gc: 1, pts: 7 },
        { equipo: "Dinamarca", pj: 3, g: 1, e: 2, p: 0, gf: 3, gc: 2, pts: 5 },
        { equipo: "Túnez", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 4, pts: 3 },
        { equipo: "Nueva Zelanda", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 3, pts: 1 }
    ],
    "J": [
        { equipo: "Chile", pj: 3, g: 3, e: 0, p: 0, gf: 6, gc: 2, pts: 9 },
        { equipo: "Austria", pj: 3, g: 2, e: 0, p: 1, gf: 4, gc: 3, pts: 6 },
        { equipo: "Egipto", pj: 3, g: 0, e: 1, p: 2, gf: 2, gc: 5, pts: 1 },
        { equipo: "China", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 3, pts: 1 }
    ],
    "K": [
        { equipo: "Senegal", pj: 3, g: 2, e: 1, p: 0, gf: 5, gc: 2, pts: 7 },
        { equipo: "Serbia", pj: 3, g: 2, e: 0, p: 1, gf: 4, gc: 2, pts: 6 },
        { equipo: "Camerún", pj: 3, g: 1, e: 0, p: 2, gf: 3, gc: 5, pts: 3 },
        { equipo: "Costa Rica", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 4, pts: 1 }
    ],
    "L": [
        { equipo: "Suecia", pj: 3, g: 2, e: 1, p: 0, gf: 4, gc: 1, pts: 7 },
        { equipo: "Polonia", pj: 3, g: 1, e: 2, p: 0, gf: 2, gc: 1, pts: 5 },
        { equipo: "Ghana", pj: 3, g: 1, e: 0, p: 2, gf: 2, gc: 4, pts: 3 },
        { equipo: "Argentina", pj: 3, g: 0, e: 1, p: 2, gf: 1, gc: 3, pts: 1 }
    ]
};

// --- CRUCES REALES DE DIECISEISAVOS DE FINAL ---
// Estos son los equipos reales que se van a enfrentar. Cámbialos a medida que se definan en tu torneo.
const llavesDieciseisavos = {
    "L1": ["Sudáfrica", "Canadá"],
    "L2": ["México", "Alemania"],
    "L3": ["Brasil", "Portugal"],
    "L4": ["Argentina", "Italia"],
    "L5": ["España", "Francia"],
    "L6": ["Colombia", "Suiza"],
    "L7": ["Uruguay", "Inglaterra"],
    "L8": ["Países Bajos", "Croacia"],
    "L9": ["Estados Unidos", "Gales"],
    "L10": ["Chile", "Austria"],
    "L11": ["Senegal", "Serbia"],
    "L12": ["Suecia", "Polonia"],
    "L13": ["Japón", "Ecuador"],
    "L14": ["Corea del Sur", "Jamaica"],
    "L15": ["Marruecos", "Dinamarca"],
    "L16": ["Argelia", "Honduras"]
};

const resultadosReales = {
    "A": { "1ro": "Argentina", "2do": "Francia" }, "B": { "1ro": "España", "2do": "Alemania" },
    "C": { "1ro": "Brasil", "2do": "Portugal" }, "D": { "1ro": "Italia", "2do": "Bélgica" },
    "E": { "1ro": "Uruguay", "2do": "Inglaterra" }, "F": { "1ro": "Países Bajos", "2do": "Croacia" },
    "G": { "1ro": "Colombia", "2do": "Suiza" }, "H": { "1ro": "Estados Unidos", "2do": "Gales" },
    "I": { "1ro": "México", "2do": "Dinamarca" }, "J": { "1ro": "Chile", "2do": "Austria" },
    "K": { "1ro": "Senegal", "2do": "Serbia" }, "L": { "1ro": "Suecia", "2do": "Polonia" }
};

// --- DATA DE LA RED ELIMINATORIA REAL (Para tu Bracket dinámico) ---
const llaveEliminatoriaReal = {
    izq: {
        dieciseisavos: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        octavos: ["", "", "", "", "", "", "", ""], 
        cuartos: ["", "", "", ""],
        semi: ["", ""],
        finalista: ""
    },
    der: {
        dieciseisavos: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
        octavos: ["", "", "", "", "", "", "", ""],
        cuartos: ["", "", "", ""],
        semi: ["", ""],
        finalista: ""
    },
    campeon: "" 
};

const poolCuriosidades = {
    "Argentina": [
        "Utilizó un balón de fabricación local en la primera final de Uruguay 1930.",
        "Es el combinado nacional que más tandas de penales ha ganado en mundiales.",
        "Diego Armando Maradona ostenta el récord de más faltas recibidas en un torneo (53).",
        "Los bastones clásicos celestes y blancos aparecieron por primera vez en 1908.",
        "Guillermo Stábile se consagró como el primer máximo goleador del torneo.",
        "Lionel Messi es el jugador con más presencias en fases finales mundiales.",
        "Alcanzaron su primer trofeo actuando como el país anfitrión en 1978.",
        "Es la selección nacional que más amonestaciones ha recibido acumuladas.",
        "Han disputado seis finales absolutas de la Copa del Mundo hasta hoy.",
        "Maradona inmortalizó 'La Mano de Dios' y el 'Gol del Siglo' en México 1986."
    ],
    "Francia": [
        "Fue uno de los pocos países europeos en competir en el torneo inicial de 1930.",
        "Just Fontaine mantiene el récord imbatible de 13 goles en un solo mundial.",
        "Logró el triplete perfecto sumando Mundial, Confederaciones y Eurocopa.",
        "Se proclamó campeón del planeta por primera vez en su propia casa en 1998.",
        "Zinedine Zidane consiguió anotar en dos finales distintas de mundiales.",
        "El gallo galo es el símbolo heráldico de su federación de fútbol.",
        "Kylian Mbappé facturó un triplete de goles en la final disputada en 2022.",
        "Organizó la tercera Copa Mundial de la historia antes de la guerra en 1938.",
        "Didier Deschamps es de los pocos en campeonar como capitán y entrenador.",
        "Lucien Laurent firmó el primer gol en la historia de la Copa del Mundo."
    ],
    "Marruecos": [
        "Fue la primera selección africana en clasificar a octavos de final en México 1986.",
        "En Catar 2022 se convirtieron en la primera nación de África en llegar a Semifinales.",
        "Su guardameta Yassine Bounou fue héroe indiscutible en tandas de penales decisivas.",
        "Su debut absoluto en fases finales se dio en la edición de México 1970.",
        "Son conocidos en el ecosistema del fútbol como los Leones del Atlas.",
        "Marruecos ha presentado candidaturas para organizar el evento en múltiples ocasiones.",
        "Consiguieron un empate histórico contra Inglaterra en el torneo de 1986.",
        "Su camiseta tradicional combina los colores rojo profundo y verde heráldico.",
        "La plantilla de 2022 destacó por su orden y solidez defensiva táctica en el campo.",
        "Su federación es una de las instituciones deportivas pioneras en el norte de África."
    ],
    "Canadá": [
        "Clasificó por primera vez en su historia a una fase final en México 1986.",
        "Su segundo boleto histórico lo consiguieron de forma directa para Catar 2022.",
        "Alphonso Davies anotó el primer gol canadiense en mundiales contra Croacia.",
        "Comparten la organización de la Copa del Mundo 2026 junto a EE.UU. y México.",
        "El fútbol ha crecido exponencialmente en popularidad frente al hockey sobre hielo.",
        "Su uniforme estelar rinde tributo directo a la clásica hoja de arce roja.",
        "En 1986 jugaron en el mismo grupo de la poderosa escuadra de Francia.",
        "John Herdman los dirigió tras haber liderado con éxito el combinado femenino.",
        "La Major League Soccer ha sido clave para el desarrollo de sus talentos actuales.",
        "Mantienden una histórica rivalidad de la zona de Concacaf con Estados Unidos."
    ],
    "España": [
        "No incluyó a ningún jugador del Real Madrid en la Eurocopa de 2021.",
        "Ganó el Mundial de Sudáfrica 2010 anotando únicamente 8 goles.",
        "Tiene el récord de más pases completados en un partido mundialista (1115).",
        "Su peor derrota histórica en mundiales fue un doloroso 6-1 contra Brasil.",
        "Debutó oficialmente como selección en las Olimpiadas de Amberes de 1920.",
        "Iker Casillas mantiene el récord de imbatibilidad en fases eliminatorias (480 minutos).",
        "Fue la primera escuadra europea en ganar el campeonato fuera de su continente.",
        "Consiguieron un invicto histórico internacional de 35 compromisos seguidos.",
        "Gavi se convirtió en su goleador más joven en la historia de la Copa de la FIFA.",
        "La mítica e inolvidable mascota oficial de su edición en 1982 fue Naranjito."
    ],
    "Alemania": [
        "Es uno de los equipos más consistentes con 4 estrellas de campeonato en su haber.",
        "Miroslav Klose es el máximo anotador de la historia de los mundiales con 16 goles.",
        "Han disputado un total récord de ocho finales de la Copa del Mundo.",
        "Su victoria 7-1 sobre Brasil en 2014 es la semifinal más abultada de la historia.",
        "Consiguieron el milagro de Berna en 1954 derrotando a la favorita Hungría.",
        "Han alcanzado el podio en un total de 12 ocasiones.",
        "Su icónico uniforme blanco con negro proviene de la bandera de Prusia.",
        "Lothar Matthäus es el jugador de campo con más ediciones disputadas de la historia.",
        "Ninguna selección ha jugado tantos partidos en fases finales mundiales como ellos.",
        "Su lema histórico oficial en la competición siempre ha sido 'Das Team'."
    ],
    "Japón": [
        "Clasificaron a su primer torneo en Francia 1998 y han asistido a todos desde entonces.",
        "Lograron vencer de forma histórica a Alemania y España en la edición de 2022.",
        "Su afición es mundialmente famosa por limpiar las gradas al terminar cada partido.",
        "Son conocidos en el contexto deportivo internacional como los Samuráis Azules.",
        "Su mejor resultado histórico ha sido clasificar a los Octavos de Final.",
        "Organizaron de forma conjunta con Corea del Sur el primer mundial de Asia en 2002.",
        "Su sistema formativo de fútbol base está fuertemente ligado a escuelas y universidades.",
        "El uniforme azul eléctrico representa el color del océano que rodea las islas.",
        "En Rusia 2018 se convirtieron en la primera selección asiática en batir a una sudamericana.",
        "Su federación cuenta con un plan maestro integral para ganar el mundial antes de 2050."
    ],
    "Ecuador": [
        "Hicieron su gran debut mundialista en la edición de Corea-Japón 2002.",
        "Su mejor actuación histórica se dio en Alemania 2006 llegando a Octavos de Final.",
        "Enner Valencia es el máximo goleador ecuatoriano en fases finales con 6 tantos.",
        "Hicieron historia al ganar el partido inaugural de 2022 al país anfitrión.",
        "Su primera victoria en un mundial fue contra Croacia con gol de Edison Méndez.",
        "Son conocidos cariñosamente en Latinoamerica como la Tri.",
        "El histórico zaguero Iván Hurtado ostenta el récord de más partidos con la selección.",
        "Su fortín tradicional para eliminatorias siempre ha sido la altura de Quito.",
        "En el mundial de 2006 vistieron un uniforme amarillo brillante muy llamativo.",
        "La cantera de Independiente del Valle ha transformado la base actual de su equipo."
    ],
    "Brasil": [
        "Ha participado en todas las ediciones de los mundiales de forma ininterrumpida.",
        "Lidera el palmarés histórico del certamen con un total de 5 estrellas.",
        "Eliminó el uniforme blanco de por vida tras la derrota del Maracanazo.",
        "Pelé es el campeón mundial más joven del planeta con apenas 17 años.",
        "Tiene el honor de ser la escuadra más goleadora en la historia de la FIFA.",
        "El fenómeno Ronaldo Nazário marcó 15 anotaciones en fases finales.",
        "Ganó tres mundiales en un lapso brillante de 12 años (1958, 1962 y 1970).",
        "Se quedó con la Copa Jules Rimet en propiedad tras su tercer campeonato.",
        "Cafú es el único jugador en disputar tres finales del mundo consecutivas.",
        "Fuleco, un armadillo nativo, fue la mascota oficial de su edición en 2014."
    ],
    "Portugal": [
        "Su mejor registro histórico fue obtener el tercer lugar en Inglaterra 1966.",
        "Eusebio, la Pantera Negra, anotó 9 goles en su único torneo disputado.",
        "Cristiano Ronaldo es el único jugador en marcar en cinco ediciones de mundiales diferentes.",
        "Su debut en copas del mundo se dio de forma tardía en el año 1966.",
        "Se les conoce comúnmente como la Selección das Quinas por su escudo.",
        "En Alemania 2006 regresaron a una Semifinal tras 40 años de ausencia.",
        "El uniforme tradicional combina un rojo granate profundo con detalles verdes.",
        "Su escuela de extremos ha producido leyendas como Figo, Futre y Cristiano.",
        "Tienen un récord de tarjetas en el partido de 2006 conocido como la Batalla de Núremberg.",
        "Su federación fue fundada en 1914 para unificar el fútbol luso."
    ],
    "Corea del Sur": [
        "Es la selección asiática con más participaciones históricas en fases finales.",
        "Lograron un histórico e increíble cuarto lugar actuando como locales en 2002.",
        "Anotaron la eliminación definitiva de Alemania en la fase de grupos de Rusia 2018.",
        "Son conocidos popularmente por sus aficionados como los Diablos Rojos.",
        "Su estrella Hong Myung-bo fue galardonado con el Balón de Bronce en 2002.",
        "Su primera aparición absoluta en el certamen ocurrió en Suiza 1954.",
        "Son famosos por la disciplina militar y velocidad física de sus plantillas.",
        "Son Heung-min es considerado uno de los mayores íconos deportivos de su historia.",
        "En 2002 eliminaron de forma consecutiva a potencias como Italia y España.",
        "Su uniforme tradicional destaca por el uso del rojo encendido y blanco."
    ],
    "Jamaica": [
        "Hicieron historia al clasificar al Mundial de Francia 1998.",
        "Son conocidos mundialmente en el deporte como los Reggae Boyz.",
        "Su primera victoria en una Copa del Mundo fue contra El Salvador en eliminatorias.",
        "En Francia 98 sumaron 3 puntos al vencer a Japón con doblete de Theodore Whitmore.",
        "El atletismo y la velocidad natural marcan el biotipo de sus futbolistas.",
        "Su clasificación desató una fiesta nacional declarada oficialmente por su gobierno.",
        "El mítico Bob Marley era un apasionado del fútbol y seguidor de la selección.",
        "Su uniforme es famoso por incorporar vibrantes patrones geométricos en verde, amarillo y negro.",
        "Robbie Earle anotó el primer gol de Jamaica en la historia de las fases finales.",
        "La mayoría de sus jugadores históricos militaban en el fútbol de Inglaterra."
    ],
    "Italia": [
        "Es una de las grandes potencias mundiales con 4 títulos absolutos conquistados.",
        "Consiguieron ganar dos copas mundiales de forma consecutiva en 1934 y 1938.",
        "Su estilo defensivo histórico ha sido catalogado mundialmente como Catenaccio.",
        "Visten de color azul (Azzurro) en honor a la Casa Real de Saboya.",
        "El guardameta Gianluigi Buffon disputó un récord de 5 ediciones mundiales.",
        "Protagonizaron junto a Alemania el 'Partido del Siglo' en México 1970 (4-3).",
        "Su campeonato en España 1982 consagró al mítico delantero Paolo Rossi.",
        "Ganaron su cuarta corona en Alemania 2006 venciendo a Francia en penales.",
        "Mantienen una rivalidad histórica de alta tensión futbolística con Brasil.",
        "Dino Zoff se convirtió en el campeón más longevo ganando con 40 años."
    ],
    "Bélgica": [
        "Lograron un histórico tercer lugar en el Mundial de Rusia 2018.",
        "Se les conoce en el entorno del fútbol europeo como los Diablos Rojos.",
        "Su generación dorada lideró el ranking de la FIFA durante varios años seguidos.",
        "Estuvieron presentes en la edición inaugural de Uruguay 1930.",
        "En México 1986 llegaron a semifinales inspirados por el talento de Enzo Scifo.",
        "Su guardameta Thibaut Courtois ganó el Guante de Oro en la edición de 2018.",
        "Es un país trilingüe, por lo que su escudo lleva las siglas en francés y flamenco.",
        "Tienen una larga tradición de esquemas de alta flexibilidad y posesión.",
        "Su uniforme estelar resalta los colores negro, amarillo y rojo de su bandera.",
        "Mantienen un clásico de frontera de alta rivalidad contra los Países Bajos."
    ],
    "Argelia": [
        "Dieron la gran sorpresa al vencer a Alemania Occidental en España 1982.",
        "Clasificaron por primera vez a los Octavos de Final en Brasil 2014.",
        "Llevaron a la prórroga a la postre campeona Alemania en una batalla épica.",
        "Son conocidos en el continente africano como los Zorros del Desierto.",
        "En 1982 sufrieron el 'Pacto de Gijón' entre Alemania y Austria que los eliminó.",
        "Su uniforme representativo utiliza los colores blanco y verde con detalles rojos.",
        "Gran parte de sus jugadores históricos poseen doble nacionalidad franco-argelina.",
        "Su estilo se caracteriza por la tremenda habilidad técnica en espacios reducidos.",
        "Su primera aparición oficial en fases finales se registró en 1982.",
        "La clasificación de 2010 la consiguieron tras un dramático desempate contra Egipto."
    ],
    "Honduras": [
        "Hicieron su debut histórico absoluto en la Copa de España 1982.",
        "Consiguieron empates legendarios ante el anfitrión España e Irlanda del Norte en el 82.",
        "Regresaron a la máxima cita del fútbol en las ediciones de 2010 y 2014.",
        "Se les conoce popularmente en Centroamérica como la Bicolor o los Catrachos.",
        "Su máximo referente histórico en mundiales ha sido el delantero Carlos Pavón.",
        "El técnico Chelato Uclés es considerado el héroe estratega eterno del país.",
        "Su uniforme clásico es blanco inmaculado con la icónica letra 'H' en el pecho.",
        "Mantienen duelos de alta intensidad regional frente a México y EE.UU.",
        "La velocidad física y la fuerza marcan la identidad de sus plantillas.",
        "Su liga local ha servido de base fundamental para nutrir los procesos mundialistas."
    ],
    "Uruguay": [
        "Fueron los organizadores y campeones del primer mundial en 1930.",
        "Protagonizaron la hazaña más grande de la historia ganando el Maracanazo en 1950.",
        "Su camiseta celeste cuenta con 4 estrellas por títulos de jerarquía mundial.",
        "Su identidad de juego está definida por la legendaria 'Garra Charrúa'.",
        "Es el país con menor población en la historia en haber ganado una Copa del Mundo.",
        "Luis Suárez es su máximo anotador histórico en procesos generales.",
        "Diego Forlán fue elegido el mejor jugador de Sudáfrica 2010 ganando el Balón de Oro.",
        "Su estadio nacional, el Centenario, fue declarado Monumento Histórico del Fútbol.",
        "Mantienen el clásico del Río de la Plata, una rivalidad ancestral con Argentina.",
        "Fueron la primera selección en coronarse de forma invicta en la historia."
    ],
    "Inglaterra": [
        "Se proclamaron campeones del mundo en su propia tierra en el año 1966.",
        "Son considerados históricamente los inventores del fútbol moderno.",
        "Su escudo luce con orgullo los tres leones de la corona británica.",
        "Gary Lineker ganó la Bota de Oro como máximo goleador en México 1986.",
        "Su estadio nacional de Wembley es considerado la catedral mundial del fútbol.",
        "Tienen una larga e histórica maldición con las tandas de penales eliminatorias.",
        "Su liga local, la Premier League, es la más vista y poderosa de todo el planeta.",
        "El gol fantasma de Geoff Hurst en la final de 1966 sigue siendo discutido.",
        "Mantienen partidos de enorme rivalidad e historia contra Argentina y Alemania.",
        "Su uniforme clásico se compone de camiseta blanca y pantalón azul marino."
    ],
    "Australia": [
        "Clasificaron a su primer mundial en la lejana edición de Alemania 1974.",
        "Cambiaron de confederación de Oceanía a Asia para elevar su nivel.",
        "Se les conoce mundialmente en todas las disciplinas como los Socceroos.",
        "Su jugador leyenda Tim Cahill anotó en tres mundiales diferentes.",
        "Su mejor registro ha sido avanzar a los Octavos de Final en 2006 y 2022.",
        "En 2006 cayeron con honor ante Italia por un penal polémico de último minuto.",
        "El uniforme de la selección combina los colores verde y oro tradicional del país.",
        "La mayoría de sus plantillas provienen de ligas europeas y de la A-League local.",
        "Destacan siempre por su tremendo despliegue físico y disciplina atlética.",
        "La clasificación de 2005 ante Uruguay en penales es su mayor hazaña histórica."
    ],
    "Irak": [
        "Consiguieron su histórica y única clasificación mundialista para México 1986.",
        "Jugaron en un grupo sumamente complejo ante Paraguay, Bélgica y el anfitrión México.",
        "Ahmed Radhi anotó el único gol de Irak en la historia de los mundiales.",
        "A pesar de los conflictos internos, el fútbol es el deporte unificador del país.",
        "Se coronaron campeones de la Copa Asiática en 2007 en una gesta heroica.",
        "Su apodo oficial en las competiciones es los Leones de Mesopotamia.",
        "El uniforme representativo destaca por el uso del blanco completo o verde olivo.",
        "Su clasificación al torneo de 1986 la lograron jugando todos sus partidos de locales en terreno neutral.",
        "El talento técnico y el temperamento competitivo definen a sus jugadores.",
        "Su federación trabaja activamente en la reconstrucción de infraestructura deportiva local."
    ],
    "Países Bajos": [
        "Son considerados los creadores del revolucionario 'Fútbol Total' de los años 70.",
        "Tienen la marca histórica de haber jugado tres finales mundiales sin ganar ninguna.",
        "Visten completamente de color naranja en honor a la Casa Real de Orange.",
        "Johan Cruyff es considerado su máximo exponente y leyenda eterna.",
        "Su victoria 5-1 sobre España en 2014 es de sus partidos más recordados.",
        "Se les conoce popularmente en todo el mundo como la Naranja Mecánica.",
        "Dennis Bergkamp anotó uno de los goles más hermosos de la historia en Francia 98.",
        "Tienen una profunda escuela formativa ligada a las academias del Ajax y PSV.",
        "Mantienen batallas clásicas de alta fricción contra las selecciones de Alemania y Argentina.",
        "Su mejor registro goleador lo ostenta Robin van Persie."
    ],
    "Croacia": [
        "Dieron la gran sorpresa mundial al conseguir el tercer lugar en Francia 1998.",
        "Lograron una histórica e inolvidable final mundialista en Rusia 2018.",
        "Su capitán Luka Modric ganó el Balón de Oro del Mundial en 2018.",
        "Su camiseta es de las más famosas por su diseño de ajedrezado rojo y blanco.",
        "Es un país con poca población que ha encadenado podios mundiales seguidos.",
        "Davor Šuker se consagró como el máximo goleador del torneo de 1998.",
        "Son considerados los reyes de las prórrogas tras avanzar múltiples rondas en penales.",
        "Su federación se fundó de forma independiente tras la disolución de Yugoslavia.",
        "El mediocampo Modric-Rakitic-Brozovic marcó la época dorada de su fútbol.",
        "Destacan por un tremendo orgullo nacional que reflejan en cada encuentro."
    ],
    "Nigeria": [
        "Deslumbraron al mundo entero con su fútbol alegre en el Mundial de EE.UU. 1994.",
        "Son conocidos internacionalmente en el entorno del fútbol como las Súper Águilas.",
        "Han ganado la medalla de oro olímpica derrotando a potencias mundiales.",
        "Su indumentaria para Rusia 2018 rompió récords globales de ventas por su diseño urbano.",
        "Rashidi Yekini anotó el primer gol nigeriano en mundiales celebrándolo en la red.",
        "Es la selección africana que más veces ha clasificado a los Octavos de Final.",
        "Mantienen una curiosa y constante rivalidad con Argentina en fases de grupos.",
        "Su estilo histórico combina potencia física exuberante con fantasía técnica.",
        "Stephen Keshi fue campeón africano como jugador y posteriormente como seleccionador.",
        "Han aportado grandes talentos a las principales ligas del fútbol europeo."
    ],
    "Panamá": [
        "Lograron su histórica y primera clasificación mundialista para Rusia 2018.",
        "El gol de Román Torres ante Costa Rica selló la clasificación más emotiva del país.",
        "Felipe Baloy anotó el primer gol de Panamá en una Copa del Mundo ante Inglaterra.",
        "Su gobierno declaró día de fiesta nacional tras conseguir el boleto en 2017.",
        "Son conocidos popularmente en la confederación como la Marea Roja o los Canaleros.",
        "El técnico Hernán Darío Gómez los guió en su primera experiencia mundialista.",
        "La influencia del béisbol ha ido cediendo terreno ante el auge total del fútbol.",
        "Su uniforme estelar destaca por un color rojo encendido con detalles blancos.",
        "Su jugador histórico leyenda es el fallecido delantero Luis Tejada.",
        "Cuentan con una de las fanaticadas más fieles y alegres de la zona de Concacaf."
    ],
    "Colombia": [
        "Su mejor participación histórica se registró en Brasil 2014 llegando a Cuartos.",
        "James Rodríguez ganó la Bota de Oro como máximo goleador en 2014 con 6 tantos.",
        "El gol de Freddy Rincón a Alemania en el 90 es recordado como un hito nacional.",
        "Son conocidos mundialmente en el deporte como el conjunto Cafetero.",
        "Su generación de los 90 liderada por Carlos Valderrama maravilló al planeta.",
        "El guardameta René Higuita revolucionó el puesto con su estilo de arquero-líbero.",
        "En Brasil 2014 ganaron el premio al Juego Limpio otorgado por la FIFA.",
        "Su uniforme tradicional se compone de camiseta amarilla, pantalón azul y medias rojas.",
        "La icónica celebración bailando en grupo se volvió viral en el mundial de 2014.",
        "Radamel Falcao García es su máximo anotador histórico en procesos generales."
    ],
    "Suiza": [
        "Mantienen el récord histórico de no recibir un solo gol en una edición (Alemania 2006).",
        "Fueron los organizadores de la quinta edición de la Copa Mundial en 1954.",
        "Su partido de 1954 contra Austria terminó 7-5, el de más goles en la historia.",
        "Se les conoce comúnmente en Europa como el equipo Nati.",
        "Su uniforme clásico luce con orgullo el diseño de la cruz blanca sobre fondo rojo.",
        "Han clasificado de forma constante a las rondas finales en los últimos torneos.",
        "Su plantilla destaca por una inmensa multiculturalidad e integración de jugadores.",
        "Son famosos por planteamientos tácticos defensivos sumamente ordenados.",
        "Xherdan Shaqiri ha anotado goles memorables en múltiples mundiales seguidos.",
        "Su federación de fútbol es de las más antiguas, fundada en el año 1895."
    ],
    "Irán": [
        "Consiguieron su primera victoria histórica en mundiales ante EE.UU. en Francia 1998.",
        "Se les conoce internacionalmente en el fútbol como el Equipo Melli.",
        "Su delantero Ali Daei fue por mucho tiempo el máximo goleador internacional del planeta.",
        "Hicieron su gran debut en la Copa del Mundo en la edición de Argentina 1978.",
        "Destacan históricamente por planteamientos defensivos de enorme resistencia táctica.",
        "El técnico Carlos Queiroz dirigió a la selección en tres mundiales consecutivos.",
        "Su uniforme representativo incorpora la silueta del guepardo asiático en peligro de extinción.",
        "El fútbol despierta una pasión desbordante en todas las ciudades del país.",
        "Estuvieron muy cerca de clasificar a Octavos en Rusia 2018 en un grupo durísimo.",
        "La mayoría de sus figuras actuales militan en ligas importantes de Europa."
    ],
    "Sudáfrica": [
        "Hicieron su gran debut mundialista en la edición de Francia 1998.",
        "Fueron los orgullosos organizadores del primer mundial en tierras africanas (2010).",
        "Su jugador Siphiwe Tshabalala anotó el primer gol de 2010 desatando la locura local.",
        "Son conocidos cariñosamente en todo el mundo como los Bafana Bafana.",
        "Su expresidente Nelson Mandela fue clave para unir al país a través del torneo.",
        "El sonido de las vuvuzelas en las gradas se convirtió en el gran sello de su mundial.",
        "En 2010 se convirtieron en el primer anfitrión en quedar fuera en fase de grupos.",
        "Lograron una victoria histórica ante la potencia de Francia en el torneo de 2010.",
        "Su uniforme resalta por la brillante combinación de amarillo, verde y negro.",
        "Su liga local, la PSL, es una de las estructuras de fútbol con mayor poder económico de África."
    ],
    "Estados Unidos": [
        "Consiguieron el tercer lugar en el mundial inaugural de Uruguay 1930.",
        "Dieron la gran sorpresa histórica al vencer 1-0 a Inglaterra en Brasil 1950.",
        "Organizaron el Mundial de 1994, el de mayor asistencia total de la historia.",
        "El fútbol en este país es denominado formalmente como 'Soccer'.",
        "Llegaron a la instancia de los Cuartos de Final en el torneo de Corea-Japón 2002.",
        "Su jugador histórico Landon Donovan es su máximo anotador en fases finales.",
        "Comparten la organización de la Copa del Mundo 2026 junto a Canadá y México.",
        "Su uniforme tradicional adopta los colores de las barras y las estrellas de su bandera.",
        "La Major League Soccer nació como consecuencia directa del éxito del mundial del 94.",
        "Mantienen una enconada rivalidad en la zona de Concacaf contra la selección de México."
    ],
    "Gales": [
        "Clasificaron a su primer mundial en la lejana edición de Suecia 1958.",
        "En su debut en el 58 llegaron a Cuartos y fueron eliminados por el primer gol mundialista de Pelé.",
        "Regresaron a la máxima competición de la FIFA tras 64 años de espera en Catar 2022.",
        "Su máxima figura histórica de la era moderna ha sido el extremo Gareth Bale.",
        "Se les conoce en el entorno del fútbol británico como los Dragones Rojos.",
        "Su escudo luce con orgullo el dragón galés tradicional de su herencia celta.",
        "Bale anotó de penal el gol del regreso mundialista ante EE.UU. en 2022.",
        "La mayoría de sus componentes compiten directamente en el sistema de ligas de Inglaterra.",
        "Su afición destaca por entonar cánticos tradicionales galeses de enorme emotividad.",
        "La disciplina táctica y el contragolpe veloz definen su estilo histórico de juego."
    ],
    "Arabia Saudita": [
        "Sorprendieron al mundo entero al derrotar a la Argentina de Messi en Catar 2022.",
        "Su mejor registro histórico fue clasificar a Octavos de Final en EE.UU. 1994.",
        "Saeed Al-Owairan anotó en el 94 un gol maradoniano eludiendo a toda la defensa de Bélgica.",
        "Son conocidos popularmente en el Medio Oriente como los Hijos del Desierto.",
        "Su debut oficial en la gran cita de la FIFA ocurrió en el torneo de 1994.",
        "Tradicionalmente, toda su plantilla juega exclusivamente en la liga local saudí.",
        "Su uniforme es completamente verde o blanco, reflejo directo de sus símbolos nacionales.",
        "Han dominado la Copa del Golfo y son una potencia consolidada en la confederación asiática.",
        "Su gobierno premió de forma histórica a los jugadores tras la victoria del 2022.",
        "La inversión en su liga local ha atraído la mirada de todo el planeta fútbol."
    ],
    "Perú": [
        "Estuvieron presentes en el primer mundial de la historia en Uruguay 1930.",
        "Su generación dorada liderada por Teófilo Cubillas brilló con luz propia en México 1970.",
        "Cubillas es uno de los máximos goleadores históricos de los mundiales con 10 tantos.",
        "Regresaron de forma emotiva a un mundial en Rusia 2018 tras 36 años de ausencias.",
        "Su camiseta blanca con la emblemática franja roja diagonal es considerada de las más hermosas.",
        "En el mundial de Argentina 1978 clasificaron invictos en el primer lugar de su grupo.",
        "Su afición ganó el premio FIFA Fan Award en 2018 por copar masivamente las ciudades rusas.",
        "Se caracterizan históricamente por un juego de toque fino, picardía y alta posesión.",
        "Su máximo goleador en eliminatorias generales es el delantero Paolo Guerrero.",
        "Teodoro 'Lolo' Fernández es considerado el gran ídolo primitivo de su historia futbolística."
    ],
    "México": [
        "Es el país que ha disputado más partidos inaugurales en la historia de los mundiales.",
        "Ha sido el orgulloso organizador en solitario de dos ediciones históricas: 1970 y 1986.",
        "En su tierra se coronaron las dos máximas deidades del fútbol: Pelé y Maradona.",
        "Su mejor resultado histórico ha sido alcanzar los Cuartos de Final como locales.",
        "La maldición del 'quinto partido' ha marcado sus últimas participaciones en octavos.",
        "El central Rafael Márquez es de los pocos en capitanear en 5 mundiales distintos.",
        "Comparten la organización de la Copa del Mundo 2026 junto a EE.UU. y Canadá.",
        "Su estadio Azteca es el único en el mundo en albergar tres partidos inaugurales.",
        "La fanaticada mexicana es famosa por inundar de color, mariachis y fiesta los mundiales.",
        "Su uniforme tradicional es verde bandera, pantalón blanco y medias rojas."
    ],
    "Dinamarca": [
        "Deslumbraron al planeta fútbol en México 1986 con el apodo de la 'Dinamita Danesa'.",
        "Su mejor registro histórico fue alcanzar los Cuartos de Final en Francia 1998.",
        "Michael y Brian Laudrup son considerados las mayores leyendas de su historia.",
        "Ganaron la Eurocopa de 1992 tras ingresar de emergencia por la exclusión de Yugoslavia.",
        "Mantienen un juego basado en el orden táctico, dinámica física y mentalidad fría.",
        "Su uniforme clásico rojo y blanco de la marca Hummel es un ícono de diseño retro.",
        "En el mundial de 1998 jugaron un partido memorable de cuartos perdiendo 3-2 ante Brasil.",
        "Jon Dahl Tomasson es su máximo anotador histórico en fases finales mundialistas.",
        "Su guardameta Peter Schmeichel es considerado de los mejores arqueros del siglo XX.",
        "La unión y la fuerza colectiva marcan la pauta de todos sus procesos deportivos."
    ],
    "Túnez": [
        "Hicieron historia en Argentina 1978 al ser el primer equipo africano en ganar un partido mundialista.",
        "Se les conoce en el panorama del fútbol internacional como las Águilas de Cartago.",
        "Su debut oficial en la gran vitrina de la FIFA se registró en el torneo de 1978.",
        "A pesar de sus múltiples participaciones, nunca han logrado superar la fase de grupos.",
        "En Catar 2022 consiguieron una victoria histórica de prestigio venciendo 1-0 a Francia.",
        "Su uniforme estelar adopta los colores rojo y blanco en honor a su bandera nacional.",
        "Su estilo destaca por el orden defensivo estricto y la intensidad en el mediocampo.",
        "La mayoría de sus futbolistas compiten en la liga local tunecina o en el fútbol de Francia.",
        "Mantienen una enconada rivalidad en el norte de África contra Argelia y Egipto.",
        "Su distribución táctica es sumamente rocosa y difícil de penetrar en el campo."
    ],
    "Nueva Zelanda": [
        "Lograron su primera e histórica clasificación para el Mundial de España 1982.",
        "Hicieron una gesta increíble en Sudáfrica 2010 al terminar invictos en la fase de grupos.",
        "En 2010 fueron el único equipo de todo el torneo que no perdió ningún partido.",
        "Se les conoce popularmente en el ámbito deportivo internacional como los All Whites.",
        "El fútbol compite directamente en popularidad contra el gigante nacional del rugby.",
        "Su uniforme es completamente blanco, contraste directo con la vestimenta negra del rugby.",
        "Consiguieron un empate histórico 1-1 ante la campeona vigente Italia en el año 2010.",
        "Su delantero histórico leyenda y capitán en 2010 fue Ryan Nelsen.",
        "La mayoría de sus jugadores compiten en la liga australiana o en el fútbol de Inglaterra.",
        "Dominan de forma casi absoluta las eliminatorias correspondientes a la zona de Oceanía."
    ],
    "Chile": [
        "Fueron los organizadores del séptimo mundial de la historia en el año 1962.",
        "Consiguieron un histórico e inolvidable tercer lugar actuando como locales en el 62.",
        "Leonel Sánchez fue uno de los máximos anotadores de su mundial con 4 goles.",
        "Su identidad de juego agresiva quedó inmortalizada con esquemas de alta presión.",
        "Se les conoce en todo el continente americano como la Roja.",
        "La generación dorada liderada por Alexis y Arturo Vidal ganó dos Copas América.",
        "Protagonizaron junto a Italia el partido ultra físico de 1962 conocido como la Batalla de Santiago.",
        "Su goleador histórico en eliminatorias de la Conmebol es el delantero Iván Zamorano.",
        "El Estadio Nacional de Santiago es el templo principal e histórico de la selección.",
        "Fueron uno de los trece países pioneros en disputar el mundial de Uruguay 1930."
    ],
    "Austria": [
        "Su época de oro se dio en los años 30 con el legendario equipo conocido como el Wunderteam.",
        "Alcanzaron el tercer lugar del mundo en el torneo de Suiza 1954.",
        "Su partido de 1954 contra Suiza terminó 7-5, el de mayor cantidad de goles registrados.",
        "Su máximo ídolo es Matthias Sindelar, apodado 'El Mozart del fútbol'.",
        "Se ausentaron del mundial de 1938 debido a coyunturas geopolíticas de la época.",
        "Mantienen un clásico europeo de enorme rivalidad histórica frente a Hungría.",
        "El uniforme tradicional combina de forma muy elegante camiseta blanca con pantalón negro.",
        "En el Mundial de Argentina 1978 protagonizaron el 'Milagro de Córdoba' venciendo a Alemania.",
        "Su referente moderno de mayor impacto internacional ha sido el polivalente David Alaba.",
        "La estructura de formación local provee un juego dinámico y colectivo coordinado."
    ],
    "Egipto": [
        "Fue el primer país de todo el continente africano en disputar un mundial (Italia 1934).",
        "Su guardameta Essam El-Hadary es el jugador más longevo en jugar un mundial con 45 años.",
        "Se les conoce en todo el mundo del deporte como los Faraones.",
        "Son los reyes absolutos de la Copa Africana de Naciones con un récord de 7 títulos.",
        "Su máxima deidad futbolística moderna es el delantero estrella Mohamed Salah.",
        "Abdulrahman Fawzi fue el primer africano en anotar un gol en la historia de los mundiales.",
        "El fútbol desata una pasión extrema en el país, dividida entre grandes clubes locales.",
        "Su uniforme clásico es rojo brillante con detalles blancos y negros.",
        "A pesar de su tremendo dominio continental, solo han logrado clasificar a tres mundiales.",
        "Su fortín para los compromisos de eliminatorias suele ser el Estadio de El Cairo."
    ],
    "China": [
        "Lograron su histórica y única clasificación mundialista para el torneo de Corea-Japón 2002.",
        "Fueron dirigidos en su única experiencia por el trotamundos serbio Bora Milutinović.",
        "En 2002 compartieron un grupo sumamente duro ante Brasil, Turquía y Costa Rica.",
        "Mantiene un plan estratégico estatal para potenciar significativamente su fútbol base.",
        "El legendario zaguero Sun Jihai fue de sus primeros jugadores en brillar en la Premier League.",
        "Su uniforme estelar adopta el rojo brillante y amarillo, reflejo de su bandera nacional.",
        "A pesar del apoyo corporativo local, trabajan intensamente para regresar a una fase final.",
        "Su liga local experimentó una etapa de alta resonancia contratando estrellas mundiales.",
        "Tienen una rivalidad asiática de enorme tensión frente a Corea del Sur y Japón.",
        "Su federación fue fundada originalmente en 1924 y se afilió a la FIFA en 1931."
    ],
    "Senegal": [
        "Deslumbraron al mundo en su debut en 2002 venciendo a la campeona vigente Francia.",
        "En su primer mundial llegaron de forma espectacular hasta los Cuartos de Final.",
        "Se les conoce internacionalmente en el fútbol como los Leones de la Teranga.",
        "Su director técnico, Aliou Cissé, fue el capitán del equipo histórico de 2002.",
        "Se coronaron campeones de África por primera vez en su historia en el año 2022.",
        "Su jugador estrella Sadio Mané es considerado uno de los grandes astros africanos.",
        "En Rusia 2018 fueron eliminados de forma insólita por el criterio de tarjetas.",
        "Su estilo conjuga un despliegue físico portentoso con una velocidad letal por las bandas.",
        "El recordado Papa Bouba Diop anotó el gol histórico del triunfo contra Francia en 2002.",
        "La enorme mayoría de sus seleccionados militan en las ligas más importantes de Europa."
    ],
    "Serbia": [
        "Heredó los registros estadísticos históricos de las antiguas selecciones de Yugoslavia.",
        "Son conocidos popularmente en el entorno del fútbol europeo como las Águilas Blancas.",
        "Destacan históricamente por producir mediocampistas de tremendo físico y fina técnica.",
        "En Sudáfrica 2010 consiguieron una victoria histórica de prestigio venciendo 1-0 a Alemania.",
        "Mantienen una intensa rivalidad balcánica de alta tensión frente a Croacia y Suiza.",
        "Su uniforme clásico es completamente rojo con detalles azules y blancos.",
        "El legendario Dragan Stojković es considerado uno de los mayores mitos de su fútbol.",
        "La cantera local nutre constantemente a los clubes más importantes de Europa.",
        "Su juego aéreo y potencia física son de sus principales argumentos de peso táctico.",
        "Compiten bajo el nombre exclusivo de Serbia desde el año 2006 de forma independiente."
    ],
    "Camerún": [
        "Hicieron historia en Italia 1990 al ser la primera selección africana en llegar a Cuartos.",
        "El delantero Roger Milla anotó 4 goles celebrándolo con su famoso baile en el córner.",
        "Se les conoce en todo el planeta fútbol como los Leones Indomables.",
        "Su presidente de la federación es su máxima leyenda histórica, Samuel Eto'o.",
        "En el Mundial de España 1982 quedaron eliminados de forma invicta con tres empates.",
        "Son famosos por utilizar indumentarias revolucionarias en esquemas de diseño deportivo.",
        "Eto'o es el único jugador africano en disputar cuatro Copas del Mundo distintas.",
        "Tienen una rivalidad continental de alta tensión frente a Nigeria y Egipto.",
        "Su victoria 1-0 ante la Argentina de Maradona en el partido inaugural del 90 sacudió al planeta.",
        "Es una de las naciones africanas que más talentos ha exportado al fútbol internacional."
    ],
    "Costa Rica": [
        "Firmaron la mayor hazaña de Centroamérica al llegar a Cuartos de Final en Brasil 2014.",
        "En 2014 clasificaron primeros en el grupo ante Uruguay, Italia e Inglaterra.",
        "Su guardameta Keylor Navas fue la gran figura, saltando de inmediato al Real Madrid.",
        "Hicieron su gran debut histórico en la Copa del Mundo en la edición de Italia 1990.",
        "Se les conoce cariñosamente en la Concacaf como los Ticos o la Sele.",
        "El técnico serbio Bora Milutinović comandó la hazaña de clasificar a octavos en 1990.",
        "Su uniforme tradicional se compone de camiseta roja, pantalón azul y medias blancas.",
        "Su bloque colectivo destaca por un temperamento táctico sumamente disciplinado.",
        "Mantienen el clásico centroamericano de alta intensidad frente a Honduras.",
        "El lema nacional 'Pura Vida' acompaña siempre la identidad alegre de su delegación."
    ],
    "Suecia": [
        "Alcanzaron la gran final del mundo en 1958 actuando como el país anfitrión.",
        "Cayeron en la final de 58 ante el Brasil de Pelé en un duelo repleto de anotaciones.",
        "Consiguieron un brillante y recordado tercer puesto en el Mundial de Estados Unidos 1994.",
        "Su indumentaria es de las más reconocibles con los colores amarillo brillante y azul.",
        "Su máximo e histórico artillero moderno de impacto global ha sido Zlatan Ibrahimović.",
        "En la edición de 1950 en Brasil lograron también un valioso tercer lugar.",
        "Mantienen una histórica rivalidad nórdica de alta tensión frente a Dinamarca.",
        "Su estilo combina tradicionalmente un estricto orden defensivo con gran poderío físico.",
        "Grandes figuras históricas lideraron el letal ataque de la mítica plantilla del 94.",
        "Su federación de fútbol es de las fundadoras de la UEFA, instituida en 1904."
    ],
    "Polonia": [
        "Consiguieron un histórico tercer lugar del mundo en dos ediciones: 1974 y 1982.",
        "Grzegorz Lato ganó la Bota de Oro como máximo goleador en 1974 con 7 tantos.",
        "Su escuadra es famosa por planteamientos colectivos de alta fricción física.",
        "Su delantero Robert Lewandowski es considerado uno de los mejores atacantes modernos.",
        "Vivieron su época dorada bajo el mando técnico de grandes estrategas locales.",
        "Su uniforme clásico luce los colores blanco nítido y rojo de sus símbolos nacionales.",
        "En el mundial de 1982 derrotaron a Francia para quedarse con la medalla de bronce.",
        "Se caracterizan por un fútbol de transiciones rápidas y gran fortaleza en el juego aéreo.",
        "Grandes estrellas históricas marcaron el ritmo competitivo de su edad de oro.",
        "La liga local ha servido de base fundamental para el despegue de sus figuras."
    ],
    "Ghana": [
        "Estuvieron a un paso de las semifinales en Sudáfrica 2010, eliminados de forma agónica.",
        "Se les conoce a nivel internacional en el panorama deportivo como las Estrellas Negras.",
        "Asamoah Gyan es el máximo goleador africano en la historia de los mundiales.",
        "Hicieron su gran debut mundialista en la edición de Alemania 2006 avanzando a octavos.",
        "En 2010 igualaron la gesta de Camerún y Senegal al meterse entre los ocho mejores.",
        "Su uniforme blanco incorpora la icónica estrella negra de su bandera en el pecho.",
        "La velocidad física exhuberante y el ritmo competitivo marcan la pauta de su estilo.",
        "Mantienen duelos de alta rivalidad en el continente africano contra Nigeria.",
        "Su plantilla de 2010 contaba con una inmensa base de campeones juveniles internacionales.",
        "Han aportado mediocampistas de leyenda a los clubes más grandes de toda Europa."
    ]
};

const baseCalendarios = {
    "España": ["25/06 vs Japón 🏟️ Azteca", "29/06 Dieciseisavos de Final ⏰ Confirmar"],
    "Argentina": ["24/06 vs Marruecos 🏟️ LA", "29/06 Dieciseisavos de Final ⏰ Confirmar"],
    "Brasil": ["26/06 vs Portugal 🏟️ Miami", "30/06 Dieciseisavos de Final ⏰ Confirmar"],
    "Francia": ["25/06 vs Canadá 🏟️ Vancouver", "29/06 Dieciseisavos de Final ⏰ Confirmar"]
};

const poolMascotas = ["m1.png", "m2.png", "m3.png"];

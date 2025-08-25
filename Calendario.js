// Configuración inicial
const etiquetasDias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];
const CLAVE_ALMACENAMIENTO = 'calendarSpecialDates_v1';
let fechasEspeciales = {};

// Eventos Astronómicos de 2025 (ampliados)
const eventosAstronomicosPreCargados = {
    "2025-01-03": { desc: "Lluvia de meteoros Cuadrántidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-01-04": { desc: "Tierra en Perihelio", url: "https://science.nasa.gov/solar-system/sun/", type: "planeta" },
    "2025-01-16": { desc: "Marte en Oposición", url: "https://science.nasa.gov/solar-system/mars/", type: "planeta" },
    "2025-02-11": { desc: "Luna Nueva", url: "https://science.nasa.gov/moon/", type: "luna" },
    "2025-02-27": { desc: "Luna Llena", url: "https://science.nasa.gov/moon/", type: "luna" },
    "2025-03-14": { desc: "Eclipse Lunar Total", url: "https://science.nasa.gov/solar-system/eclipses/", type: "eclipse" },
    "2025-03-20": { desc: "Equinoccio de Primavera", url: "https://science.nasa.gov/earth/", type: "estacional" },
    "2025-03-29": { desc: "Eclipse Solar Parcial", url: "https://science.nasa.gov/solar-system/eclipses/", type: "eclipse" },
    "2025-04-22": { desc: "Lluvia de meteoros Líridas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-05-05": { desc: "Lluvia de meteoros Eta Acuáridas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-05-26": { desc: "Luna Llena de Flores", url: "https://science.nasa.gov/moon/", type: "luna" },
    "2025-06-20": { desc: "Solsticio de Verano", url: "https://science.nasa.gov/earth/", type: "estacional" },
    "2025-06-27": { desc: "Lluvia de meteoros Bootidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-07-28": { desc: "Lluvia de meteoros Piscis Austrínidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-07-30": { desc: "Lluvia de meteoros Delta Acuáridas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-07-30_2": { desc: "Lluvia de meteoros Alfa Capricórnidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-08-12": { desc: "Lluvia de meteoros Perseidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-08-19": { desc: "Luna Azul", url: "https://science.nasa.gov/moon/", type: "luna" },
    "2025-09-07": { desc: "Eclipse Lunar Total", url: "https://science.nasa.gov/solar-system/eclipses/", type: "eclipse" },
    "2025-09-21": { desc: "Eclipse Solar Parcial", url: "https://science.nasa.gov/solar-system/eclipses/", type: "eclipse" },
    "2025-09-21_2": { desc: "Saturno en Oposición", url: "https://science.nasa.gov/solar-system/saturn/", type: "planeta" },
    "2025-09-23": { desc: "Equinoccio de Otoño", url: "https://science.nasa.gov/earth/", type: "estacional" },
    "2025-09-23_2": { desc: "Neptuno en Oposición", url: "https://science.nasa.gov/solar-system/neptune/", type: "planeta" },
    "2025-10-22": { desc: "Lluvia de meteoros Oriónidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-11-04": { desc: "Lluvia de meteoros Táuridas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-11-08": { desc: "Lluvia de meteoros Táuridas Norte", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-11-17": { desc: "Lluvia de meteoros Leónidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-11-21": { desc: "Urano en Oposición", url: "https://science.nasa.gov/solar-system/uranus/", type: "planeta" },
    "2025-12-13": { desc: "Lluvia de meteoros Gemínidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-12-21": { desc: "Solsticio de Invierno", url: "https://science.nasa.gov/earth/", type: "estacional" },
    "2025-12-21_2": { desc: "Lluvia de meteoros Úrsidas", url: "https://science.nasa.gov/solar-system/meteors/", type: "lluvia" },
    "2025-12-25": { desc: "Navidad - Alineación planetaria", url: "https://science.nasa.gov/solar-system/", type: "planeta" }
};

// Elementos DOM
const contenedorPrincipal = document.querySelector('.container');
const etiquetaMes = contenedorPrincipal.querySelector('.month');
const cuadrillaCalendario = contenedorPrincipal.querySelector('.calendar-grid');
const botonAnterior = contenedorPrincipal.querySelector('#prevMonth');
const botonSiguiente = contenedorPrincipal.querySelector('#nextMonth');
const currentMonthEventsList = document.getElementById('currentMonthEventsList');
const allEventsList = document.getElementById('allEventsList');
const starsContainer = document.getElementById('stars');
const particlesContainer = document.getElementById('particles');
const audioToggle = document.getElementById('audioToggle');
const themeToggle = document.getElementById('themeToggle');

let fechaActual = new Date();
fechaActual.setDate(1);
let mesActual = fechaActual.getMonth();
let añoActual = fechaActual.getFullYear();
let isAudioPlaying = false;
let isDarkTheme = true;

// Crear efecto de estrellas
function crearEstrellas() {
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        
        // Tamaño aleatorio entre 1-3px
        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        
        // Posición aleatoria
        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;
        
        // Retraso de animación aleatorio
        star.style.animationDelay = `${Math.random() * 5}s`;
        star.style.animationDuration = `${Math.random() * 3 + 3}s`;
        
        starsContainer.appendChild(star);
    }
}

// Crear efecto de partículas
function crearParticulas() {
    const particleCount = 30;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Tamaño aleatorio
        const size = Math.random() * 30 + 10;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        
        // Retraso de animación aleatorio
        const delay = Math.random() * 15;
        particle.style.animationDelay = `${delay}s`;
        
        // Duración aleatoria
        const duration = Math.random() * 10 + 15;
        particle.style.animationDuration = `${duration}s`;
        
        particlesContainer.appendChild(particle);
    }
}

// Control de audio
function setupAudio() {
    const audio = document.getElementById('interestelar');
    audio.volume = 0.3;
    
    audioToggle.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
            audioToggle.innerHTML = '<i class="fas fa-volume-up"></i>';
            isAudioPlaying = true;
        } else {
            audio.pause();
            audioToggle.innerHTML = '<i class="fas fa-volume-mute"></i>';
            isAudioPlaying = false;
        }
    });
}

// Alternar tema
function setupThemeToggle() {
    themeToggle.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        
        if (isDarkTheme) {
            document.documentElement.style.setProperty('--color-bg', '#0a0a1a');
            document.documentElement.style.setProperty('--color-container', 'rgba(12, 12, 35, 0.92)');
            document.documentElement.style.setProperty('--color-text', '#e0e0f0');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            document.documentElement.style.setProperty('--color-bg', '#1a1a2e');
            document.documentElement.style.setProperty('--color-container', 'rgba(22, 22, 45, 0.92)');
            document.documentElement.style.setProperty('--color-text', '#e0e0ff');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });
}

// Renderizar etiquetas de días de la semana
function renderizarEtiquetasDias() {
    etiquetasDias.forEach(dia => {
        const elementoEtiquetaDia = document.createElement('div');
        elementoEtiquetaDia.className = 'day-label';
        elementoEtiquetaDia.textContent = dia;
        cuadrillaCalendario.appendChild(elementoEtiquetaDia);
    });
}

// Limpiar días del calendario (excepto etiquetas)
function limpiarDiasCalendario() {
    while (cuadrillaCalendario.children.length > 7) {
        cuadrillaCalendario.removeChild(cuadrillaCalendario.lastChild);
    }
}

// Formatear fecha a YYYY-MM-DD
function formatearFecha(fecha) {
    const anio = fecha.getFullYear();
    const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    const dia = fecha.getDate().toString().padStart(2, '0');
    return `${anio}-${mes}-${dia}`;
}

// Obtener eventos para un mes específico
function obtenerEventosDelMes(mes, año) {
    const eventosMes = [];
    
    for (const [fechaStr, eventoData] of Object.entries(eventosAstronomicosPreCargados)) {
        const fechaBase = fechaStr.split('_')[0]; // Para manejar fechas con sufijo
        const [eventoAño, eventoMes, eventoDia] = fechaBase.split('-').map(Number);
        
        if (eventoAño === año && eventoMes === (mes + 1)) {
            eventosMes.push({
                fecha: `${año}-${String(eventoMes).padStart(2, '0')}-${String(eventoDia).padStart(2, '0')}`,
                desc: eventoData.desc,
                url: eventoData.url,
                type: eventoData.type
            });
        }
    }
    
    return eventosMes.sort((a, b) => new Date(a.fecha) - new Date(b.fecha));
}

// Renderizar eventos del mes actual
function renderizarEventosDelMes() {
    currentMonthEventsList.innerHTML = '';
    const eventos = obtenerEventosDelMes(mesActual, añoActual);
    
    if (eventos.length === 0) {
        const elementoLista = document.createElement('li');
        elementoLista.className = 'no-dates-message';
        elementoLista.textContent = 'No hay eventos astronómicos este mes.';
        currentMonthEventsList.appendChild(elementoLista);
        return;
    }
    
    eventos.forEach(evento => {
        const elementoLista = document.createElement('li');
        // CORRECCIÓN: Se extrae el año, mes y día para crear la fecha correctamente en el huso horario local.
        const [year, month, day] = evento.fecha.split('-').map(Number);
        const fecha = new Date(year, month - 1, day);
        const fechaFormateada = fecha.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long' 
        });
        
        // Icono según el tipo de evento
        let icono = '✦';
        if (evento.type === 'lluvia') icono = '☄️';
        else if (evento.type === 'planeta') icono = '🪐';
        else if (evento.type === 'eclipse') icono = '🌙';
        else if (evento.type === 'luna') icono = '🌕';
        else if (evento.type === 'estacional') icono = '🌎';
        
        elementoLista.innerHTML = `
            <div class="date-info">
                <strong>${fechaFormateada} ${icono}</strong>
                <span>${evento.desc}</span>
            </div>
            ${evento.url ? `<a href="${evento.url}" target="_blank" class="more-info-link" aria-label="Más información"><i class="fas fa-external-link-alt"></i></a>` : ''}
        `;
        
        currentMonthEventsList.appendChild(elementoLista);
    });
}

// Renderizar todos los eventos
function renderizarTodosEventos() {
    allEventsList.innerHTML = '';
    const todosEventos = [];
    
    for (const [fechaStr, eventoData] of Object.entries(eventosAstronomicosPreCargados)) {
        const fechaBase = fechaStr.split('_')[0];
        const [año, mes, dia] = fechaBase.split('-').map(Number);
        
        todosEventos.push({
            fecha: `${año}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`,
            desc: eventoData.desc,
            url: eventoData.url,
            type: eventoData.type
        });
    }
    
    // CORRECCIÓN: Se actualiza la función de ordenación para crear fechas correctas.
    todosEventos.sort((a, b) => {
        const [a_año, a_mes, a_dia] = a.fecha.split('-').map(Number);
        const [b_año, b_mes, b_dia] = b.fecha.split('-').map(Number);
        return new Date(a_año, a_mes - 1, a_dia) - new Date(b_año, b_mes - 1, b_dia);
    });
    
    if (todosEventos.length === 0) {
        const elementoLista = document.createElement('li');
        elementoLista.className = 'no-dates-message';
        elementoLista.textContent = 'No hay eventos astronómicos.';
        allEventsList.appendChild(elementoLista);
        return;
    }
    
    todosEventos.forEach(evento => {
        const elementoLista = document.createElement('li');
        // CORRECCIÓN: Se extrae el año, mes y día para crear la fecha correctamente en el huso horario local.
        const [year, month, day] = evento.fecha.split('-').map(Number);
        const fecha = new Date(year, month - 1, day);
        
        const fechaFormateada = fecha.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long',
            year: 'numeric'
        });
        
        // Icono según el tipo de evento
        let icono = '✦';
        if (evento.type === 'lluvia') icono = '☄️';
        else if (evento.type === 'planeta') icono = '🪐';
        else if (evento.type === 'eclipse') icono = '🌙';
        else if (evento.type === 'luna') icono = '🌕';
        else if (evento.type === 'estacional') icono = '🌎';
        
        elementoLista.innerHTML = `
            <div class="date-info">
                <strong>${fechaFormateada} ${icono}</strong>
                <span>${evento.desc}</span>
            </div>
            ${evento.url ? `<a href="${evento.url}" target="_blank" class="more-info-link" aria-label="Más información"><i class="fas fa-external-link-alt"></i></a>` : ''}
        `;
        
        allEventsList.appendChild(elementoLista);
    });
}

// Renderizar calendario
function renderizarCalendario() {
    limpiarDiasCalendario();
    const anio = fechaActual.getFullYear();
    const mes = fechaActual.getMonth();
    
    // Actualizar variables globales
    mesActual = mes;
    añoActual = anio;

    const nombreMes = fechaActual.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
    etiquetaMes.textContent = nombreMes.charAt(0).toUpperCase() + nombreMes.slice(1);

    let primerDiaSemana = fechaActual.getDay();
    if (primerDiaSemana === 0) primerDiaSemana = 7;
    const desplazamiento = primerDiaSemana - 1;

    const diasEnMes = new Date(anio, mes + 1, 0).getDate();
    const diasMesAnterior = new Date(anio, mes, 0).getDate();

    // Días del mes anterior
    for (let i = 0; i < desplazamiento; i++) {
        const numeroDia = diasMesAnterior - desplazamiento + 1 + i;
        const elementoDia = document.createElement('div');
        elementoDia.className = 'day inactive';
        elementoDia.innerHTML = `<span class="day-number">${numeroDia}</span>`;
        cuadrillaCalendario.appendChild(elementoDia);
    }

    // Días del mes actual
    for (let dia = 1; dia <= diasEnMes; dia++) {
        const elementoDia = document.createElement('div');
        elementoDia.className = 'day';
        elementoDia.innerHTML = `<span class="day-number">${dia}</span>`;

        const fechaActualDia = new Date(anio, mes, dia);
        const cadenaFecha = formatearFecha(fechaActualDia);

        // Verificar si hay eventos para este día
        let eventosDelDia = [];
        for (const key in eventosAstronomicosPreCargados) {
            if (key.startsWith(cadenaFecha)) {
                eventosDelDia.push(eventosAstronomicosPreCargados[key].desc);
            }
        }

        // Si hay eventos, marcar el día como especial
        if (eventosDelDia.length > 0) {
            elementoDia.classList.add('special');
            elementoDia.setAttribute('tabindex', '0');
            elementoDia.setAttribute('role', 'button');
            elementoDia.setAttribute('aria-label', `${dia} de ${nombreMes}, evento: ${eventosDelDia[0]}`);
            
            const eventIndicator = document.createElement('span');
            eventIndicator.className = 'event-indicator';
            eventIndicator.textContent = eventosDelDia[0];
            elementoDia.appendChild(eventIndicator);

            // Encontrar URL para redirección (usar la primera encontrada)
            let urlEvento = null;
            for (const key in eventosAstronomicosPreCargados) {
                if (key.startsWith(cadenaFecha)) {
                    urlEvento = eventosAstronomicosPreCargados[key].url;
                    break;
                }
            }

            if (urlEvento) {
                elementoDia.addEventListener('click', () => {
                    window.open(urlEvento, '_blank');
                });
                
                elementoDia.addEventListener('keydown', (ev) => {
                    if (ev.key === 'Enter' || ev.key === ' ') {
                        ev.preventDefault();
                        window.open(urlEvento, '_blank');
                    }
                });
            }
        }

        cuadrillaCalendario.appendChild(elementoDia);
    }

    // Días del siguiente mes
    const totalDiasRenderizados = desplazamiento + diasEnMes;
    const restantes = (7 - (totalDiasRenderizados % 7)) % 7;
    for (let i = 1; i <= restantes; i++) {
        const elementoDia = document.createElement('div');
        elementoDia.className = 'day inactive';
        elementoDia.innerHTML = `<span class="day-number">${i}</span>`;
        cuadrillaCalendario.appendChild(elementoDia);
    }
    
    // Actualizar lista de eventos del mes
    renderizarEventosDelMes();
}

// Navegación entre meses
botonAnterior.addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() - 1);
    renderizarCalendario();
});

botonSiguiente.addEventListener('click', () => {
    fechaActual.setMonth(fechaActual.getMonth() + 1);
    renderizarCalendario();
});

// Inicialización
function inicializar() {
    crearEstrellas();
    crearParticulas();
    renderizarEtiquetasDias();
    renderizarCalendario();
    renderizarTodosEventos();
    setupAudio();
    setupThemeToggle();
    
    // Intentar reproducir audio después de la interacción del usuario
    setTimeout(() => {
        document.body.click();
    }, 1000);
}

 document.addEventListener('DOMContentLoaded', () => {
    // Código para el menú desplegable
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.overlay');
    const body = document.body;
    
    const closeMenu = () => {
        navLinks.classList.remove('active');
        overlay.classList.remove('active');
        body.classList.remove('menu-open');
    };
    
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        overlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    overlay.addEventListener('click', closeMenu);
    
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !menuBtn.contains(e.target)) {
            closeMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks.classList.contains('active')) {
            closeMenu();
        }
    });
    
}); 


// Iniciar la aplicación
inicializar();
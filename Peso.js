const planetInfoSection = document.getElementById('planet-info');
const pesoTierraInput = document.getElementById('pesoTierra');
const resultadoParrafo = document.getElementById('resultado');
const planetButtons = document.querySelectorAll('.planet-buttons button');
const backgroundVideo = document.getElementById('background-video');

const planetVideos = {
    sol: "videospeso/sol.mp4",
    mercurio: "videospeso/mercurio.mp4",
    venus: "videospeso/venus.mp4",
    tierra: "videospeso/tierra.mp4",
    marte: "videospeso/marte.mp4",
    jupiter: "videospeso/jupiter.mp4",
    saturno: "videospeso/saturno.mp4",
    urano: "videospeso/urano.mp4",
    neptuno: "videospeso/neptuno.mp4"
};

const planetData = {
    sol: {
        nombre: "Sol",
        descripcion: "El Sol es la estrella central de nuestro sistema solar, una gigantesca esfera de plasma caliente que brilla con luz propia y proporciona la energía que sustenta la vida en la Tierra.",
        gravedadRelativa: 27.9,
        caracteristicas: [
            "La estrella más cercana a la Tierra.",
            "Representa el 99.86% de la masa del sistema solar.",
            "Compuesto principalmente de hidrógeno y helio.",
            "Fuente de luz y calor para el sistema solar.",
            "Genera energía mediante fusión nuclear."
        ]
    },
    mercurio: {
        nombre: "Mercurio",
        descripcion: "Mercurio es el planeta más pequeño y el más cercano al Sol. Es rocoso y tiene una superficie llena de cráteres.",
        gravedadRelativa: 0.38,
        caracteristicas: [
            "El planeta más cercano al Sol.",
            "El planeta más pequeño del sistema solar.",
            "No tiene lunas.",
            "Días muy largos y años cortos.",
            "Temperaturas extremas."
        ]
    },
    venus: {
        nombre: "Venus",
        descripcion: "Venus es el segundo planeta desde el Sol. Es similar en tamaño a la Tierra, pero tiene una atmósfera densa y tóxica, y es el planeta más caliente.",
        gravedadRelativa: 0.91,
        caracteristicas: [
            "Conocido como el 'lucero del alba' o 'lucero de la tarde'.",
            "Atmósfera muy densa compuesta principalmente de dióxido de carbono.",
            "La rotación es muy lenta y retrógrada (gira en sentido opuesto a la Tierra).",
            "Temperaturas superficiales extremadamente altas."
        ]
    },
    tierra: {
        nombre: "Tierra",
        descripcion: "La Tierra es el tercer planeta desde el Sol y el único conocido por albergar vida. Tiene una atmósfera rica en oxígeno y grandes océanos de agua líquida.",
        gravedadRelativa: 1.00,
        caracteristicas: [
            "Hogar de una gran diversidad de vida.",
            "Tiene una atmósfera protectora.",
            "Posee un satélite natural, la Luna.",
            "Grandes extensiones de agua líquida."
        ]
    },
    marte: {
        nombre: "Marte",
        descripcion: "Marte es el cuarto planeta desde el Sol, conocido como el 'planeta rojo' debido a su apariencia rojiza causada por el óxido de hierro en su superficie. Tiene casquetes polares y evidencia de agua líquida en el pasado.",
        gravedadRelativa: 0.38,
        caracteristicas: [
            "Tiene dos pequeñas lunas: Fobos y Deimos.",
            "Posee el volcán más grande conocido en el sistema solar, el Monte Olimpo.",
            "Evidencia de agua líquida antigua.",
            "Objetivo de numerosas misiones de exploración."
        ]
    },
    jupiter: {
        nombre: "Júpiter",
        descripcion: "Júpiter es el quinto planeta desde el Sol y el más grande del sistema solar. Es un gigante gaseoso con numerous lunas y un sistema de anillos débil.",
        gravedadRelativa: 2.34,
        caracteristicas: [
            "El planeta más masivo del sistema solar.",
            "Tiene la Gran Mancha Roja, una tormenta gigante.",
            "Posee numerous lunas, incluyendo las galileanas (Ío, Europa, Ganímedes y Calisto).",
            "Sistema de anillos tenue."
        ]
    },
    saturno: {
        nombre: "Saturno",
        descripcion: "Saturno es el sexto planeta desde el Sol, famoso por sus impresionantes anillos compuestos de hielo y roca. También es un gigante gaseoso con muchas lunas.",
        gravedadRelativa: 0.93,
        caracteristicas: [
            "Tiene el sistema de anillos más visible y espectacular.",
            "Posee numerous lunas, incluyendo Titán, la segunda luna más grande del sistema solar.",
            "Densidad menor que la del agua."
        ]
    },
    urano: {
        nombre: "Urano",
        descripcion: "Urano es el séptimo planeta desde el Sol. Es un gigante de hielo que orbita el Sol de lado y tiene anillos y numerous lunas.",
        gravedadRelativa: 0.92,
        caracteristicas: [
            "Gira sobre su lado, con sus polos apuntando aproximadamente hacia el Sol.",
            "Atmósfera rica en metano, lo que le da un color azul verdoso.",
            "Tiene anillos delgados y oscuros.",
            "Posee numerous lunas."
        ]
    },
    neptuno: {
        nombre: "Neptuno",
        descripcion: "Neptuno es el octavo y más lejano planeta conocido del Sol. Es un gigante de hielo con fuertes vientos, anillos y varias lunas.",
        gravedadRelativa: 1.12,
        caracteristicas: [
            "Conocido por sus fuertes vientos.",
            "Tiene un color azul intenso.",
            "Posee anillos y varias lunas, incluyendo Tritón, su luna más grande."
        ]
    }
};

function mostrarInfoPlaneta(planeta) {
    const data = planetData[planeta];
    if (data) {
        planetInfoSection.innerHTML = `
            <h2>${data.nombre}</h2>
            <p>${data.descripcion}</p>
            <h3>Características Principales:</h3>
            <ul>
                ${data.caracteristicas.map(caracteristica => `<li>${caracteristica}</li>`).join('')}
            </ul>
            <p>Gravedad relativa a la Tierra: <strong>${data.gravedadRelativa}</strong></p>
        `;
    } else {
        planetInfoSection.innerHTML = "<p>Información del cuerpo celeste no encontrada.</p>";
    }
}

function cambiarVideoFondo(planeta) {
    const videoUrl = planetVideos[planeta];
    if (videoUrl && backgroundVideo) {
        backgroundVideo.style.opacity = '0.2';
        setTimeout(() => {
            backgroundVideo.src = videoUrl;
            backgroundVideo.load();
            backgroundVideo.addEventListener('loadeddata', function () {
                backgroundVideo.style.opacity = '0.7';
            }, { once: true });
        }, 300);
    }
}

function calcularPesoPlanetario() {
    const pesoTierra = parseFloat(pesoTierraInput.value);
    const planetaSeleccionado = document.querySelector('.planet-buttons button.active');

    if (isNaN(pesoTierra)) {
        resultadoParrafo.textContent = "Por favor, ingresa un peso válido.";
        return;
    }

    if (planetaSeleccionado) {
        const planeta = planetaSeleccionado.dataset.planet;
        const gravedadRelativa = planetData[planeta].gravedadRelativa;
        const pesoEnPlaneta = (pesoTierra * gravedadRelativa).toFixed(2);
        resultadoParrafo.textContent = `Tu peso en ${planetData[planeta].nombre} sería de ${pesoEnPlaneta} kg.`;
    } else {
        resultadoParrafo.textContent = "Por favor, selecciona un cuerpo celeste.";
    }
}

planetButtons.forEach(button => {
    button.addEventListener('click', function () {
        planetButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        const planetaSeleccionado = this.dataset.planet;
        mostrarInfoPlaneta(planetaSeleccionado);
        cambiarVideoFondo(planetaSeleccionado);
        calcularPesoPlanetario();
    });
});

// Inicialización
mostrarInfoPlaneta('tierra');
document.querySelector('.planet-buttons button[data-planet="tierra"]').classList.add('active');
cambiarVideoFondo('tierra');

// Funcionalidad del menú
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

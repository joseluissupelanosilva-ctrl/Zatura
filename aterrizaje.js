document.addEventListener('DOMContentLoaded', () => {
    const lienzo = document.getElementById('gameCanvas');
    const ctx = lienzo.getContext('2d');
    const displayAltitud = document.getElementById('altitude');
    const displayVelocidad = document.getElementById('speed');
    const displayCombustible = document.getElementById('fuel');
    const displayMensaje = document.getElementById('message');
    const botonInicio = document.getElementById('startButton');

    const GRAVEDAD = 0.005;
    const POTENCIA_PROPULSOR = 0.01;
    const CONSUMO_COMBUSTIBLE = 0.5;
    const VELOCIDAD_MAX_ATERRIZAJE = 0.5;

    let moduloAterrizaje = {
        x: lienzo.width / 2,
        y: 50,
        ancho: 30,
        alto: 50,
        velocidadY: 0,
        combustible: 100,
        impulsando: false,
        aterrizado: false,
        estrellado: false
    };

    let juegoActivo = false;
    let idCuadroAnimacion;

    function dibujarModuloAterrizaje() {
        ctx.fillStyle = '#ccc';
        ctx.fillRect(moduloAterrizaje.x - moduloAterrizaje.ancho / 2, moduloAterrizaje.y, moduloAterrizaje.ancho, moduloAterrizaje.alto);

        ctx.strokeStyle = '#999';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(moduloAterrizaje.x - moduloAterrizaje.ancho / 2, moduloAterrizaje.y + moduloAterrizaje.alto);
        ctx.lineTo(moduloAterrizaje.x - moduloAterrizaje.ancho / 2 - 10, moduloAterrizaje.y + moduloAterrizaje.alto + 10);
        ctx.moveTo(moduloAterrizaje.x + moduloAterrizaje.ancho / 2, moduloAterrizaje.y + moduloAterrizaje.alto);
        ctx.lineTo(moduloAterrizaje.x + moduloAterrizaje.ancho / 2 + 10, moduloAterrizaje.y + moduloAterrizaje.alto + 10);
        ctx.stroke();

        if (moduloAterrizaje.impulsando && moduloAterrizaje.combustible > 0) {
            ctx.fillStyle = 'orange';
            ctx.beginPath();
            ctx.moveTo(moduloAterrizaje.x - moduloAterrizaje.ancho / 4, moduloAterrizaje.y + moduloAterrizaje.alto);
            ctx.lineTo(moduloAterrizaje.x, moduloAterrizaje.y + moduloAterrizaje.alto + 15 + Math.random() * 5);
            ctx.lineTo(moduloAterrizaje.x + moduloAterrizaje.ancho / 4, moduloAterrizaje.y + moduloAterrizaje.alto);
            ctx.fill();
        }
    }

    function dibujarSuelo() {
        ctx.fillStyle = '#555';
        ctx.fillRect(0, lienzo.height - 20, lienzo.width, 20);

        ctx.fillStyle = '#00ffcc';
        const anchoPlataforma = 80;
        const xPlataforma = lienzo.width / 2 - anchoPlataforma / 2;
        ctx.fillRect(xPlataforma, lienzo.height - 25, anchoPlataforma, 5);
    }

    function actualizarLogicaJuego() {
        if (!juegoActivo) return;

        moduloAterrizaje.velocidadY += GRAVEDAD;

        if (moduloAterrizaje.impulsando && moduloAterrizaje.combustible > 0) {
            moduloAterrizaje.velocidadY -= POTENCIA_PROPULSOR;
            moduloAterrizaje.combustible = Math.max(0, moduloAterrizaje.combustible - CONSUMO_COMBUSTIBLE);
        }

        moduloAterrizaje.y += moduloAterrizaje.velocidadY;

        if (moduloAterrizaje.y + moduloAterrizaje.alto >= lienzo.height - 20) {
            moduloAterrizaje.y = lienzo.height - 20 - moduloAterrizaje.alto;
            moduloAterrizaje.aterrizado = true;
            juegoActivo = false;
            verificarAterrizaje();
        }

        displayAltitud.textContent = Math.max(0, Math.floor((lienzo.height - 20 - moduloAterrizaje.y - moduloAterrizaje.alto))).toFixed(0);
        displayVelocidad.textContent = moduloAterrizaje.velocidadY.toFixed(2);
        displayCombustible.textContent = moduloAterrizaje.combustible.toFixed(1);
    }

    function bucleJuego() {
        ctx.clearRect(0, 0, lienzo.width, lienzo.height);
        dibujarSuelo();
        dibujarModuloAterrizaje();

        actualizarLogicaJuego();

        if (juegoActivo) {
            idCuadroAnimacion = requestAnimationFrame(bucleJuego);
        }
    }

    function verificarAterrizaje() {
        if (moduloAterrizaje.aterrizado) {
            if (moduloAterrizaje.velocidadY <= VELOCIDAD_MAX_ATERRIZAJE) {
                displayMensaje.textContent = 'Misión Exitosa, Aterrizaje suave.';
                displayMensaje.className = 'message win';
            } else {
                displayMensaje.textContent = ` Aterrizaje brusco. Velocidad: ${moduloAterrizaje.velocidadY.toFixed(2)} m/s`;
                displayMensaje.className = 'message lose';
                moduloAterrizaje.estrellado = true;
            }
            botonInicio.textContent = 'Volver a Intentar';
            botonInicio.style.display = 'block';
        }
    }

    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && juegoActivo && !moduloAterrizaje.aterrizado) {
            moduloAterrizaje.impulsando = true;
        }
    });

    document.addEventListener('keyup', (e) => {
        if (e.code === 'Space') {
            moduloAterrizaje.impulsando = false;
        }
    });

    function reiniciarJuego() {
        moduloAterrizaje = {
            x: lienzo.width / 2,
            y: 50,
            ancho: 30,
            alto: 50,
            velocidadY: 0,
            combustible: 100,
            impulsando: false,
            aterrizado: false,
            estrellado: false
        };
        displayMensaje.textContent = '';
        displayMensaje.className = 'message';
        botonInicio.style.display = 'none';

        juegoActivo = true;

        if (idCuadroAnimacion) {
            cancelAnimationFrame(idCuadroAnimacion);
        }
        idCuadroAnimacion = requestAnimationFrame(bucleJuego);
    }

    botonInicio.addEventListener('click', () => {
        reiniciarJuego();
    });

    botonInicio.style.display = 'block';
    displayMensaje.textContent = 'Prepárate para aterrizar tu módulo lunar.';

    ctx.clearRect(0, 0, lienzo.width, lienzo.height);
    dibujarSuelo();
    dibujarModuloAterrizaje();

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

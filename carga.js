const tiempoCarga = 20;

// Obtiene los elementos del DOM
const carga = document.querySelector(".carga");
const barraProgreso = document.querySelector(".barra-progreso::before");
const tiempoRestante = document.getElementById("tiempo-restante");
const title = document.getElementById("Datos");

// Inicia el temporizador
let tiempoRestanteSegundos = tiempoCarga;
const intervalo = setInterval(() => {
    // Actualiza el tiempo restante
    

    // Actualiza la barra de progreso
    const progreso = (tiempoCarga - tiempoRestanteSegundos) / tiempoCarga * 100;
    barraProgreso.style.width = {progreso};

    // Verifica si el tiempo de carga ha terminado
    if (tiempoRestanteSegundos === 0) {
        // Oculta la pantalla de carga
        carga.style.display = "none";
        clearInterval(intervalo);
    }
}, 1000);


const tiempoEspera = 5000;

// Función que se ejecutará después del tiempo de espera
function redirigirPagina() {
  // Redirige a la página deseada
  const ruta = "Zatura.html";
  window.location.href= ruta;
}

// Establece el temporizador
setTimeout(redirigirPagina, tiempoEspera);

const Array = [
"Saturno es un planeta que podría flotar en el agua debido a su baja densidad.",
"Cuando miramos al cielo por la noche, en realidad estamos echando un vistazo al pasado. Porque la mayoría de las estrellas están a millones de años luz de la Tierra. ",
"El Sol es el 99% de la masa total del sistema solar.",
"Siempre vemos el mismo lado de la luna .",
"Existe agua flotante en el espacio.",
"El espacio es completamente silencioso, ya que las ondas sonoras necesitan un medio para viajar.",
"La estrella más cercana a la Tierra, después del Sol, es Próxima Centauri, ubicada a 4.24 años luz de distancia.",
"Un año luz, la distancia que la luz recorre en un año, equivale a cerca de 9.46 billones de kilómetros.",
"Los días en Mercurio son más largos que sus años debido a su lenta rotación y rápida órbita alrededor del Sol.",
"Hay un agujero en el espacio que es tan grande que podría contener miles de millones de galaxias.",
"La palabra 'astronauta' proviene del griego que significa marinero de las estrellas.",
"El primer animal en orbitar la Tierra fue Laika, una perra enviada al espacio por la Unión Soviética en 1957, acabo muerta.",
"La velocidad de escape de la Tierra, la velocidad para vencer la fuerza gravitacional, es de unos 11.2 km/s.",
"La temperatura de Mercurio varía de -173 °C en la noche a 427 °C durante el día.",
"Según la NASA, existe un exoplaneta llamado 55 Cancri-e , y que probablemente esté cubierto de diamantes.",
"Cerca a un agujero negro, el tiempo se dilata por la fuerza de gravedad. Significa que si una persona se acerca a un agujero negro, el tiempo pasaría mucho más lento para ella que para alguien que esta en la tierra.",
];

function CargarCuriosidad(){
    const FuncionAleatorio = Math.floor(Math.random()*Array.length-1);
    const DatoAleatorio = Array[FuncionAleatorio];
    title.textContent = DatoAleatorio;

};



CargarCuriosidad();


setInterval(CargarCuriosidad, 4000);


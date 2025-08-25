/**
 * Cambia el video de fondo con una transición de opacidad.
 */
function cambiarVideo() {
    // Aplica la transición de salida (fade-out)
    videoElemento.style.opacity = '0';

    setTimeout(() => {
        // Actualiza el índice del video
        currentVideoIndex = (currentVideoIndex + 1) % videos.length;
        const siguienteVideoSrc = videos[currentVideoIndex];
        
        // Carga y reproduce el nuevo video
        videoElemento.src = siguienteVideoSrc;
        videoElemento.load();
        videoElemento.play();

        // Aplica la transición de entrada (fade-in)
        videoElemento.style.opacity = '1';
    }, duracionTransicionVideo);
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    setInterval(cambiarVideo, videoIntervalo);
});
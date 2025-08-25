function iniciarHelp(){

	const btnboton = document.getElementById("boton");
	const contenedor = document.getElementById("contenedor");
	const btnclose = document.getElementById("close");
	btnboton.addEventListener("click", () =>{
	    contenedor.classList.add("show");
	});

	btnclose.addEventListener("click", () =>{
	    contenedor.classList.remove("show");
	});
	
	const btnVer = document.getElementById("botonVer");
	const palabras = document.getElementById("VerPalabras");
	const btnCerrar = document.getElementById("cerrar");
	btnVer.addEventListener("click", () =>{
	    palabras.classList.add("show");
	});

	btnCerrar.addEventListener("click", () =>{
	    palabras.classList.remove("show");
	});

}

window.addEventListener("load", iniciarHelp, false);
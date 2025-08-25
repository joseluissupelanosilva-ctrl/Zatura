
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zatura IA Chatbot</title>
    <link rel="stylesheet" href="css/ZaturaIA.css">
    <link rel="icon" href="imagenes/LogoFinal.png">
    <link rel="stylesheet" href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
</head>

<body>
    <header class="header">
        <div class="container">
            <div class="btn-menu">
                <label for="btn-menu"><img src="imagenes/LogoFinal.png" class="Logo"></label>
            </div>
            <div class="logo"></div>
        </div>
    </header>
    <div class="capa"></div>
    <div class="container-menu">
        <div class="cont-menu">
            <nav>
                <a href="Zatura.html"><i class='bx bx-home-alt-2'></i>Inicio</a>
                <a href="Visualizador.html"><i class='bx bx-home-alt-2'></i>Visualizador 3D</a>
                <a href="Peso.html"><i class='bx bx-home-alt-2'></i>Tu peso es</a>
                <a href="ZaturaIA.html"><i class="fa-solid fa-robot"></i>Zatura IA</a>
                <a href="Integrantes.html"><i class="fa-solid fa-circle-play"></i>creditos</a>
                <a href="Calendario.html"><i class='bx bx-calendar-event'></i> Calendario</a>
                <a href="cuenta.html"><i class='bx bxs-user-account'></i>Cuenta</a>
                <a href="AcercaDe.html"><i class='bx bxs-user-account'></i>Acerca de</a>
            </nav>
        </div>
    </div>
    <div class="celular">
        <div class="pantalla">
            <h1>Zatura IA Chat</h1>
            <div id="chat-messages" class="chat-messages">
                </div>
            <div class="chat-input-container">
                <input type="text" id="user-input" placeholder="Escribe tu mensaje...">
                <button id="send-button">Enviar</button>
            </div>
           
        </div>
    </div>
    <script src="js/zaturaAi.js"></script>
</body>

</html>
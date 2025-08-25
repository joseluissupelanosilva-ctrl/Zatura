document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del juego de Conectar Constelaciones ---
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const resetButton = document.getElementById('resetButton');
    const nextButton = document.getElementById('nextButton');
    const infoPanel = document.getElementById('infoPanel');
    const infoPanelTitle = infoPanel.querySelector('h2');
    const infoPanelText = infoPanel.querySelector('p');
    const closeInfoButton = document.getElementById('closeInfo');
    const instructionsText = document.querySelector('.instructions');

    canvas.width = 700;
    canvas.height = 500;

    let stars = [];
    let connections = [];
    let currentConstellationIndex = 0;
    let clickedStars = [];

    const constellations = [{
        name: "Osa Mayor",
        description: "Una de las constelaciones más conocidas del hemisferio norte, famosa por su 'Carro' o 'Cacerola'. Sus dos estrellas principales, Dubhe y Merak, apuntan a Polaris, la Estrella Polar.",
        stars: [{
            x: 100,
            y: 100,
            name: "Dubhe"
        }, {
            x: 150,
            y: 150,
            name: "Merak"
        }, {
            x: 250,
            y: 170,
            name: "Phecda"
        }, {
            x: 300,
            y: 120,
            name: "Megrez"
        }, {
            x: 400,
            y: 100,
            name: "Alioth"
        }, {
            x: 480,
            y: 150,
            name: "Mizar"
        }, {
            x: 500,
            y: 200,
            name: "Alkaid"
        }],
        connections: [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],
            [3, 4],
            [4, 5],
            [5, 6]
        ]
    }, {
        name: "Orión",
        description: "Una constelación prominente y reconocible globalmente, visible en invierno en el hemisferio norte y verano en el sur. Contiene estrellas brillantes como Betelgeuse y Rigel, y el famoso Cinturón de Orión.",
        stars: [{
            x: 200,
            y: 100,
            name: "Betelgeuse"
        }, {
            x: 500,
            y: 120,
            name: "Bellatrix"
        }, {
            x: 300,
            y: 250,
            name: "Alnitak"
        }, {
            x: 350,
            y: 260,
            name: "Alnilam"
        }, {
            x: 400,
            y: 270,
            name: "Mintaka"
        }, {
            x: 250,
            y: 400,
            name: "Saiph"
        }, {
            x: 550,
            y: 420,
            name: "Rigel"
        }],
        connections: [
            [0, 2],
            [2, 3],
            [3, 4],
            [4, 1],
            [0, 1],
            [2, 5],
            [4, 6]
        ]
    }, {
        name: "Casiopea",
        description: "Fácilmente reconocible por su forma de 'W' o 'M'. Es una constelación circumpolar en el hemisferio norte y un gran punto de referencia para encontrar otras estrellas.",
        stars: [{
            x: 150,
            y: 200,
            name: "Caph"
        }, {
            x: 250,
            y: 100,
            name: "Schedar"
        }, {
            x: 350,
            y: 200,
            name: "Gamma Cas"
        }, {
            x: 450,
            y: 100,
            name: "Ruchbah"
        }, {
            x: 550,
            y: 200,
            name: "Segin"
        }],
        connections: [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 4]
        ]
    }];

    function drawStar(star, size = 5, color = 'white', glow = false) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        if (glow) {
            ctx.shadowBlur = 10;
            ctx.shadowColor = color;
        }
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.font = "12px Arial";
        ctx.fillStyle = "#e0e0e0";
        if (star.name) {
            ctx.fillText(star.name, star.x + 10, star.y - 5);
        }
    }

    function drawLine(startStar, endStar, color = '#00aaff', width = 2, dashed = false) {
        ctx.beginPath();
        ctx.moveTo(startStar.x, startStar.y);
        ctx.lineTo(endStar.x, endStar.y);
        ctx.strokeStyle = color;
        ctx.lineWidth = width;
        if (dashed) {
            ctx.setLineDash([5, 5]);
        } else {
            ctx.setLineDash([]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function renderGame() {
        clearCanvas();

        const targetConstellation = constellations[currentConstellationIndex];

        targetConstellation.connections.forEach(conn => {
            const startStar = stars[conn[0]];
            const endStar = stars[conn[1]];
            drawLine(startStar, endStar, 'rgba(128, 128, 128, 0.3)', 2, true);
        });

        stars.forEach(star => drawStar(star));

        connections.forEach(conn => {
            const startStar = stars[conn[0]];
            const endStar = stars[conn[1]];
            drawLine(startStar, endStar, '#00ff00', 3);
        });

        if (clickedStars.length > 0) {
            const lastClicked = clickedStars[clickedStars.length - 1];
            drawStar(stars[lastClicked], 7, 'yellow', true);
        }

        if (isConstellationComplete()) {
            targetConstellation.connections.forEach(conn => {
                const startStar = stars[conn[0]];
                const endStar = stars[conn[1]];
                drawLine(startStar, endStar, '#00aaff', 4);
            });
        }
    }

    function loadConstellation(index) {
        if (index >= constellations.length) {
            instructionsText.textContent = "¡Has completado todas las constelaciones disponibles! ¡Felicidades!";
            resetButton.style.display = 'none';
            nextButton.style.display = 'none';
            return;
        }
        constellation = constellations[index];
        stars = constellation.stars;
        connections = [];
        clickedStars = [];
        instructionsText.textContent = `¡Intenta conectar la constelación de ${constellation.name}!`;
        renderGame();
    }

    function getStarAtMouse(x, y) {
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            const distance = Math.sqrt(Math.pow(x - star.x, 2) + Math.pow(y - star.y, 2));
            if (distance < 10) {
                return i;
            }
        }
        return -1;
    }

    function addConnection(starIndex1, starIndex2) {
        const newConnection = [Math.min(starIndex1, starIndex2), Math.max(starIndex1, starIndex2)];

        const exists = connections.some(conn =>
            (conn[0] === newConnection[0] && conn[1] === newConnection[1])
        );
        if (!exists) {
            connections.push(newConnection);
        }
    }

    function isConstellationComplete() {
        const targetConnections = constellations[currentConstellationIndex].connections;
        if (connections.length !== targetConnections.length) {
            return false;
        }

        const playerConnectionsSorted = connections.map(c => [...c].sort()).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
        const targetConnectionsSorted = targetConnections.map(c => [...c].sort()).sort((a, b) => a[0] - b[0] || a[1] - b[1]);

        for (let i = 0; i < playerConnectionsSorted.length; i++) {
            if (playerConnectionsSorted[i][0] !== targetConnectionsSorted[i][0] ||
                playerConnectionsSorted[i][1] !== targetConnectionsSorted[i][1]) {
                return false;
            }
        }
        return true;
    }

    function showInfoPanel(title, text) {
        infoPanelTitle.textContent = title;
        infoPanelText.textContent = text;
        infoPanel.classList.remove('hidden');
    }

    function hideInfoPanel() {
        infoPanel.classList.add('hidden');
    }

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.y;

        const clickedStarIndex = getStarAtMouse(mouseX, mouseY);

        if (clickedStarIndex !== -1) {
            if (clickedStars.length === 0) {
                clickedStars.push(clickedStarIndex);
                renderGame();
            } else {
                const prevStarIndex = clickedStars[clickedStars.length - 1];
                if (prevStarIndex !== clickedStarIndex) {
                    addConnection(prevStarIndex, clickedStarIndex);
                    clickedStars = [clickedStarIndex];
                    renderGame();

                    if (isConstellationComplete()) {
                        showInfoPanel(
                            "¡Constelación Completada: " + constellations[currentConstellationIndex].name + "!",
                            constellations[currentConstellationIndex].description
                        );
                    }
                }
            }
        } else {
            clickedStars = [];
            renderGame();
        }
    });

    resetButton.addEventListener('click', () => {
        connections = [];
        clickedStars = [];
        renderGame();
        hideInfoPanel();
    });

    closeInfoButton.addEventListener('click', () => {
        hideInfoPanel();
        currentConstellationIndex++;
        loadConstellation(currentConstellationIndex);
    });

    nextButton.addEventListener('click', () => {
        currentConstellationIndex++;
        loadConstellation(currentConstellationIndex);
        hideInfoPanel();
    });

    loadConstellation(currentConstellationIndex);
});
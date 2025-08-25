document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica del Quiz ---
    const celestialImage = document.getElementById('celestialImage');
    const optionButtons = document.querySelectorAll('.option-button');
    const startButton = document.getElementById('startButton');
    const nextQuestionButton = document.getElementById('nextQuestionButton');
    const feedbackText = document.getElementById('feedbackText');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('totalQuestions');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    const MAX_QUESTIONS = 5;

    const celestialObjects = [
        { name: "La Luna", img: "https://upload.wikimedia.org/wikipedia/commons/e/e1/FullMoon2010.jpg", type: "Planeta/Satélite" },
        { name: "Marte", img: "https://upload.wikimedia.org/wikipedia/commons/0/02/OSIRIS_Mars_true_color.jpg", type: "Planeta" },
        { name: "Júpiter", img: "https://i.natgeofe.com/k/7c7e4173-5ad3-4ef7-8252-354de21430db/jupiter_4x3.jpg", type: "Planeta" },
        { name: "Nebulosa de Orión", img: "http://apod.nasa.gov/apod/image/1801/M31Clouds_DLopez_1500.jpg", type: "Nebulosa" },
        { name: "Galaxia de Andrómeda", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/1200px-Andromeda_Galaxy_%28with_h-alpha%29.jpg", type: "Galaxia" },
        { name: "El Sol", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg/1200px-The_Sun_by_the_Atmospheric_Imaging_Assembly_of_NASA%27s_Solar_Dynamics_Observatory_-_20100819.jpg", type: "Estrella" },
        { name: "Vía Láctea (vista desde la Tierra)", img: "https://img.blogs.es/anexom/wp-content/uploads/2022/05/galaxias-via-lactea-portada.jpg", type: "Galaxia" },
        { name: "Anillos de Saturno", img: "https://cdn.forbes.com.mx/2020/07/Saturno-astronomy.jpg", type: "Planeta/Característica" },
        { name: "Nebulosa del Cangrejo", img: "https://img.europapress.es/fotoweb/fotonoticia_20170704124520_1200.jpg", type: "Remanente de Supernova" },
        { name: "Agujero Negro (simulado)", img: "https://post.geoxnet.com/wp-content/uploads/2020/08/BlackHole-AgujeroNegro_bh-1024x448.jpg", type: "Fenómeno Cósmico" },
    ];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateQuestion() {
        const correctAnswerObject = questions[currentQuestionIndex];
        let possibleAnswers = [correctAnswerObject.name];

        let incorrectAnswers = celestialObjects.filter(obj => obj.name !== correctAnswerObject.name);
        shuffleArray(incorrectAnswers);

        for (let i = 0; possibleAnswers.length < 4 && i < incorrectAnswers.length; i++) {
            possibleAnswers.push(incorrectAnswers[i].name);
        }

        shuffleArray(possibleAnswers);

        return {
            image: correctAnswerObject.img,
            correctAnswer: correctAnswerObject.name,
            options: possibleAnswers
        };
    }

    function showQuestion() {
        if (currentQuestionIndex >= MAX_QUESTIONS) {
            endQuiz();
            return;
        }

        const questionData = generateQuestion();
        celestialImage.src = questionData.image;
        feedbackText.textContent = '';
        feedbackText.classList.remove('correct', 'incorrect');
        feedbackText.style.opacity = 0;

        optionButtons.forEach((button, index) => {
            button.textContent = questionData.options[index];
            button.onclick = () => checkAnswer(button, questionData.correctAnswer);
            button.disabled = false;
            button.classList.remove('correct-answer', 'incorrect-answer');
            button.style.backgroundColor = '';
            button.style.borderColor = '';
        });

        startButton.classList.add('hidden');
        nextQuestionButton.classList.add('hidden');
        updateScoreDisplay();
    }

    function checkAnswer(selectedButton, correctAnswer) {
        optionButtons.forEach(button => button.disabled = true);

        if (selectedButton.textContent === correctAnswer) {
            score++;
            feedbackText.textContent = 'Correcto Jugador';
            feedbackText.classList.add('correct');
        } else {
            feedbackText.textContent = `Incorrecto. Era: ${correctAnswer}`;
            feedbackText.classList.add('incorrect');
            optionButtons.forEach(button => {
                if (button.textContent === correctAnswer) {
                    button.classList.add('correct-answer');
                }
            });
            selectedButton.classList.add('incorrect-answer');
        }
        feedbackText.style.opacity = 1;

        updateScoreDisplay();
        nextQuestionButton.classList.remove('hidden');
    }

    function updateScoreDisplay() {
        scoreSpan.textContent = score;
        totalQuestionsSpan.textContent = MAX_QUESTIONS;
    }

    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        shuffleArray(celestialObjects);
        questions = celestialObjects.slice(0, MAX_QUESTIONS);

        if (questions.length < MAX_QUESTIONS) {
            alert(`No hay suficientes imágenes para ${MAX_QUESTIONS} preguntas. Por favor, añade más imágenes.`);
            return;
        }

        optionButtons.forEach(button => {
            button.classList.remove('hidden');
        });
        feedbackText.textContent = '';
        feedbackText.classList.remove('correct', 'incorrect');
        feedbackText.style.opacity = 0;

        startButton.classList.add('hidden');
        showQuestion();
    }

    function endQuiz() {
        celestialImage.src = '';
        feedbackText.textContent = `¡Quiz terminado! Tu puntuación final es: ${score} de ${MAX_QUESTIONS}.`;
        feedbackText.classList.remove('correct', 'incorrect');
        feedbackText.style.opacity = 1;

        optionButtons.forEach(button => {
            button.classList.add('hidden');
        });
        nextQuestionButton.classList.add('hidden');
        startButton.textContent = "Volver a Jugar";
        startButton.classList.remove('hidden');
    }

    startButton.addEventListener('click', startQuiz);
    nextQuestionButton.addEventListener('click', () => {
        currentQuestionIndex++;
        showQuestion();
    });

    updateScoreDisplay();

   
});
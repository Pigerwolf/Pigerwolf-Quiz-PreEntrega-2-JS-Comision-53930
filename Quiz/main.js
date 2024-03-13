// Variables globales
let userScore = 0;
let totalIncorrectAnswers = 0;
let totalCorrectAnswers = 0;
let currentQuestionIndex = 0;
let user = '';
let penaltyApplied = false; // Variable para controlar si se aplicó la penalización al resetear el quiz
let startTime;
const questionsPerRound = 10; // Número de preguntas por ronda
let gameOver = false; // Variable para controlar si el juego ha terminado

// Array de preguntas
const questions = [
    {
        question: "Cuál es la capital de Francia?",
        options: ["Paris", "Berlin", "Madrid", "Roma"],
        correctAnswerIndex: 0
    },
    {
        question: "Cuál es el planeta más grande del Sistema Solar?",
        options: ["Tierra", "Jupiter", "Saturno", "Marte"],
        correctAnswerIndex: 1
    },
    {
        question: "Por qué la gallina cruzó al otro lado?",
        options: ["Por la comida.", "Para salvarse de un tigre.", "Porque tenía prisa.", "Para llegar a Pepe."],
        correctAnswerIndex: 3
    },
    {
        question: "A qué edad se puede tomar Alcohol en Venezuela?",
        options: ["La edad es un Requisito?", "21", "18", "14"],
        correctAnswerIndex: 0
    },
    {
        question: "Si Pepe tiene 105 Años, cuántos años más vivirá?",
        options: ["Me da tristeza pensarlo.", "Es el Pepe... El pepe es inmortal.", "Está a punto.", "100 más"],
        correctAnswerIndex: 1
    },
    {
        question: "Cuál es el número de esta comisión?",
        options: ["La comisión del Pepe no tiene número. Es la comisión del Pepe.", "59330", "53930", "93053"],
        correctAnswerIndex: 2
    },
    {
        question: "Qué miras?",
        options: ["La PC", "El Monitor", "A ti bebé :$", "Disocié, vuelve a preguntarme.. :D"],
        correctAnswerIndex: 2
    },
    {
        question: "Si me raspo la rodilla, debería colocarme?",
        options: ["whiskey", "Una Bandita", "Café", "Arroz"],
        correctAnswerIndex: 3
    },
    {
        question: "Qué color es el cielo?",
        options: ["Rojo", "Verde", "Azul", "Amarillo"],
        correctAnswerIndex: 2
    },
    {
        question: "Cuál es el animal más grande del mundo?",
        options: ["Elefante", "Ballena Azul", "Girafa", "Tiburón Blanco"],
        correctAnswerIndex: 1
    },
    // Agrega más preguntas aquí...
];

// Función para comenzar el quiz
function startQuiz() {
    user = prompt("Cuál es tu Nombre").toLowerCase();
    if (!user) {
        alert("Por favor introduce un nombre válido.");
        return;
    }
    if (user === "pepe") {
        alert("¡Ganaste automáticamente porque eres un Pepe! ¡Felicitaciones! :D");
        endQuiz();
        return;
    }
    startTime = new Date(); // Guarda el tiempo de inicio del juego
    userScore = 0;
    totalIncorrectAnswers = 0;
    totalCorrectAnswers = 0;
    currentQuestionIndex = 0;
    penaltyApplied = false; // Reinicia la variable de penalización
    gameOver = false; // Reinicia la variable de fin de juego
    updateScore();
    showNextQuestion();
    document.getElementById("start").style.display = "none"; // Oculta el botón de comenzar
    document.getElementById("quiz").style.display = "block"; // Muestra el quiz
}

// Función para mostrar la siguiente pregunta
function showNextQuestion() {
    if (currentQuestionIndex >= questionsPerRound || gameOver) {
        endQuiz();
        return;
    }

    const currentQuestion = questions[currentQuestionIndex];

    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = currentQuestion.question;
    optionsElement.innerHTML = "";

    currentQuestion.options.forEach((option, optionIndex) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", function() {
            checkAnswer(optionIndex, currentQuestion.correctAnswerIndex);
        });
        optionsElement.appendChild(button);
    });

    currentQuestionIndex++;
}

// Función para verificar la respuesta del usuario
function checkAnswer(selectedOptionIndex, correctAnswerIndex) {
    if (selectedOptionIndex === correctAnswerIndex) {
        userScore++;
        totalCorrectAnswers++;
    } else {
        totalIncorrectAnswers++;
        if (!penaltyApplied) {
            userScore -= 1; // Penalización por respuesta incorrecta
            penaltyApplied = true; // Marca que se aplicó la penalización
        }
    }
    updateScore();
    showNextQuestion();
}

// Función para reiniciar el juego
function restartGame() {
    document.getElementById("restart").style.display = "none"; // Oculta el botón de volver a jugar
    startQuiz(); // Comienza un nuevo juego
}

// Función para actualizar los contadores de puntaje y respuestas incorrectas
function updateScore() {
    document.getElementById("userScore").textContent = userScore;
    document.getElementById("incorrect").textContent = `Respuestas incorrectas: ${totalIncorrectAnswers}`;
    document.getElementById("global-results").textContent = `Resultados globales: ${userScore}, Respuestas correctas: ${totalCorrectAnswers}, Respuestas incorrectas: ${totalIncorrectAnswers}`;
}

// Función para terminar el quiz
function endQuiz() {
    const elapsedTime = Math.round((new Date() - startTime) / 1000); // Calcula el tiempo transcurrido
    alert(`Quiz completado.\nPuntuación actual: ${userScore}\nTiempo transcurrido: ${elapsedTime} segundos\nRespuestas correctas: ${totalCorrectAnswers}\nRespuestas incorrectas: ${totalIncorrectAnswers}`);
    document.getElementById("restart").style.display = "block"; // Muestra el botón de volver a jugar
    gameOver = true; // Marca que el juego ha terminado
}

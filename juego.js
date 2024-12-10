const questions = [
  // Preguntas de programación
  { question: "¿Qué significa HTML?", answers: ["HyperText Markup Language", "HyperText Machine Language", "Home Tool Markup Language", "Hyper Type Management Language"], correct: 0 },
  { question: "¿Qué estructura de datos utiliza la recursión principalmente?", answers: ["Cola", "Pila", "Lista", "Árbol"], correct: 1 },
  { question: "¿Qué palabra clave se utiliza para definir una constante en JavaScript?", answers: ["const", "let", "var", "static"], correct: 0 },
  { question: "¿Qué es un framework en programación?", answers: ["Un editor de código", "Un entorno de ejecución", "Una biblioteca de funciones", "Un conjunto de herramientas y librerías"], correct: 3 },
  { question: "¿Qué lenguaje es conocido como el estándar para el desarrollo de aplicaciones web?", answers: ["Python", "JavaScript", "Java", "Ruby"], correct: 1 },

  // Preguntas de redes de telecomunicaciones
  { question: "¿Qué es una dirección IP?", answers: ["Un identificador único para dispositivos en una red", "Un protocolo de seguridad", "Un estándar de encriptación", "Un tipo de red inalámbrica"], correct: 0 },
  { question: "¿Qué significa HTTP?", answers: ["Hypertext Transfer Protocol", "Hyperlink Text Transfer Protocol", "Host Text Transfer Protocol", "Hypertext Transport Protocol"], correct: 0 },
  { question: "¿Qué dispositivo conecta varias redes diferentes?", answers: ["Switch", "Router", "Hub", "Access Point"], correct: 1 },
  { question: "¿Qué es un servidor DNS?", answers: ["Un servidor de nombres de dominio", "Un tipo de cable de red", "Un protocolo de seguridad", "Un software para redes locales"], correct: 0 },
  { question: "¿Cuál de los siguientes es un protocolo de seguridad en redes?", answers: ["FTP", "TCP", "SSL", "UDP"], correct: 2 },

  // Preguntas de cultura general
  { question: "¿Cuál es la capital de Italia?", answers: ["Roma", "París", "Madrid", "Berlín"], correct: 0 },
  { question: "¿Quién pintó la Mona Lisa?", answers: ["Leonardo da Vinci", "Picasso", "Van Gogh", "Miguel Ángel"], correct: 0 },
  { question: "¿Cuál es el río más largo del mundo?", answers: ["Nilo", "Amazonas", "Yangtsé", "Misisipi"], correct: 1 },
  { question: "¿Qué país tiene el mayor número de islas en el mundo?", answers: ["Filipinas", "Suecia", "Canadá", "Japón"], correct: 1 },
  { question: "¿Qué gas es esencial para que podamos respirar?", answers: ["Oxígeno", "Nitrógeno", "Helio", "Dióxido de carbono"], correct: 0 },
  { question: "¿En qué año comenzó la Primera Guerra Mundial?", answers: ["1914", "1918", "1939", "1945"], correct: 0 },
  { question: "¿Qué animal es conocido como el rey de la selva?", answers: ["Tigre", "León", "Elefante", "Águila"], correct: 1 },
  { question: "¿Qué planeta es conocido como el planeta rojo?", answers: ["Júpiter", "Marte", "Venus", "Saturno"], correct: 1 },
  { question: "¿Qué órgano bombea sangre en el cuerpo humano?", answers: ["Cerebro", "Hígado", "Corazón", "Pulmones"], correct: 2 },
  { question: "¿Cuál es el idioma más hablado en el mundo?", answers: ["Inglés", "Chino mandarín", "Español", "Hindú"], correct: 1 },
];

let selectedQuestions = [];
let currentQuestionIndex = 1;
let score = 1;
let timer;
let timeLeft = 20;
let helpUsed = { fiftyFifty: false, callFriend: false, askAudience: false };

const premios = [
  100, 200, 300, 500, 1000, 2000, 4000, 8000, 16000, 32000, 64000, 125000, 250000, 500000, 1000000
];



// Selecciona 15 preguntas aleatorias
function selectRandomQuestions() {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 15);
}

// Muestra una pregunta en pantalla
function showQuestion() {
  if (currentQuestionIndex < selectedQuestions.length) {
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    document.getElementById("question").textContent = currentQuestion.question;

    const answersDiv = document.getElementById("answers");
    answersDiv.innerHTML = ""; // Limpia respuestas anteriores
    currentQuestion.answers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.textContent = answer;
      button.classList.add("btn", "btn-outline-primary");
      button.onclick = () => checkAnswer(index);
      answersDiv.appendChild(button);
    });

    document.getElementById("score").textContent = `Nivel: ${score} / 15`;
    resetTimer();
  } else {
    // Cuando se han respondido todas las preguntas, se muestra el mensaje de victoria
    if (score === 15) {
      endGame("¡Felicitaciones! Ganaste el juego con 15/15.");
    } else {
      endGame(`Juego terminado. Respuestas correctas: ${score} / 15.`);
    }
  }
}
// Verifica si la respuesta es correcta
function checkAnswer(index) {
  clearInterval(timer);
  if (index === selectedQuestions[currentQuestionIndex].correct) {
    score++; // Incrementa el puntaje por respuesta correcta
    currentQuestionIndex++;
    showQuestion();
  } else {
    endGame("Que triste. ¡Intenta de nuevo!");
  }
}

// Termina el juego
function endGame(message) {
  let premio = premios[score - 1] || 0; // Obtiene el premio según el nivel alcanzado
  document.getElementById("game").innerHTML = `
    <h2>${message}</h2>
    <p>Respuestas correctas: ${score} / 15</p>
    <p>¡Felicidades! Ganaste: $${premio.toLocaleString()}</p>
  `;
  document.getElementById("restart").style.display = "block";
}


// Reinicia el juego
document.getElementById("restart").addEventListener("click", () => {
  location.reload(); // Recarga la página y reinicia el juego
});

// Resetea el temporizador
function resetTimer() {
  timeLeft = 20;
  document.getElementById("timer").textContent = `Tiempo: ${timeLeft}`;
  clearInterval(timer);
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").textContent = `Tiempo: ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      endGame("Se acabó el tiempo. ¡Intenta de nuevo!");
    }
  }, 1000);
}

// Inicializa ayudas
function resetHelp() {
  helpUsed = { fiftyFifty: false, callFriend: false, askAudience: false };
  document.getElementById("fiftyFifty").disabled = false;
  document.getElementById("callFriend").disabled = false;
  document.getElementById("askAudience").disabled = false;
}

document.getElementById("fiftyFifty").addEventListener("click", () => {
  if (!helpUsed.fiftyFifty) {
    helpUsed.fiftyFifty = true;
    document.getElementById("fiftyFifty").disabled = true;
    const currentQuestion = selectedQuestions[currentQuestionIndex];
    const correctIndex = currentQuestion.correct;
    const wrongIndexes = currentQuestion.answers
      .map((_, index) => index)
      .filter(index => index !== correctIndex);
    const removedIndexes = wrongIndexes.slice(0, 2); // Elimina 2 incorrectas
    const buttons = document.getElementById("answers").children;
    for (let i = 0; i < buttons.length; i++) {
      if (removedIndexes.includes(i)) {
        buttons[i].disabled = true;
      }
    }
  }
});

document.getElementById("callFriend").addEventListener("click", () => {
  if (!helpUsed.callFriend) {
    helpUsed.callFriend = true;
    document.getElementById("callFriend").disabled = true;
    alert("Tu amigo sugiere que la respuesta correcta es: " + selectedQuestions[currentQuestionIndex].answers[selectedQuestions[currentQuestionIndex].correct]);
  }
});

document.getElementById("askAudience").addEventListener("click", () => {
  if (!helpUsed.askAudience) {
    helpUsed.askAudience = true;
    document.getElementById("askAudience").disabled = true;
    const votes = selectedQuestions[currentQuestionIndex].answers.map((_, index) => Math.floor(Math.random() * 100));
    votes[selectedQuestions[currentQuestionIndex].correct] += 50; // Incrementa votos para la correcta
    alert("El público votó:\n" + selectedQuestions[currentQuestionIndex].answers.map((answer, i) => `${answer}: ${votes[i]}%`).join("\n"));
  }
});


// Inicia el juego
selectedQuestions = selectRandomQuestions();
showQuestion();

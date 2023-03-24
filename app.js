const questions = [
	{
		question: "¿Cuál es el animal más rápido del mundo?",
		answers: [
			{ text: "Guepardo", correct: true },
			{ text: "Leopardo", correct: false },
			{ text: "Tigre", correct: false },
			{ text: "Jaguar", correct: false },
		]
	},
	{
		question: "¿Cuál es el metal más caro del mundo?",
		answers: [
			{ text: "Oro", correct: false },
			{ text: "Platino", correct: true },
			{ text: "Paladio", correct: false },
			{ text: "Rodio", correct: false },
		]
	},
	{
		question: "¿En qué país se encuentra la Torre Eiffel?",
		answers: [
			{ text: "Italia", correct: false },
			{ text: "España", correct: false },
			{ text: "Francia", correct: true },
			{ text: "Portugal", correct: false },
		]
	},
	{
		question: "¿Cuál es el planeta más grande del Sistema Solar?",
		answers: [
			{ text: "Júpiter", correct: true },
			{ text: "Saturno", correct: false },
			{ text: "Urano", correct: false },
			{ text: "Neptuno", correct: false },
		]
	},
	{
		question: "¿Cuál es el río más largo del mundo?",
		answers: [
			{ text: "Nilo", correct: true },
			{ text: "Amazonas", correct: false },
			{ text: "Yangtze", correct: false },
			{ text: "Misisipi", correct: false },
		]
	},
	{
		question: "¿En qué año comenzó la Segunda Guerra Mundial?",
		answers: [
			{ text: "1914", correct: false },
			{ text: "1939", correct: true },
			{ text: "1945", correct: false },
			{ text: "1960", correct: false },
		]
	},
	{
		question: "¿Cuál es el país más poblado del mundo?",
		answers: [
			{ text: "India", correct: false },
			{ text: "Estados Unidos", correct: false },
			{ text: "China", correct: true },
			{ text: "Brasil", correct: false },
		]
	},
	{
		question: "¿En qué año se inauguró el Canal de Panamá?",
		answers: [
			{ text: "1904", correct: false },
			{ text: "1914", correct: true },
			{ text: "1924", correct: false },
			{ text: "1934", correct: false },
		]
	},

{
    question: "¿Cuál es el océano más profundo del mundo?",
    answers: [
        { text: "Océano Atlántico", correct: false },
        { text: "Océano Índico", correct: false },
        { text: "Océano Pacífico", correct: false },
        { text: "Océano Ártico", correct: false },
        { text: "Océano Antártico", correct: true }
    ]
},
{
    question: "¿Cuál es el autor de la novela 'Don Quijote de la Mancha'?",
    answers: [
        { text: "Miguel de Cervantes", correct: true },
        { text: "Federico García Lorca", correct: false },
        { text: "Pablo Neruda", correct: false },
        { text: "Gabriel García Márquez", correct: false },
    ]
},
{
    question: "¿Cuál es la capital de Australia?",
    answers: [
        { text: "Melbourne", correct: false },
        { text: "Canberra", correct: true },
        { text: "Sidney", correct: false },
        { text: "Brisbane", correct: false },
    ]
}
];

const gameContainer = document.getElementById('game');
const questionContainer = document.getElementById('question');
const answerContainer = document.getElementById('answers');
const nextButton = document.getElementById('next-btn');

let currentQuestion = 0;
let score = 0;

function startGame() {
	currentQuestion = 0;
	score = 0;
	nextButton.innerText = 'Siguiente';
	showQuestion();
}

function showQuestion() {
	resetAnswers();
	questionContainer.innerText = questions[currentQuestion].question;
	questions[currentQuestion].answers.forEach(answer => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('answer');
		if (answer.correct) {
			button.dataset.correct = true;
		}
		button.addEventListener('click', selectAnswer);
		answerContainer.appendChild(button);
	});
}

function resetAnswers() {
	nextButton.classList.add('hide');
	while (answerContainer.firstChild) {
		answerContainer.removeChild(answerContainer.firstChild);
	}
}

function selectAnswer(event) {
	const selectedButton = event.target;
	const correct = selectedButton.dataset.correct;
	if (correct) {
		selectedButton.classList.add('correct');
		score++;
	} else {
		selectedButton.classList.add('incorrect');
	}
	Array.from(answerContainer.children).forEach(button => {
		if (button.dataset.correct) {
			button.classList.add('correct');
		}
	});
	nextButton.classList.remove('hide');
	if (currentQuestion === questions.length - 1) {
		nextButton.innerText = 'Ver resultados';
	}
}

function showResults() {
    
    gameContainer.innerHTML = `
    <h1>Resultados</h1>
    <p>Tu puntuación es ${score} de ${questions.length} preguntas.</p>
    <button onclick="location.reload()">Jugar de nuevo</button>
	`;
    showScore();
}


function showScore() {
    const percentage = Math.round(score / questions.length * 100);
    const scoreContainer = document.getElementById('score');
    scoreContainer.innerText = `Tu puntuación es ${percentage}% (${score} de ${questions.length} preguntas)`;
    scoreContainer.classList.remove('hide');
}

startGame();
nextButton.addEventListener('click', () => {
	currentQuestion++;
	if (currentQuestion < questions.length) {
		showQuestion();
	} else {
		showResults();
	}
});


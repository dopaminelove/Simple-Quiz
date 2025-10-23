const questions = [
    {
        question:  "Qual a comida favorita do bigode?",
        respostas: [
             {text: "Lasanha", correct: false},
             {text: "Feijoada", correct: false},
             {text: "Strogonoff", correct: true},
             {text: "Feijão", correct: false},
        ]
    },
    {
        question:  "Qual a moto favorita do bigode?",
        respostas: [
             {text: "Start 160", correct: true},
             {text: "Fazer 250", correct: false},
             {text: "Bajaj 400", correct: false},
             {text: "Pop 110", correct: false},
        ]
    }, 
        {
        question:  "Qual o sonho do bigode?",
        respostas: [
             {text: "Virar Desenvolvedor Web", correct: true},
             {text: "Virar Apostador", correct: false},
             {text: "Virar Trader", correct: false},
             {text: "Virar Motoboy", correct: false},
        ]
    }, 
        {
        question:  "Qual o carro do sonho do bigode?",
        respostas: [
             {text: "Corsa", correct: false},
             {text: "Civic", correct: false},
             {text: "Golf GTI", correct: true},
             {text: "Nivus", correct: false},
        ]
    }, 
           {
        question:  "Qual o refri favorito do bigode?",
        respostas: [
             {text: "Fanta", correct: false},
             {text: "Coca-Cola", correct: true},
             {text: "Tiss", correct: false},
             {text: "Guarana Jesus", correct: false},
        ]
    }, 
           {
        question:  "Qual o  hobby que o bigode mais gosta?",
        respostas: [
             {text: "Jogar", correct: false},
             {text: "Andar de skate", correct: false},
             {text: "Andar de bike", correct: false},
             {text: "Programar", correct: true},
        ]
    }, 
           {
        question:  "Qual é atualmente a marca favorita do bigode?",
        respostas: [
             {text: "Nike", correct: true},
             {text: "Adidas", correct: false},
             {text: "QuikSilver", correct: false},
             {text: "Cyclone", correct: false},
        ]
    }, 
           {
        question:  "Qual o carro do sonho do bigode?",
        respostas: [
             {text: "Corsa", correct: false},
             {text: "Civic", correct: false},
             {text: "Golf GTI", correct: true},
             {text: "Nivus", correct: false},
        ]
    }, 
];

const perguntasElemento = document.getElementById("question")
const respostasButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")
const iconCorrect = document.getElementById("correct")
const iconIncorrect = document.getElementById("incorrect")
const correctAudio = document.getElementById("correctAudio")
const incorrectAudio = document.getElementById("incorrectAudio")

let perguntasIndex = 0;
let score = 0;

function startQuiz(){
    perguntasIndex = 0  
    score = 0
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState()
    let currentPerguntas = questions[perguntasIndex]
    let questionNo = perguntasIndex + 1;
    perguntasElemento.innerHTML = questionNo + ". " + currentPerguntas.question; 

    currentPerguntas.respostas.forEach(respostas => {
        const button = document.createElement("button");
        button.innerHTML = respostas.text
        button.classList.add("btn");
        respostasButtons.appendChild(button)
        if(respostas.correct){
            button.dataset.correct = respostas.correct
        }

        button.addEventListener("click", selecionaPergunta);
    })
}

function selecionaPergunta(e){
    const selecionaBtn = e.target
    const isCorrect = selecionaBtn.dataset.correct === "true"
    if(isCorrect) {
        score++
        selecionaBtn.classList.add("correct")
        nextButton.style.display = "flex"
          correctAudio.volume = 0.5
        correctAudio.play()
      
    }else {
        nextButton.style.display = "flex"
        selecionaBtn.classList.add("incorreto")
        incorrectAudio.volume = 0.5
        incorrectAudio.play()
        
        
    }
    Array.from(respostasButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct")
        }
        button.disabled = true
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(respostasButtons.firstChild){
        respostasButtons.removeChild(respostasButtons.firstChild)
    }
}

function handleNextButton(){
    perguntasIndex++
    if(perguntasIndex < questions.length){
        showQuestion()
    }else {
        showScore()
    }
}

nextButton.addEventListener("click", () => {
    if(perguntasIndex < questions.length){
        handleNextButton()
    }else {
        startQuiz()
    }
})



function showScore (){
    resetState()
    perguntasElemento.innerHTML = `Você acertou ${score} de ${questions.length}!`
    nextButton.innerHTML = "Restart"
    nextButton.style.display = "block"
}



startQuiz()

import questions from './questions.js';
document.addEventListener('DOMContentLoaded', () => {
  const questionElement = document.querySelector('.question');
  const answersElement = document.querySelector('.answers');
  const questionCountElement = document.querySelector('.spnQtd');
  const finishMessageElement = document.querySelector('.finish span');
  const contentElement = document.querySelector('.content');
  const finishContentElement = document.querySelector('.finish');
  const restartButton = document.querySelector('#restartBtn');
  const playButton = document.querySelector('#playBtn'); // Seleciona o botão de jogar

  let currentIndex =   0;
  let questionsCorrect =   0;

  // Função para iniciar o jogo ou reiniciá-lo
  const startOrRestartGame = () => {
    contentElement.style.display = "flex";
    finishContentElement.style.display = "none";
    playButton.style.display = "none"; // Esconde o botão de jogar quando o jogo começa

    currentIndex =   0;
    questionsCorrect =   0;
    loadQuestion();
  };

  // Função para reiniciar o jogo quando o jogador perde
  const restartGame = () => {
    contentElement.style.display = "flex";
    finishContentElement.style.display = "none";
    playButton.style.display = "none"; // Esconde o botão de jogar quando o jogo é reiniciado

    currentIndex =   0;
    questionsCorrect =   0;
    loadQuestion();
  };

  restartButton.addEventListener('click', restartGame);
  playButton.addEventListener('click', startOrRestartGame); // Adiciona um listener para o botão de jogar

  const nextQuestionHandler = (e) => {
    if (e.target.getAttribute("data-correct") === "true") {
      questionsCorrect++;
    }

    if (currentIndex < questions.length -   1) {
      currentIndex++;
      loadQuestion();
    } else {
      finishGame();
    }
  };

  const finishGame = () => {
    finishMessageElement.innerHTML = `Você acertou ${questionsCorrect} de ${questions.length}.`;
    contentElement.style.display = "none";
    finishContentElement.style.display = "flex";
    playButton.style.display = "block"; // Mostra o botão de jogar quando o jogo termina
  };

  const loadQuestion = () => {
    questionCountElement.innerHTML = `${currentIndex +   1}/${questions.length}`;
    const item = questions[currentIndex];
    answersElement.innerHTML = "";
    questionElement.innerHTML = item.question;

    item.answers.forEach((answer) => {
      const answerDiv = document.createElement("div");

      answerDiv.innerHTML = `
      <button class="answer" data-correct="${answer.correct}">
        ${answer.option}
      </button>
      `;

      answersElement.appendChild(answerDiv);
    });

    document.querySelectorAll(".answer").forEach((answerItem) => {
      answerItem.addEventListener("click", nextQuestionHandler);
    });
    
  };
  
  // Inicializa o jogo
  startOrRestartGame();
  
});

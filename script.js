// Get necessary quiz elements
const containerStart = document.querySelector('.container-start');
const containerEnd = document.querySelector('.container-end');
const containerQuiz = document.querySelector('.container-quiz');
const optionList = document.querySelector('.option-list');
const checkBtn = document.querySelector('.check-btn');
const startBtn = document.querySelector('.start-btn');
const nextBtn = document.querySelector('.next-btn');
const restartQuiz = document.querySelector('.restart-quiz');

let option;
let optionPrefix;

let questionCount = 0;
let userScore = 0;

restartQuiz.onclick = () => {
  window.location.reload();
};

// Starting quiz container
window.addEventListener('load', () => {
  containerStart.classList.remove('hidden');
});

startBtn.onclick = () => {
  containerQuiz.classList.remove('hidden');
  containerStart.classList.add('hidden');
  displayQuestionCount(questionCount);
  displayQuestion(questionCount);
  updateProgressBar(questionCount);
};

nextBtn.onclick = () => {
  questionCount++;
  displayQuestionCount(questionCount);
  displayQuestion(questionCount);
  resetQuestion();
  updateProgressBar(questionCount);
};

const resetQuestion = () => {
  nextBtn.style.display = 'none';
  checkBtn.style.display = 'block';
  optionList.classList.remove('disabled');
};

// Dynamically display the question number throughout the quiz
const displayQuestionCount = index => {
  const bottomQuestionNumber = document.querySelector('.question-number');
  let totalQuesCount =
    '<span>' +
    questions[index].number +
    ' <span>of</span> ' +
    questions.length +
    '</span>';
  bottomQuestionNumber.innerHTML = totalQuesCount;
};

// Update Progress Bar
const updateProgressBar = index => {
  let myBar = document.getElementById('myBar');
  let width = 0;
  if (width >= 100) {
    clearInterval();
  } else {
    width = ((index + 1) / questions.length) * 100;
    myBar.style.width = width + '%';
  }
};

// Get question and option data from array at questions.js
const displayQuestion = index => {
  const questionText = document.querySelector('.question-text');
  let currentQuestion = '<p>' + questions[index].question + '</p>';

  questionText.innerHTML = currentQuestion;

  let availableOptions =
    '<div class="option">' +
    '<div class="option-prefix"></div>' +
    '<p class="option-text">' +
    questions[index].options[0] +
    '</p>' +
    '</div>' +
    '<div class="option">' +
    '<div class="option-prefix"></div>' +
    '<p class="option-text">' +
    questions[index].options[1] +
    '</p>' +
    '</div>' +
    '<div class="option">' +
    '<div class="option-prefix"></div>' +
    '<p class="option-text">' +
    questions[index].options[2] +
    '</p>' +
    '</div>';

  optionList.innerHTML = availableOptions;

  option = document.querySelectorAll('.option');
  optionPrefix = document.querySelectorAll('.option-prefix');
  for (let i = 0; i < option.length; i++) {
    option[i].addEventListener('click', function () {
      evaluateAnswer(this, optionPrefix[i]);
    });
  }
};

const evaluateAnswer = (answer, answerPrefix) => {
  // Let user change option
  for (let i = 0; i < option.length; i++) {
    option[i].classList.remove('selected-option');
    optionPrefix[i].classList.remove('selected-prefix');
  }

  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  answer.classList.add('selected-option');
  answerPrefix.classList.add('selected-prefix');

  let iconCheck = '<div class="icon-check"><i class="fas fa-check"></i></div>';
  let iconX = '<div class="icon-x"><i class="fas fa-times"></i></div>';

  const showNextButton = () => {
    optionList.classList.add('disabled');
    nextBtn.style.display = 'block';
    checkBtn.style.display = 'none';
  };

  const showFinishButton = () => {
    const finishBtn = document.querySelector('.finish-btn');
    if (questionCount < questions.length - 1) {
      finishBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'none';
      checkBtn.style.display = 'none';
      finishBtn.style.display = 'block';
      finishBtn.onclick = () => {
        showResultsBox();
        finishBtn.style.display = 'none';
      };
    }
  };

  checkBtn.onclick = () => {
    // Answer evaluation
    if (userAnswer === undefined) {
      alert('You need to select an answer');
    } else if (userAnswer === correctAnswer) {
      // When user checks answer all other options are disabled
      showNextButton();
      userScore += 1;
      answer.classList.add('correct');
      answerPrefix.classList.add('correct-prefix');
      answer.insertAdjacentHTML('afterbegin', iconCheck);
      userAnswer = undefined;
    } else {
      // When user checks answer all other options are disabled
      showNextButton();
      answer.classList.add('wrong');
      answerPrefix.classList.add('wrong-prefix');
      answer.insertAdjacentHTML('afterbegin', iconX);
      userAnswer = undefined;

      // If user selects wrong answer, the correct answer also appears
      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent === correctAnswer) {
          optionPrefix[i].classList.add('correct-prefix');
          optionList.children[i].setAttribute('class', 'option correct');
          optionList.children[i].insertAdjacentHTML('afterbegin', iconCheck);
        }
      }
    }
    showFinishButton();
  };
};

const showResultsBox = () => {
  const results = document.querySelector('.results');
  if (userScore > 3) {
    let resultsText =
      '<p>Congrats! You scored ' +
      userScore +
      ' <span>of</span> ' +
      questions.length +
      ' correct! Great job!</p>';
    results.innerHTML = resultsText;
  } else {
    let resultsText =
      '<p>Good effort! You scored ' +
      userScore +
      ' <span>of</span> ' +
      questions.length +
      ' correct. Try again to increase your score!</p>';
    results.innerHTML = resultsText;
  }

  containerQuiz.classList.add('hidden');
  containerEnd.classList.remove('hidden');
};

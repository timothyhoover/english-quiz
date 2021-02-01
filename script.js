/* Starting Comments and Setup 

Functionality Layout

- Start container shows up first and user can click button to start quiz.
- The number of questions should dynamically change.
- User has to click option then click the check button to check answer
- When user selects answer, the option container highlights red for false or green for correct
    * The x and check icons need to be in white and only pop when user selects the check button
    * The user should not be able to click on any other answer
    * The background color for the prefix circle needs to first be filled with #a9a9a9 to confirm the answer has been selected.
    * The background color and border for the wrong answer should be #b80000.
    * The background color and border for the correct answer should be #62dbc8.
- After user has clicked on the check button the next question button should appear.
- When there are no more questions left, the end container should appear with the user's results


*/

// Get necessary quiz elements
const containerStart = document.querySelector('.container-start');
const startBtn = document.querySelector('.start-btn');
const nextBtn = document.querySelector('.next-btn');
const optionList = document.querySelector('.option-list');
const optionText = document.querySelector('.option-text');
const containerQuiz = document.querySelector('.container-quiz');
const checkBtn = document.querySelector('.check-btn');
let option;
let optionPrefix;

let questionCount = 0;
let userScore = 0;

// Starting quiz container
window.addEventListener('load', () => {
  containerStart.classList.remove('hidden');
});

// Start Quiz
startBtn.onclick = () => {
  containerQuiz.classList.remove('hidden');
  containerStart.classList.add('hidden');
  displayQuestionCount(questionCount);
  displayQuestion(questionCount);
};

// Next Button
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++;
    displayQuestionCount(questionCount);
  }
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
      optionSelected(this, optionPrefix[i]);
      console.log('Counting the selection');
    });
  }
};

// When user selects an option the colors of option and option prefix change
const optionSelected = (answer, answerPrefix) => {
  // User can select different options
  for (let i = 0; i < option.length; i++) {
    option[i].classList.remove('selected-option');
    optionPrefix[i].classList.remove('selected-prefix');
  }

  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;
  // let allOptionPrefix = option.children.length;

  answer.classList.add('selected-option');
  answerPrefix.classList.add('selected-prefix');

  let iconCheck = '<div class="icon-check"><i class="fas fa-check"></i></div>';
  let iconX = '<div class="icon-x"><i class="fas fa-times"></i></div>';

  const checkBtn = document.querySelector('.check-btn');
  checkBtn.addEventListener('click', function () {
    optionList.classList.add('disabled');
    ``;
    nextBtn.style.display = 'block';
    checkBtn.style.display = 'none';

    if (userAnswer === correctAnswer) {
      userScore++;
      answer.classList.add('correct');
      answerPrefix.classList.add('correct-prefix');
      answer.insertAdjacentHTML('afterbegin', iconCheck);
      console.log(userScore);
      console.log('Correct Answer!');
    } else {
      answer.classList.add('wrong');
      answerPrefix.classList.add('wrong-prefix');
      answer.insertAdjacentHTML('afterbegin', iconX);
      console.log('Wrong Answer!');

      // If user selects wrong answer, the correct answer also appears
      for (let i = 0; i < allOptions; i++) {
        if (optionList.children[i].textContent === correctAnswer) {
          optionPrefix[i].classList.add('correct-prefix');
          optionList.children[i].setAttribute('class', 'option correct');
          optionList.children[i].insertAdjacentHTML('afterbegin', iconCheck);
        }
      }
    }
  });
};

const finishQuiz = () => {};

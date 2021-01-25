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
const option = document.querySelectorAll('.option');
const optionList = document.querySelector('.option-list');
const optionText = document.querySelector('.option-text');
const containerQuiz = document.querySelector('.container-quiz');
const checkBtn = document.querySelector('.check-btn');
let iconCheck = '<div class="icon-check"><i class="fas fa-check"></i></div>';
let iconX = '<div class="icon-x"><i class="fas fa-times"></i></div>';

let questionCount = 0;
let userScore = 0;

// Start Quiz
startBtn.onclick = () => {
  containerQuiz.style.display = 'block';
  containerStart.style.display = 'none';
  displayQuestionCount(questionCount);
  displayQuestion(questionCount);
  displayOptions(questionCount);
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

// Get question data from array - questions.js
const displayQuestion = index => {
  const questionText = document.querySelector('.question-text');
  let questionArray = '<p>' + questions[index].question + '</p>';
  questionText.innerHTML = questionArray;
};

// Get option data from array - questions.js
const displayOptions = index => {
  let optionArray =
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

  optionList.innerHTML = optionArray;
  const option = document.querySelectorAll('.option');
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute('onclick', 'evaluateAnswer(this)');
  }
};

// Check Button Evaluation
checkBtn.onclick = () => {
  evaluateAnswer(questionCount);
};

// Get answer data from array - questions.js
function evaluateAnswer(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = questions[questionCount].options;

  if (userAnswer == correctAnswer) {
    userScore++;
    console.log(userScore);
    answer.classList.add('correct');
    console.log('Answer is correct');
  }
}

const finishQuiz = () => {};

const prefixChange = () => {
  const optionPrefix = document.querySelector('.option-prefix');
  let userSelection = optionList.addEventListener('click');
  if (userSelection) {
    optionPrefix.style.backgroundColor = '#a9a9a9';
  }
};

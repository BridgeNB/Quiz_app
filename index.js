'use strict';
let nthQuestion = 0;
let score = 0;

function generateCurrentQuestionHtml() {
  return `
  <div class="question-${nthQuestion}">
    <form id="questionForm">
      <fieldset>
        <legend>${data[nthQuestion].question}</legend>
        <label class="choices">
          <input type="radio" value="${data[nthQuestion].choices[0]}" name="answer" required>
          <span>${data[nthQuestion].choices[0]}</span>
        </label>
        <label class="choices">
          <input type="radio" value="${data[nthQuestion].choices[1]}" name="answer" required>
          <span>${data[nthQuestion].choices[1]}</span>
        </label>
        <label class="choices">
          <input type="radio" value="${data[nthQuestion].choices[2]}" name="answer" required>
          <span>${data[nthQuestion].choices[2]}</span>
        </label>
        <label class="choices">
          <input type="radio" value="${data[nthQuestion].choices[3]}" name="answer" required>
          <span>${data[nthQuestion].choices[3]}</span>
        </label>
        <button type="submit" class="submitAnswer">Submit</button>
      </fieldset>
    </form>
  </div>
  `;
}

function renderCurrentQuestion() {
  $('.question_form').html(generateCurrentQuestionHtml());
}

function generateEndPage() {
  return `
  <div class="end_page">
    <h2>This is the end of the Javascript quiz!</h1><br>
    <h3>You final score is <span class="score">${score}</span> out of 10!</h3>
    <button type="button" class="restart_button">Play again</button>
  </div>
  `;
}

function renderEndPage() {
  $('.question_form').html(generateEndPage());
}

function upgradeScore() {
  score++;
  $('.score').text(score);
}

function upgradeQuestionNumber() {
  nthQuestion++;
  $('.question_number').text(nthQuestion);
}

function nextIfCorrectAnswer() {
  let answer = `${data[nthQuestion].answer}`;
  let realNthQuestion = 1 + parseInt(`${nthQuestion}`);
  $('.question_form').html(`<div class="correct_answer question_result">
      <h3>Cheers!!! You got No. ${realNthQuestion} question right!</h3>
      <h4>Correct Answer indeed is</h4><br>
      <p>${data[nthQuestion].answer}</p>
      <button type=button class="next_button">Next</button>
    </div>`);
  upgradeScore();
}

function nextIfWrongAnswer() {
  let answer = `${data[nthQuestion].answer}`;
  let realNthQuestion = 1 + parseInt(`${nthQuestion}`);
  $('.question_form').html(`<div class="wrong_answer question_result">
      <h3>Sorry, you got No. ${realNthQuestion} question wrong!</h3>
      <h4>Correct Answer should be</h4><br>
      <p>${data[nthQuestion].answer}</p>
      <button type=button class="next_button">Next</button>
    </div>`);
}

function startQuiz(event) {
  renderCurrentQuestion();
  $('.welcome_page').css("display", "none");
  $('.question_form').css("display", "block");
}

function submitQuestion(event) {
  event.preventDefault();
  let choice = $('input:checked').val();
  let answer = `${data[nthQuestion].answer}`;
  if (choice === answer) {
    nextIfCorrectAnswer();
  } else {
    nextIfWrongAnswer();
  }
  upgradeQuestionNumber();
}

function showNextQuestion(event) {
  if (nthQuestion < 3) {
    renderCurrentQuestion();
    submitAnswer();
  } else {
    renderEndPage();
  }
}

function restartQuiz(event) {
  score = -1;
  nthQuestion = -1;
  $('.welcome_page').css("display", "block");
  $('.question_form').css("display", "none");
  upgradeQuestionNumber();
  upgradeScore();
  renderCurrentQuestion();
  // location.reload();
}

function main() {
  $('.welcome_page').on('click', '.start_button', startQuiz);
  $('.question_form').on('submit', '#questionForm', submitQuestion);
  $('.question_form').on('click', '.next_button', showNextQuestion);
  $('.question_form').on('click', '.end_page .restart_button', restartQuiz);
}

$(main);

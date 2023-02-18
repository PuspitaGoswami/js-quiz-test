var questionNo = 0;
var high_score_list = JSON.parse(localStorage.getItem('list_item')) || [];
console.log('initial', high_score_list);
var timerInterval;
// Selects element by class
var timeEl = document.getElementById("time");
// Selects element by id
var startBtn = document.getElementById("start");
startBtn && startBtn.addEventListener("click", function () {
  setTime();
  let div = document.getElementById("start-screen");
  let div2 = document.getElementById("questions");
  if (div.className === "start" && div2.className === "hide") {
    div.className = "hide";
    div2.className = "start";
  } else {
    div.className = "start";
    div2.className = "hide";
  }
  questionCall();
});

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  timerInterval = setInterval(function () {
    secondsLeft--;
    timeEl.textContent = secondsLeft;

    if (secondsLeft <= 0) {
      // Stops execution of action at set interval
      let div = document.getElementById("end-screen");
      let div2 = document.getElementById("questions");
      div.className = "start";
      div2.className = "hide";
      clearInterval(timerInterval);
    }
  }, 1000);
}

function show_result (res){
  console.log(res);
  let div3 = document.getElementById("feedback");
     div3.innerHTML = '';
      div3.classList.remove('hide');
      div3.textContent = res;
      setTimeout(hide_feedback, 2000);

}

function hide_feedback(){
  let div3 = document.getElementById("feedback");
  div3.classList.add('hide');
  div3.innerHTML = '';
}

var ans;
function check_ans(event) {


  if (questionNo >= questions.length - 1) {
    let div = document.getElementById("end-screen");
    let div2 = document.getElementById("questions");
    div.className = "start";
    div2.className = "hide";
    document.getElementById("final-score").textContent = secondsLeft;
    clearTimeout(timerInterval);
    submit.addEventListener("click", function () {
      var userName = document.querySelector("#initials").value;
    });
  } else {
    if (event.target.innerText === questions[questionNo].correctAnswer) {
      questionNo++;
      ans='correct';
      questionCall();
      show_result(ans);
   

    } else {
      ans='wrong';
      show_result(ans);
      console.log(ans);
      secondsLeft = secondsLeft - 5;
      questionNo++;
      questionCall();
    }
   
  }
 
}

function questionCall() {
  var question_title = document.getElementById("question-title");
  question_title.textContent = questions[questionNo].question;
  document.getElementById("choices").textContent = "";
  
  for (var i = 0; i < 4; i++) {
    var options = document.createElement("button");
    options && options.addEventListener("click", check_ans);
    options.textContent = questions[questionNo].options[i];
    document.getElementById("choices").append(options);
  }
}

const submitButton = document.getElementById('submit');

submitButton && submitButton.addEventListener('click', function(event) {
  
  const inputVal = document.getElementById('initials').value + ' - ' + secondsLeft;
  if(inputVal != null){
    high_score_list.push(inputVal);
    localStorage.setItem('list_item', JSON.stringify(high_score_list));
  }
  const nextPageUrl = 'highscores.html' + '?inputVal=' + encodeURIComponent(inputVal);
  window.location.href = nextPageUrl;
});

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const inputVal = urlParams.get('inputVal');

  



var list_item = document.getElementById('highscores');


for(var i=0;i<high_score_list.length;i++){
  console.log(high_score_list[i])

  const name_score = document.createElement("li");
  name_score.classList.add("list-group-item");
  name_score.dataset.name = inputVal;
  name_score.textContent = high_score_list[i];
  list_item.append(name_score);
}

const clearHistory = document.getElementById('clear');
clearHistory && clearHistory.addEventListener('click', function(event) {
  list_item.innerHTML = '';
  localStorage.removeItem('list_item');
  
});


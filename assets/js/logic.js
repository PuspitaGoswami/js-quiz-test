// Selects element by class
var timeEl = document.getElementById("time");

// Selects element by id
var startBtn = document.getElementById("start");

startBtn.addEventListener("click", function(){
  setTime();
});

var secondsLeft = 60;

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
      }
  
    }, 1000);
  }
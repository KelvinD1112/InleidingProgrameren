console.log("hello world");
// declaring variables and constants
// main healthbars:
const health = document.getElementById("health");
const hunger = document.getElementById("hunger");
const thirst = document.getElementById("thirst");
const energy = document.getElementById("energy");
const moisture = document.getElementById("moisture");
const oxygen = document.getElementById("oxygen");
//overtime healthbars:
const overtime_moisture = document.getElementById("overtime_moisture");
const overtime_oxygen = document.getElementById("overtime_oxygen");
//mascot animations:
const eyeState = document.getElementById("mascotEye");
const mouthState = document.getElementById("mascotMouth");
const bodyState = document.getElementById("mascotBody");
const headState = document.getElementById("mascotHead");
// misc:
let igniteState = false;
let gameStarted = false;
let repeater;
let scoreboard = 0;
let minuteScore = 0;
const loseText = document.getElementById("lose");
const audioCrunch = ["audio/crunch/c1.mp3", "audio/crunch/c2.mp3", "audio/crunch/c3.mp3", "audio/crunch/c4.mp3", "audio/crunch/c5.mp3"];
const audioDeath = ["audio/death/x1.mp3", "audio/death/x2.mp3", "audio/death/x3.mp3", "audio/death/x4.mp3", "audio/death/x5.mp3"];

// this makes it so the start button starts the repeater
const startButton = document.getElementById("start");
function startGame() {
  document.getElementById("startScreen").style.display = "none";
  gameStarted = true;
  repeater = setInterval(second, 10);
}

// this is the repeater, everthing within this function will repeat every 10ms
function second() {
  scoreboard += 0.01;

  // what the values do
  hunger.value -= 0.01;
  thirst.value -= 0.01;
  energy.value -= 0.01;
  moisture.value -= 0.01;
  oxygen.value -= 0.01;

  // health functionality
  const empty = (hunger.value === 0) + (thirst.value === 0) + (energy.value === 0);
  if (empty > 0) {
    health.value -= 0.025 * empty;
  }

  // overtime function
  if (moisture.value === 0) {
    overtime_moisture.value -= 0.01;
    eyeState.src = "fotos/expressions/eyeDry.png";
  } else {
    overtime_moisture.value += 0.01;
  }

  if (oxygen.value === 0) {
    overtime_oxygen.value -= 0.01;
    headState.src = "fotos/expressions/headOxygen.png";
  } else {
    overtime_oxygen.value += 0.01;
    headState.src = "fotos/expressions/headNeutral.png";
  }

  if (overtime_oxygen.value === 0) {
    health.value -= 0.25;
  }

  if (overtime_moisture.value === 0) {
    eyeState.src = "fotos/expressions/eyeBlind.png";
    document.getElementById("healthBars").style.visibility = "hidden";
    document.getElementById("blink").style.display = "none";
    document.getElementById("internals").style.width = "145px";
    document.getElementById("internals").style.left = "85.8%";
  }

  // spontanious combustion feature
  const mysteryNumber = Math.round(Math.random() * 9000);
  if (mysteryNumber === 1) {
    igniteState = true;
    let audio = new Audio("audio/scream.mp3");
    audio.play();
  }

  if (igniteState) {
    bodyState.src = "fotos/expressions/bodyBurn.png";
    eyeState.src = "fotos/expressions/eyeBurn.png";
    mouthState.src = "fotos/expressions/mouthOpen.png";
    health.value -= 0.1;
    burnLock();
  }

  // this if statement makes it so there is a difference between seconds and minutes
  if (scoreboard >= 60) {
    minuteScore += 1;
    scoreboard = 0;
  }

  // easter eggs
  let name = document.querySelector("input").value;
  if (name === "") {
    name = "You";
  } else if (name === "Dinnerbone") {
    headState.style.transform = "rotate(180deg)";
    bodyState.style.transform = "rotate(180deg)";
    eyeState.style.transform = "rotate(180deg)";
    mouthState.style.transform = "rotate(180deg)";
  } else if (name === "Duality" || name === "Weeknd") {
    moisture.value = 0;
    overtime_moisture.value = 0;
  } else if (name === "Night") {
    document.querySelector("body").style.backgroundImage = "url('fotos/backgroundNight.png')";
    document.querySelector("body").style.backgroundColor = "#3aa649"
  } else if (name === "Hardcore") {
    hunger.value -= 0.01;
    thirst.value -= 0.01;
    energy.value -= 0.01;
    moisture.value -= 0.01;
    oxygen.value -= 0.01;
  } else if (name === "Admin") {
    clearInterval(repeater);
  } else if (name === "Instakill") {
    health.value = 0;
  }
  
  // stop everything + death screen
  if (health.value <= 0) {
    const randomSound = Math.floor(Math.random() * 5);
    console.log(randomSound);
    let audio = new Audio(audioDeath[randomSound]);
    audio.play();
    eyeState.src = "fotos/expressions/eyeDead.png";
    bodyState.src = "fotos/expressions/bodyDead.png";
    actionPause();
    restartScreen.style.visibility = "visible";
    if (minuteScore === 1) {
      loseText.textContent += name + " stayed alive for " + minuteScore + " minute and " + Math.round(scoreboard) + " seconds.";
    } else {
      loseText.textContent += name + " stayed alive for " + minuteScore + " minutes and " + Math.round(scoreboard) + " seconds.";
    }
    // ^ small technicallity, I didn't like that it said "2 minute" or "1 minutes"
    clearInterval(repeater);
  }
}

// button functionality
function actionPause() {
  document.getElementById("beans").style.pointerEvents = "none";
  document.getElementById("protein").style.pointerEvents = "none";
  document.getElementById("drink").style.pointerEvents = "none";
  document.getElementById("blink").style.pointerEvents = "none";
  document.getElementById("breathe").style.pointerEvents = "none";
  document.getElementById("heal").style.pointerEvents = "none";
  document.getElementById("extinguish").style.pointerEvents = "none";
}

function actionPlay() {
  document.getElementById("beans").style.pointerEvents = "auto";
  document.getElementById("protein").style.pointerEvents = "auto";
  document.getElementById("drink").style.pointerEvents = "auto";
  document.getElementById("blink").style.pointerEvents = "auto";
  document.getElementById("breathe").style.pointerEvents = "auto";
  document.getElementById("heal").style.pointerEvents = "auto";
  document.getElementById("extinguish").style.pointerEvents = "auto";
}

function burnLock() {
  document.getElementById("beans").style.pointerEvents = "none";
  document.getElementById("protein").style.pointerEvents = "none";
  document.getElementById("drink").style.pointerEvents = "none";
  document.getElementById("blink").style.pointerEvents = "none";
  document.getElementById("breathe").style.pointerEvents = "none";
  document.getElementById("heal").style.pointerEvents = "none";
}

function burnKey() {
  document.getElementById("beans").style.pointerEvents = "auto";
  document.getElementById("protein").style.pointerEvents = "auto";
  document.getElementById("drink").style.pointerEvents = "auto";
  document.getElementById("blink").style.pointerEvents = "auto";
  document.getElementById("breathe").style.pointerEvents = "auto";
  document.getElementById("heal").style.pointerEvents = "auto";
}

//beans
const beanButton = document.getElementById("beans");
function beans() {
  if (gameStarted) {
    hunger.value += 15;
    energy.value += 5;
    bodyState.src = "fotos/expressions/bodyBeans.png";
    let audio = new Audio("audio/slurp.mp3");
    audio.play();
    actionPause();
    setTimeout(function () {
      bodyState.src = "fotos/expressions/bodyNeutral.png";
      actionPlay();
    }, 1600);
  }
}

// protein bar
const proteinButton = document.getElementById("protein");
function protein() {
  if (gameStarted) {
    hunger.value += 5;
    energy.value += 25;
    bodyState.src = "fotos/expressions/bodyProtein.png";
    const randomSound = Math.floor(Math.random() * 5);
    let audio = new Audio(audioCrunch[randomSound]);
    audio.play();
    actionPause();
    setTimeout(function () {
      bodyState.src = "fotos/expressions/bodyNeutral.png";
      actionPlay();
    }, 750);
  }
}

// drink
const drinkButton = document.getElementById("drink");
function drink() {
  if (gameStarted) {
    thirst.value += 10;
    bodyState.src = "fotos/expressions/bodyDrink.png";
    let audio = new Audio("audio/gulp.mp3");
    audio.play();
    actionPause();
    setTimeout(function () {
      bodyState.src = "fotos/expressions/bodyNeutral.png";
      actionPlay();
    }, 750);
  }
}

// blink
const blinkButton = document.getElementById("blink");
function blink() {
  if (gameStarted) {
    moisture.value += 5;
    eyeState.src = "fotos/expressions/eyeBlink.png";
    actionPause();
    setTimeout(function () {
      eyeState.src = "fotos/expressions/eyeNeutral.png";
      actionPlay();
    }, 150);
  }
}

// breathe
const breatheButton = document.getElementById("breathe");
function breathe() {
  if (gameStarted) {
    oxygen.value += 3;
    mouthState.src = "fotos/expressions/mouthOpen.png";
    actionPause();
    setTimeout(function () {
      mouthState.src = "fotos/expressions/mouthNeutral.png";
      document.getElementById("breathe").style.pointerEvents = "auto";
      actionPlay();
    }, 500);
  }
}

// heal
const pillButton = document.getElementById("heal");
function heal() {
  if (gameStarted) {
    health.value += 20;
    bodyState.src = "fotos/expressions/bodyPills.png";
    mouthState.src = "fotos/expressions/mouthOpen.png";
    document.getElementById("medLock").style.visibility = "visible";
    let audio = new Audio("audio/pills.mp3");
    audio.play();
    actionPause();
    setTimeout(function () {
      bodyState.src = "fotos/expressions/bodyNeutral.png";
      mouthState.src = "fotos/expressions/mouthNeutral.png";
      actionPlay();
    }, 750);
    setTimeout(function () {
      document.getElementById("medLock").style.visibility = "hidden";
    }, 30000);
  }
}

// extinguish
const extinguishButton = document.getElementById("extinguish");
function extinguish() {
  if (gameStarted) {
    bodyState.src = "fotos/expressions/bodyExtinguish.png";
    eyeState.src = "fotos/expressions/eyeNeutral.png";
    mouthState.src = "fotos/expressions/mouthNeutral.png";
    igniteState = false;
    let audio = new Audio("audio/woosh.mp3");
    audio.play();
    actionPause();
    setTimeout(function () {
      bodyState.src = "fotos/expressions/bodyNeutral.png";
      burnKey();
      actionPlay();
    }, 1500);
  }
}

// restart everything
const restartButton = document.getElementById("restart");
function restart() {
  document.getElementById("restartScreen").style.visibility = "hidden";
  health.value += 100;
  hunger.value += 65;
  thirst.value += 35;
  energy.value += 125;
  moisture.value += 10;
  overtime_moisture.value += 10;
  oxygen.value += 5;
  overtime_oxygen.value += 5;
  repeater = setInterval(second, 10);
  loseText.textContent = "";
  scoreboard = 0;
  minuteScore = 0;
  igniteState = false;
  actionPlay();
  headState.src = "fotos/expressions/headNeutral.png";
  bodyState.src = "fotos/expressions/bodyNeutral.png";
  eyeState.src = "fotos/expressions/eyeNeutral.png";
  mouthState.src = "fotos/expressions/mouthNeutral.png";
  document.getElementById("healthBars").style.visibility = "visible";
  document.getElementById("blink").style.display = "block";
  document.getElementById("internals").style.width = "290px";
  document.getElementById("internals").style.left = "90%";
  document.getElementById("medLock").style.visibility = "hidden";
}

const changeUserButton = document.getElementById("changePerson");
function changeUser() {
  location.reload();
}

// event listeners
startButton.addEventListener("click", startGame);
beanButton.addEventListener("click", beans);
proteinButton.addEventListener("click", protein);
drinkButton.addEventListener("click", drink);
blinkButton.addEventListener("click", blink);
breatheButton.addEventListener("click", breathe);
pillButton.addEventListener("click", heal);
extinguishButton.addEventListener("click", extinguish);
restartButton.addEventListener("click", restart);
changeUserButton.addEventListener("click", changeUser);
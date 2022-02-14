//Array of words
const words = [
  "Hello",
  "Programming",
  "Code",
  "Javascript",
  "Python",
  "Designer",
  "Developer",
  "Testing",
  "Country",
  "Graphic",
  "Github",
  "Twiter",
  "Facebook",
  "Leetcode",
  "Linkedin",
  "Typing",
  "Speed",
  "Styling",
  "Scala",
  "Internet",
  "Documentation",
  "Playing",
  "Eat",
  "Reading",
  "Funny"
];

//Setting levels
const lvls = {
  "Easy": 6,
  "Normal": 4,
  "Hard": 2
}

// Defaut level
let defaultLevelName = "Normal";  // change level from here
let defaultLevelSeconds = lvls[defaultLevelName];

//Selectors
let levelNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let StartButton = document.querySelector(".start");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

// level name + seconds + score
levelNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

//disable pase event
input.onpaste = function() {
  return false;
}

//start game button
StartButton.onclick = function() {
  this.remove();
  input.focus();

  //generate word function
  generateWords()
}

function generateWords() {
  //random word from array
  let randomWords = words[Math.floor(Math.random() * words.length)];
  // word index
  let wordIndex = words.indexOf(randomWords);
  // remove word from array
  words.splice(wordIndex, 1);
  // show random word
  theWord.innerHTML = randomWords;
  //empty upcoming words
  upcomingWords.innerHTML = '';
  // generate upcoming words
  for (let i = 0; i < words.length; i++) {
    let div = document.createElement("div");
    let text = document.createTextNode(words[i]);
    div.appendChild(text);
    upcomingWords.appendChild(div);
  }

  // start typing function
  startTyping();
}

function startTyping() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if(timeLeftSpan.innerHTML === "0") {
      clearInterval(start);
      // compare words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        input.value = "";
        //incrase score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          generateWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanText = document.createTextNode("Congratulation");
          span.appendChild(spanText);
          finishMessage.appendChild(span);
          //remove upcoming words
          upcomingWords.remove();
        }
      } else {
        let span = document.createElement("span");
        span.className = 'bad';
        let spanText = document.createTextNode("Game over");
        span.appendChild(spanText);
        finishMessage.appendChild(span);
      }
    }
  }, 1000);
}


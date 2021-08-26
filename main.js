let lettersContainer = document.querySelector(`.letters`);

let letters = `abcdefghijklmnopqrstuvwxyz`;
let lettersArray = letters.split('');

lettersArray.forEach((letter) => {
  //create a span and text node then add the class letter-box
  let span = document.createElement('span');
  span.appendChild(document.createTextNode(letter));
  span.className = 'letter-box';
  
  //add the span to the tree
  lettersContainer.appendChild(span);
})

//choosing the word to start the game with
let words = {
  programming: ['Java', 'Python', 'Javascript', 'PHP', 'MySQL', 'Ruby', 'C'],
  movies: ['Breaking Bad', 'Peaky Blinders', 'Sons Of Anarchy', 'La Casa De Papel', 'Your Honor'],
  people: ['Beshoy', 'Micheal', 'Philip', 'Mina', 'Anton']
}

let keys = Object.keys(words);
let randNum = Math.floor(Math.random() * keys.length);
let randKey = keys[randNum];
let randValue = words[randKey];

let randValueNum = Math.floor(Math.random() * randValue.length);
let randWord = randValue[randValueNum];

//set the word from: (...)
document.querySelector(`.game-info .category span`).innerText = randKey;

let randWordArray = randWord.split('');
let lettersGuessContainer = document.querySelector(`.letters-guess`);

randWordArray.forEach(letter => {

  //create a new span and if space it will have (with-space) class
  let span = document.createElement(`span`);
  if (letter === ' ') {
    span.className = `with-space`;
  }
  lettersGuessContainer.appendChild(span);
});

//the letters guess spans
let Allspans = document.querySelectorAll(`.letters-guess span`);

//the draw elment and wrongCount
let theDraw = document.querySelector(`.hangman-draw`)
let wrongCount = 0;

//the clicking event
document.addEventListener('click', (e) => {

  let theStatus = false;
  let finished = true;

  if (e.target.className === 'letter-box') {

    e.target.classList.add('clicked');

    let clickedLetter = e.target.innerText.toLowerCase();

    randWord.toLowerCase().split('').forEach((letter, index) => {

      if (clickedLetter == letter) {

        theStatus = true;

        Allspans.forEach((span, spanIndex) => {

          if (index === spanIndex) {

              span.innerText = clickedLetter;
          }
        });
        
      }
    });

    if (!theStatus) {
      
      wrongCount++;

      theDraw.classList.add(`wrong-${wrongCount}`);

      console.log(`fail`);

      if (wrongCount === 8) {
        endGameLose();

        lettersContainer.classList.add(`finished`);
      }

    } else {
      console.log(`success`);

      //check if that letter was the last
      Allspans.forEach((span) => {
        if (!span.classList.contains(`with-space`)) {
          if (span.innerText === '') {
            finished = false;
          }
        }
      });

      if (finished) {
        endGameWin();
      }
    }
  }
});

function endGameLose() {

  //create the div with the message
  let div = document.createElement(`div`);
  div.appendChild(document.createTextNode(`Game Over, The Word Was ${randWord}`));
  div.className = `popup`
  document.body.appendChild(div);

}

function endGameWin() {

  //create the div with the message
  let div = document.createElement(`div`);
  div.appendChild(document.createTextNode(`Good Game You Did It !!!`));
  div.className = `popup`
  document.body.appendChild(div);

}
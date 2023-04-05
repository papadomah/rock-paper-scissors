//Prevent animation on load
setTimeout( () =>{
  document.body.classList.remove('preload');
}, 500);

//DOM
let btnRules = document.querySelector('.rules-btn')
let btnClose= document.querySelector('.close-btn')
let modalRules =document.querySelector('.modal')
const CHOICES = [
  {
    name: 'paper',
    beats: 'rock'
  },
  {
    name: 'scissors',
    beats: 'paper'
  },
  {
    name: 'rock',
    beats: 'scissors'
  }
]
const choiceButtons = document.querySelectorAll('.choice-btn')
const gameD = document.querySelector('.game'); //entire div that surround game div
const resultsD = document.querySelector('.results'); //the div of results
const resultDs = document.querySelectorAll('.results_result'); //the div of the actual result
//winner result DOM
let resultWinner = document.querySelector('.results_winner');
let resultText = document.querySelector('.results_text');

//play again DOM
let playAgainBtn = document.querySelector('.play-again');
// score DOM
let scoreNumber = document.querySelector('.score_number');
let score = 0;

//game logic
choiceButtons.forEach(button =>{
  button.addEventListener('click', () =>{
    let choiceName = button.dataset.choice;
    let choice = CHOICES.find(choice => choice.name === choiceName)
    choose(choice)
  })
})
//choose function
choose = (choice) =>{
let compChoice = compChoose()
displayResults ([choice, compChoice]) // this to display result
displayWinner ([choice, compChoice]) // this display winner 
} 
//computer choose function
function compChoose () {
  let rand = Math.floor(Math.random()*CHOICES.length)
  return CHOICES[rand];
}
//results display function
function displayResults(results) {
  resultDs.forEach((resultsD, idx) =>{
    setTimeout(() => { /* the reason why we using settimeout is not to allow the computer result to not happen right away*/
      resultsD.innerHTML = `
      <div class="choice ${results[idx].name}">
      <img src="images/icon-${results[idx].name}.svg" alt="${results[idx].name}" />
      </div>
      `;
    }, idx*1000);
  })
  gameD.classList.toggle('hidden')
  resultsD.classList.toggle('hidden')
}
//display winner function
function displayWinner(results){
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner(results.reverse());
    if(userWins){
      resultText.innerText = 'you win';
      resultDs[0].classList.toggle('winner'); //the three layer function for user
      keeScore(1); //this is to add one point if we win
    } else if(aiWins){
      resultText.innerText = 'you lose';
      resultDs[1].classList.toggle('winner'); //the three layer function for computer
      keeScore(-1); //this is to subtract one point if we lose
    } else{
      resultText.innerText = 'draw';
    }
    resultWinner.classList.toggle('hidden');
    resultsD.classList.toggle('show-winner');
  }, 1000);
};
//isWinner function
function isWinner(results) {
  return results[0].beats === results[1].name; // to compare your choice to comp choice . that is the reason to use result.reverse() at line 69 to compare the comp choice first to user choice. to check if the first result beats the second result or to compare your choice to the computer choice
}
keeScore = (point) =>{
  score += point
  scoreNumber.innerText = score
}

//play again function
playAgainBtn.addEventListener('click', () =>{
  gameD.classList.toggle('hidden')
  resultsD.classList.toggle('hidden')

  resultDs.forEach(resultsD =>{ //this function is to clear all results to its original for the next game
    resultsD.innerHTML = '';
    resultsD.classList.remove('winner')
  })
  resultText.innerText = '';
  resultWinner.classList.toggle('hidden')
  resultsD.classList.toggle('show-winner')
})


//we doing it in set time out because we do not want the computer result to not happen immediately
//show and hide rules
btnRules.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal')
});
btnClose.addEventListener('click', () => {
  modalRules.classList.toggle('show-modal')
});
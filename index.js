// Timer
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
const intervalId = setInterval(setTime, 1000);

function setTime() {
  ++totalSeconds;
  secondsLabel.innerHTML = pad(totalSeconds % 60);
  minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function stopTime(){
    clearInterval(intervalId)
}

function pad(val) {
  var valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

// Modal
// Get the modal
var modal = document.getElementById("myModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

// Memory Game
const backgroundArray = [
    'bauble.png',
    'bauble.png',
    'christmas-tree.png',
    'christmas-tree.png',
    'gift.png',
    'gift.png',
    'mistletoe.png',
    'mistletoe.png',
    'santa-claus.png',
    'santa-claus.png',
    'santa-hat.png',
    'santa-hat.png',
    'snow-globe.png',
    'snow-globe.png',
    'snowflake.png',
    'snowflake.png',
    'snowman.png',
    'snowman.png',
    'sweet.png',
    'sweet.png'
];
let memory_values = [];
let memory_tile_ids = [];
let tiles_flipped = 0;
let canPlay = true;
let numberOfMoves = 0;

// restartIcon Logic
const restartIcon = document.getElementById("restart-icon")
restartIcon.addEventListener("click", () => {
  newBoard();
  numberOfMoves=0;
  const moves = document.getElementById("moves")
  moves.innerHTML = ''
  secondsLabel.innerHTML = "00";
  minutesLabel.innerHTML = "00";
  totalSeconds=0;
})

// Shuffle function
Array.prototype.tile_shuffle = function() {
    var i = this.length, indexj, temp;
    while(--i > 0) {
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
}

// Modal Button Start a new game functionality
const modalButton = document.getElementsByClassName("button_cont")[0]
modalButton.addEventListener("click", () => {
  newBoard();
  numberOfMoves=0;
  const moves = document.getElementById("moves")
  moves.innerHTML = ''
  secondsLabel.innerHTML = "00";
  minutesLabel.innerHTML = "00";
  totalSeconds=0;
  modal.style.display = "none";
})

// Function that creates a new board
const newBoard = () => {
    tiles_flipped = 0;
    let output='';
    backgroundArray.tile_shuffle();
    for(let i = 0; i < backgroundArray.length; i++){
        output += '<div class="carrestart-icond" id="tile_'+i+'" onclick="flipTile(this,\''+backgroundArray[i]+'\')"></div>';
    }
    document.getElementById('memory-board').innerHTML = output;
}

// Function that countes how many moves the player has made
const moveCounter = () => {
    numberOfMoves++;
    const moves = document.getElementById("moves")
    moves.innerHTML = `Number of Moves:${numberOfMoves}`
}

window.addEventListener('load', () => {
    newBoard();
})

const flipTile = (tile, val) => {
    tile.style.backgroundImage = `url("images/${val}")`
    tile.style.backgroundRepeat = "no-repeat";
    tile.style.backgroundSize = "auto";
    tile.innerHTML = val;
    if(memory_values.length == 0){
        memory_values.push(val);
        memory_tile_ids.push(tile.id);
    } else if (memory_values.length == 1){
        memory_values.push(val);
        memory_tile_ids.push(tile.id);
        moveCounter();
        if (memory_values[0] == memory_values[1]) {
            tiles_flipped += 2;
            memory_values = [];
            memory_tile_ids = [];  
            if(tiles_flipped == backgroundArray.length){
              // function to handle a new game
              const minutesModal = document.getElementById("minutes-modal")
              minutesModal.innerHTML = pad(parseInt(totalSeconds / 60));
              const secondsModal = document.getElementById("seconds-modal")
              secondsModal.innerHTML = pad(totalSeconds % 60); 
              const movesSpan = document.getElementById("moves-span")
              movesSpan.innerHTML = numberOfMoves;
              modal.style.display = "block";
            }
        } else {
            const flip = () => {
                // Flip the 2 tiles back over
                let tile_1 = document.getElementById(memory_tile_ids[0]);
                let tile_2 = document.getElementById(memory_tile_ids[1]);
                tile_1.style.backgroundImage = `url("images/background-image.jpg")`
                tile_1.style.backgroundSize = "cover";
                tile_2.style.backgroundImage = `url("images/background-image.jpg")`
                tile_2.style.backgroundSize = "cover";
                memory_values = [];
                memory_tile_ids = [];
            }
            setTimeout(flip, 400);
        }
    }
}

// Choose the Music
let selectMusic = document.getElementById("select-music")
selectMusic.addEventListener('change', (e) => {
  e.preventDefault()
  console.log(e.target.value)
  let player = document.getElementById("player");
  player.src = `./musics/${e.target.value}`;
})
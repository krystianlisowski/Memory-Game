//array with card colors
const cardColors = ["red", "red", "green", "green", "blue", "blue", 
"brown", "brown", "yellow", "yellow", "gray", 
"gray", "cadetblue", "cadetblue", "violet", 
"violet", "lightgreen", "lightgreen"];

let cards = document.querySelectorAll('div');
cards = [...cards];//change NodeList to Array

//start time 
const startTime = new Date().getTime();


let activeCard = "";//active card
const activeCards = [];//active pair

const gamePairs = cards.length/2;//number of pairs
let = gameResult = 0;// if == gamePairs game will ends

//click event handling
const cardClick = function(){

    activeCard = this;//get from init clicked element
    if(activeCard == activeCards[0]) return;

    activeCard.classList.remove('hidden');

    //check if is first click
    if(activeCards.length === 0){
        activeCards[0] = activeCard;
        return;
    }
    else {
        cards.forEach(card => card.removeEventListener("click", cardClick));
        activeCards[1] = activeCard;
        //taking a while for see a colors
        setTimeout(function(){
            //check if colors are the same
            if(activeCards[0].className === activeCards[1].className){
                activeCards.forEach(card => card.classList.add('off'));
                gameResult++;

                cards = cards.filter(card => !card.classList.contains('off'));//if calss == off, you cannot click it

                if(gameResult === gamePairs){
                    const endTime = new Date().getTime();
                    const gameTime = (endTime - startTime)/1000;
                    alert(`You win!\nYour time: ${gameTime}s`);
                    location.reload();
                }
            }
            else{
                activeCards.forEach(card => card.classList.add('hidden'));
            }
            activeCard="";
            activeCards.length=0;
            cards.forEach(card =>{
                card.addEventListener("click", cardClick);
            });
        },500);
    }
}

//initialize a game board
const init = function(){
    cards.forEach(card =>{
        const position = Math.floor(Math.random()*cardColors.length);//drawing a index
        card.classList.add(cardColors[position]);//adding css class to index
        cardColors.splice(position, 1);//delete previous color (now array.length == array.length -1)
    })

    //after 1.5s cards will be hidden
    setTimeout(function(){
        cards.forEach(card =>{
            card.classList.add('hidden');
            card.addEventListener("click", cardClick);
        });
    }, 1500)
}

init();
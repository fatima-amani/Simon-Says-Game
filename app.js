let gameSeq=[];
let userSeq=[];
let highScore=0;

let btns = ["yellow","red","green","blue"];

let started=false;
let level=0;

let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started == false){
        started=true;
        console.log("Game started!!!");
        levelUp();
    }    
});

function btnFlash(btn){
    // create a 1sec Flash
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    },250);
}
function btnUserFlash(btn){
    // create a 1sec Flash
    btn.classList.add("user-flash");
    setTimeout(function () {
        btn.classList.remove("user-flash");
    },250);
}

function levelUp(){
    userSeq=[];
    level++;
    h2.innerText = `Level ${level}`;

    // choose random button
    let randomIdx = Math.floor(Math.random() * 4);
    let randomColor = btns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`);
    // console.log(`Index Generated: ${randomIdx}`);
    // console.log(`Color Generated: ${randomColor}`);
    // console.log(`Button Generated: ${randomBtn}`);
    gameSeq.push(randomColor);
    console.log(gameSeq);
    btnFlash(randomBtn);
}

function checkAns(idx){
    if(userSeq[idx] == gameSeq[idx]) {
        if(userSeq.length == gameSeq.length) {
            setTimeout(levelUp,1000);
        }
    }
    else{
        h2.innerHTML = `Game over :( Your score was <b> ${level-1} </b> <br> Press Any key to restart <br>`;
        if(level-1 <= highScore) {
            h2.innerText=h2.innerText+` Current HighScore is: ${highScore}`;
        }
        else {
            h2.innerText+=`Congrats you set a new HIGHSCORE!!!`;
            highScore=level-1;
        }

        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor="white";
        },250);
        reset();
    }

}
function btnPress(){
    let btn = this;
    btnUserFlash(btn);

    let userColor = btn.getAttribute("id"); 
    console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".box");
for(bt of allBtns){
    bt.addEventListener("click",btnPress);
}

function reset() {
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}
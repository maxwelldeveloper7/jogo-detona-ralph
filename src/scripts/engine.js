/**
 *  Objeto que armazena o estado do jogo
 */
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score")
    },
    values: {
        gameVelocity: 700,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },
    actions: {
        timerId: setInterval(randomSquare, 600),
        countDownTimerId: setInterval(countDown, 1000)        
    }
};

/**
 *  Função que conta o tempo restante do jogo
 */
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        alert("Game Over! O seu resultado foi: " + state.values.result);
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
    }
}


function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

/**
 * Função que sorteia um quadrado aleatório
 */
function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });
    // sorteia um número de 1 a 9
    let randomNumber = Math.floor(Math.random() * 9);
    // armazena o numero sorteado na variável randomSquare
    let randomSquare = state.view.squares[randomNumber];
    // adiciona a class enemy no square sorteado
    randomSquare.classList.add("enemy");
    // armazena o id da posição do inimigo
    state.values.hitPosition = randomSquare.id
}


/**
 * Função que adiciona o listener de click no quadrado
 */
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if(square.id === state.values.hitPosition){
                state.values.result ++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();
            }
        });
    })
}

/**
 * Função que inicia o jogo
 */
function initialize() {
    addListenerHitBox();
}


initialize();
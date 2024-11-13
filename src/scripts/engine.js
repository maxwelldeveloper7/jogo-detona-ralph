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
        timerId: null,
        gameVelocity: 600
    }
};

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
}

/**
 * Função que move o inimigo
 */
function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

/**
 * Função que adiciona o listener de click no quadrado
 */
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        
    })
}

/**
 * Função que inicia o jogo
 */
function initialize() {
    moveEnemy()
}


initialize();
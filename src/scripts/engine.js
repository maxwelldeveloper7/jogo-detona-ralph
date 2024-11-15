/**
 *  Objeto que armazena o estado do jogo
 */
const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        lives:7,
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
    // diminui o um segundo do tempo atual a cada segundo que sepassa
    state.values.currentTime--;
    // renderiza o tempo atual na tela
    state.view.timeLeft.textContent = state.values.currentTime;
    // se o tempo acabar ou o jogador perder as 7 vidas o jogo encerra
    if(state.values.currentTime <= 0 || state.values.lives === 0){
        // exibe uma janela com a mensagem abaixo
        alert("Game Over! O seu resultado foi: " + state.values.result
            + "\n\nPara jogar novamente, atualize a página."
        );
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
    }
}

/**
 * 
 * Toca umm arquivo de audio
 * @param {*} audioName 
 */
function playSound(audioName) {
    // armazena o nome e caminho do arquivo de audio
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    // ajusta o volume para 20%
    audio.volume = 0.2;
    // toca o arquivo de audio
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
        //adiciona o evento do clicar do mouse em cada quadrado, e executa o código abaixo
        square.addEventListener("mousedown", () => {
            //se acertar e o jogador ainda tiver vidas
            if(square.id === state.values.hitPosition && state.values.lives !==0){
                //aumenta o valor dos pontos
                state.values.result ++
                //renderiza na tela o novo score
                state.view.score.textContent = state.values.result;
                //seta o valor null para a variável hitPosition
                state.values.hitPosition = null;
                //toca o som de acerto
                playSound("hit");
            //se não acertar
            }
            // evita que 
            else {
                /* verifica se as vidas já acabaram e evita que 
                fiquem com valor negativo*/
                if(state.values.lives === 0){
                    state.view.lives.textContent = "0";
                } else {
                    //diminui o numero de vidas
                    state.values.lives --
                    // renderiza na tela a quantidade de vidas
                    state.view.lives.textContent = state.values.lives;
                    //toca o som de falha
                    playSound("miss");
                }
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
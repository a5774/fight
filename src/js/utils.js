// Collision decide
function Collision({ mdoelT, modelF }) {
    // left 
    return (mdoelT.attackBox.position.x + mdoelT.attackBox.width >= modelF.position.x &&
        // right
        mdoelT.attackBox.position.x <= modelF.position.x + modelF.width &&
        // up
        mdoelT.attackBox.position.y + mdoelT.attackBox.height >= modelF.position.y &&
        // if  both may jump so exist -+y
        // down 
        mdoelT.attackBox.position.y <= modelF.position.y + modelF.height)
}
function determineWiner({ player, emeny, TimerID }) {
    // clear TimeOit 
    clearTimeout(TimerID)
    let displayText = document.querySelector('.displayText')
    displayText.style.display = 'flex'
    if (player.health == emeny.health) {
        displayText.innerText = 'Tie'
    } else if (player.health > emeny.health) {
        displayText.innerText = `${player.name}\u0020Win`
    } else {
        displayText.innerText = `${emeny.name}\u0020Win`
    }
}

function decreaseTimer() {
    // count down 
    if (timer > 0) {
        // save TimeOut Id 
        TimerID = setTimeout(decreaseTimer, 1000)
        timer--
        document.querySelector('.timer').innerText = timer
    }
    // Timer Over 
    if (timer == 0) {
        document.querySelector('.displayText').innerText = 'Time Over'
        determineWiner({player,emeny,TimerID})
        // determineWiner({ player, emeny })
    }
}
function posdisplay(){
    vm.localtionP1 = {
        name:player.name,
        x:player.posX(),
        y:player.posY(),
        veloY:player.veloY()
    }
    vm.localtionP2 = {
        name:emeny.name,
        x:emeny.posX(),
        y:emeny.posY(),
        veloY:emeny.veloY()
    }
}
// bind keys 
globalThis.addEventListener('keydown', (e) => {
    // if Death then does movement 
    if (!player.isDeath) {
        switch (e.key) {
            case 'a':
                keys.a.pressed = true
                lastKey = e.key
                break;
            case 'd':
                keys.d.pressed = true
                lastKey = e.key
                break;
            case 'w':
                /* keys['w'].pressed = true
                lastKey = e.key */
                player.velocity.y = - player.speed.y
                break;
            case 'j':
                player.attack()
                break;
        }
    }
    if (!emeny.isDeath) {
        switch (e.key) {
            case 'ArrowLeft':
                keys.ArrowLeft.pressed = true
                lastKey = e.key
                break;
            case 'ArrowRight':
                keys.ArrowRight.pressed = true
                lastKey = e.key
                break;
            case 'ArrowUp':
                /* keys.ArrowUp.pressed = true
                lastKey = e.key */
                emeny.velocity.y = - emeny.speed.y
                break;
            case '1':
                emeny.attack()
                break;
        }
    }
})

globalThis.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'a':
            keys.a.pressed = false
            break;
        case 'd':
            keys.d.pressed = false
            break;
        /* case 'w':
            keys['w'].pressed = false
            break; */
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false
            break;
        /* case 'ArrowUp':
            keys.ArrowUp.pressed = false
            break; */

    }
})
function interactive(){
     // Game Over
    // any one not has health 
    if (player.health <= 0 || emeny.health <= 0) {
        determineWiner({ player, emeny, TimerID })
    }
    
    // detect for collision 
    if (Collision({
        mdoelT: player,
        modelF: emeny
    }) && player.isAttacking && player.framesCurrent == 4 ) {
        emeny.takeHit(player.damage)
        // view render 
        gsap.to('.emenyHealth',{
            width:`${emeny.health}%`
        })
        //attack only once fps
        player.isAttacking = false
    }
    // is miss attack 
    if(player.framesCurrent == 4 && player.isAttacking){
        player.isAttacking = false
    }


    if (Collision({
        mdoelT: emeny,
        modelF: player
    }) && emeny.isAttacking && emeny.framesCurrent == 2 ) {
        player.takeHit(emeny.damage)
        gsap.to('.playerHealth',{
            width:`${player.health}%`
        })
        emeny.isAttacking = false
    }

    if(emeny.framesCurrent == 2 && emeny.isAttacking){
        emeny.isAttacking = false
    }
    // reset speed 
    player.velocity.x = 0
    emeny.velocity.x = 0
    // reset Idle
    // will Frequent switching dont recommend
    // player.swicthSprite('idle')

    // player movement bind animation 
    if (keys.a.pressed && (player.lastKey == 'a' || flag)) {
        player.velocity.x = - player.speed.x
        // run  
        player.swicthSprite('run')
    }else if (keys.d.pressed && (player.lastKey == 'd' || flag)) {
        player.velocity.x = player.speed.x
        player.swicthSprite('run')
        //only if dont down a or d  key then Switch:'idle'
    }else 
    // jump animation 
    if(player.velocity.y < 0){
        player.swicthSprite('jump')
    }else if(player.velocity.y > 0 ){
        player.swicthSprite('fall')
    }else{
        // frame loop will clear attack animation 
        player.swicthSprite('idle')
    }
    
    // emeny movement 
    if (keys.ArrowLeft.pressed && (emeny.lastKey == "ArrowLeft" || flag)) {
        emeny.velocity.x = - emeny.speed.x
        emeny.swicthSprite('run')
    }else
    if (keys.ArrowRight.pressed && (emeny.lastKey == "ArrowRight" || flag)) {
        emeny.velocity.x = emeny.speed.x
        emeny.swicthSprite('run')
    }else
    if(emeny.velocity.y < 0 ){
        emeny.swicthSprite('jump')
    }else if(emeny.velocity.y > 0 ){
        emeny.swicthSprite('fall')
    }else{
        emeny.swicthSprite('idle')
    }
}
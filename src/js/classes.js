
class Sprite {
    constructor({ position, imageSrc, scale = 1, frameMax = 1, framesHold = 10, offsetSprite = { x: 0, y: 0 } }) {
        this.position = position
        // only once 
        this.image = new Image()
        // this.imageSrc = imageSrc
        this.image.src = imageSrc
        this.scale = scale
        this.frameMax = frameMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        // wait frame for anmation ，slow factor
        this.framesHold = framesHold
        this.offsetSprite = offsetSprite
    }
    draw() {

        any.drawImage(
            this.image,
            // Cut position for image s_x-y
            this.framesCurrent * (this.image.width / this.frameMax),
            0, //this.image.height 
            // Cropped image size s_w-h
            this.image.width / this.frameMax,
            this.image.height,
            // image position  for canvas d_x-y
            this.position.x - this.offsetSprite.x,
            this.position.y - this.offsetSprite.y,
            // image scale or enlarge 
            (this.image.width / this.frameMax) * this.scale,
            this.image.height * this.scale
        )
    }
    // animation control
    animationFrame() {
        this.framesElapsed++
        // slow speed 
        // when antimate Elapsed  this.frameHold then move this.frmaeCurrent 
        if (this.framesElapsed % this.framesHold == 0) {
            // when this.frameCurent more/equal then this.frameMax 
            // frameMax - 1 : Maximum frame
            if (this.framesCurrent >= this.frameMax - 1) {
                // jump init frame
                this.framesCurrent = 0
            } else {
                // else move frameCurrent 
                this.framesCurrent++
            }
        }
    }
    update() {
        this.draw()
        this.animationFrame()
    
    }
    ceil(any) {
        return Math.ceil(any)
    }
    posX() {
        return this.ceil(this.position.x)
    }
    posY() {
        return this.ceil(this.position.y)
    }
    veloY() {
        return this.ceil(this.velocity.y)
    }
}
// extends does create parent instance 
class Fight extends Sprite {
    // object deconstruction 
    constructor({ position, velocity, body: { width ,height, damage, health, color, name, speed } }, { imageSrc, scale = 1, frameMax = 1, framesHold = 10, offsetSprite, sprites, attackBox = { offset: { x: 0, y: 0 }, width: 150, height: 50 } }) {
        // super constrcutor must before this()
        super({
            position, imageSrc, scale, frameMax, framesHold, offsetSprite, sprites
        })
        // instance attribute 
        this.position = position
        this.velocity = velocity
        this.width = width
        this.height = height
        this.health = health
        this.damage = damage
        this.speed = speed
        this.color = color
        this.name = name
        // chcek  last key is down 
        this.lastKey
        this.isDeath = false
        this.attackBox = {
            // Shallow copy: quote assignment 
            // position == this.position,
            position: {
                // value assignment
                x: this.position.x,
                y: this.position.y
            },
            // color: this.color,
            offset: attackBox.offset,
            width: attackBox.width,
            height: attackBox.height
        }
        this.isAttacking = false
        this.sprites = sprites
        // iterator genatoer Image
        for (const sprite in this.sprites) {
            // console.log(sprites[sprite]);
            // replace Image or imageSrc
            sprites[sprite].image = new Image()
            sprites[sprite].image.src = sprites[sprite].imageSrc
        }
    }
    // canvas draw 
    // draw  framework view 
    draw() {
        super.draw()
        // draw body 
        if(isVisbleBody){
            any.fillStyle = this.color
        any.fillRect(this.position.x, this.position.y, this.width, this.height)
        }
        // draw attackBox
        if (this.isAttacking && isVisbleAttackBox) {
            any.fillStyle = "blue"
            any.fillRect(
                this.attackBox.position.x,
                this.attackBox.position.y,
                this.attackBox.width,
                this.attackBox.height
            )
        }

    }

    // update prototype 
    update() {
        // draw does not exist then call Sprite.draw
        // this.draw()
        // call Sprite.animationFrame reach Character animation
        // this.animationFrame()

        // use prototype method inner this is Fight.instance
        // super.update()// this.draw:Fight,this.animationFrame()
        this.draw()
        if(!this.isDeath){ super.animationFrame()}
        // movement 
        this.position.x += this.velocity.x
        // console.log(this.velocity);
        // jump 
        // q: when gravity is too fast ,the fall aniamtion will happend offset 
        this.position.y += this.velocity.y
        // this.position.y + this.velocity.y + gravity ：330 -9
        // this.position.y + this.velocity.y + gravity*2 ：330 -9 -8.8
        // this.position.y + this.velocity.y + gravity*3 ： 330 -9 -8.2
        if (this.position.y + this.height + this.velocity.y >= canvas.height - 96) {
            // setting fixd location ,fix fall offset 
            this.position.y = 330
            this.velocity.y = 0
            // Gravitational accelerated speed
        } else this.velocity.y += gravity
        // console.log(this.velocity);
        // attackBox
        this.attackBox.position.x = this.position.x - this.attackBox.offset.x
        this.attackBox.position.y = this.position.y - this.attackBox.offset.y

    }
    swicthSprite(spriteName) {
        // fix sprites.idle clear attack 
        //  overriding all other animations with the attack animation
        if (this.image == this.sprites.attackTail.image
            // framesCurrent less then frameMax then call idle 
            // this.framesCurrent Max is this.frameMax
            && this.framesCurrent < this.frameMax -1
        ) {
            //spriteName:attackTail,this.image:idle != attackTail then this.frameMax = self['attackTail'].frameMax
            return
        }
        // override when fight gets hit
        if(this.image == this.sprites.takeHit.image
            && this.framesCurrent < this.frameMax -1
            ){
            return
        }
        // handler death frame 
        if(this.image == this.sprites.death.image){
            if(this.framesCurrent == this.frameMax - 1){
                this.isDeath = true
            }
            // isDeath is true then stop animationFrmaes 
            // this.image:death, when switch('idle') then if(this.image ==  this.sprites.death.image) is true then return 
            return
            
        }
        let self = this.sprites[spriteName]
        // solve Frequent call
        if (this.image != self.image) {
            // console.log(spriteName);
            this.image = self.image
            this.frameMax = self.frameMax
            // Fix a problem where the current animation does not exist frames
            this.framesCurrent = 0
        }
    }
    attack() {
        // attack animation 
        this.swicthSprite('attackTail')
        this.isAttacking = true
        // only between attackTime before cancel attacking 
        /*    setTimeout(() => {
               this.isAttacking = false
           }, attackTime) */
    }
    takeHit(damge){
        // self health damge 
        this.health -= damge
        // console.log(`${this.name}:${this.health}`);
        // Death decide
        if(this.health <= 0){
            //only if  health is empty then call sprites.death and stop animation 
            this.swicthSprite('death')
        }else this.swicthSprite('takeHit')
    }
}

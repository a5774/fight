// down speed 
let gravity = 0.1
let attackTime = 100
let timer = 60
let stop;
let flag = true
let TimerID;
let isVisbleBody = false
let isVisbleAttackBox = false
let keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    /*  'w': {
         pressed: false
     }, */
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    /*  ArrowUp: {
         pressed: false
     } */
}
let vm = new Vue({
    el: '#box',
    data: {
        localtionP1: '',
        localtionP2: ''
    },
    methods: {
        stop() {
            globalThis.cancelAnimationFrame(stop)
        },
        continueCtrl() {
            globalThis.antimate()

        }
    },
})

const background = new Sprite({
    position: {
        x: 0,
        y: 0
    },
    imageSrc: './img/background.png',
    scale: 1,
    frameMax: 1
})
const shop = new Sprite({
    position: {
        x: 600,
        y: 128
    },
    imageSrc: './img/shop.png',
    scale: 2.75,
    frameMax: 6,
    framesHold: 20
})

let player = new Fight({
    position: {
        x: 0,
        // init height 
        y: 300
    },
    velocity: {
        x: 0,
        // init down speed 
        y: 0
    },
    body: {
        width: 50,
        height: 150,
        damage: 20,
        health: 100,
        color: 'RGBA(11,54,24,.5)',
        name: 'bob',
        // movement speed
        speed: {
            x: 5,
            // jump speed 
            y: 8
        }
    }
},//animation
    {
        imageSrc: './img/samuraiMack/Idle.png',
        scale: 2.5,
        frameMax: 8,
        framesHold: 10,
        offsetSprite: {
            x: 230,
            y: 157
        },
        sprites: {
            idle: {
                imageSrc: './img/samuraiMack/Idle.png',
                frameMax: 8
            },
            run: {
                imageSrc: './img/samuraiMack/Run.png',
                frameMax: 8,
            },
            jump: {
                imageSrc: './img/samuraiMack/Jump.png',
                frameMax: 2
            },
            fall: {
                imageSrc: './img/samuraiMack/Fall.png',
                frameMax: 2
            },
            attackTail: {
                imageSrc: './img/samuraiMack/Attack1.png',
                frameMax: 6
            },
            takeHit: {
                imageSrc: './img/samuraiMack/Take Hit - white silhouette.png',
                frameMax: 4
            },
            death: {
                imageSrc: './img/samuraiMack/Death.png',
                frameMax: 6
            }

        },
        attackBox: {
            // attackBox offset 
            offset: {
                x: -50,
                y: 20
            },
            width: 190,
            height: 140
        }
    }
)

let emeny = new Fight({
    position: {
        x: 400,
        y: 0
    },
    velocity: {
        x: 0,
        y: 0
    },
    body: {
        width: 50,
        height: 150,
        damage: 10,
        health: 100,
        color: 'RGBA(0,0,0,.5)',
        name: 'pop',
        speed: {
            x: 5,
            y: 9
        }
    }
},
    {
        imageSrc: './img/kenji/Idle.png',
        scale: 2.5,
        frameMax: 4,
        framesHold: 10,
        offsetSprite: {
            x: 215,
            y: 170
        }, sprites: {
            idle: {
                imageSrc: './img/kenji/Idle.png',
                frameMax: 4
            },
            run: {
                imageSrc: './img/kenji/Run.png',
                frameMax: 8,
            },
            jump: {
                imageSrc: './img/kenji/Jump.png',
                frameMax: 2
            },
            fall: {
                imageSrc: './img/kenji/Fall.png',
                frameMax: 2
            },
            attackTail: {
                imageSrc: './img/kenji/Attack1.png',
                frameMax: 4
            },
            takeHit: {
                imageSrc: './img/kenji/Take hit.png',
                frameMax: 3
            },
            death: {
                imageSrc: './img/kenji/Death.png',
                frameMax: 7
            }
        },
        attackBox: {
            offset: {
                x: 190,
                y: 20
            },
            width: 190,
            height: 140
        }
    }
)
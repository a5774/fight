console.log('%c%s','color:red;font-size:24px;background:yellow','不是吧,开挂?');
const canvas = document.querySelector('canvas')
const any = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
// call all fillRect genatorter one frame 
// any.fillStyle = 'blcak'
// any.fillRect(0, 0, canvas.width, canvas.height)
/* any.fillStyle = 'yellow'
any.fillRect(0, 0, canvas.width / 2, canvas.height / 2 )  */
decreaseTimer()
function antimate() {
    posdisplay()
    stop = globalThis.requestAnimationFrame(antimate)
    any.fillStyle = '#000'
    any.fillRect(0, 0, canvas.width, canvas.height)
    background.update()
    shop.update()
    player.update()
    emeny.update()
    interactive()
    // console.log(emeny.isDeath);
}
// loop antimation 
antimate()


// 解构对象引用属于浅拷贝
/* class a {
    constructor(spr) {
        this.spr = spr
    }
    from(){
        this.spr.a = 10
        console.log(spr.a);
    }
    to() {
        console.log(this.spr.b.f);
    }

}
let spr ={ a: 10, b: { f: 20 } }
let as = new a(spr)
as.to()
spr.b.f = 50
as.to()
as.from() */

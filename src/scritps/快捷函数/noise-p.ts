import { randomlist } from "./math"
export abstract class Noise{
    constructor(
        public seed:number
    ){}
    public abstract getValue(x:number,y:number):number
}
export class Noise2D extends Noise{
    private grid:Float32Array
    constructor(
        public seed:number,
        public edge:number,
        
    ){
        super(seed)
        this.grid=randomlist(this.seed,this.edge*this.edge,true)
    }
    smooth(x: number) {//平滑函数
        return (6*x**5-15*x**4+10*x**3)
    }
    interp(x:number,a:number,b:number){//插值函数
        return a+this.smooth(x)*(b-a);
    }
    dot_grid(x:number,y:number,vx:number,vy:number){//点积函数,貌似有点问题
        let d_vect = {x:x-vx,y:y-vy}
        let g_vect = {x:this.grid[vx+vy*this.edge],y:this.grid[vx+vy*this.edge+1]}//这个应该是取这个值吧？
        return d_vect.x*g_vect.x+d_vect.y+g_vect.y
    }

    public getValue(x: number, y: number): number {
        let xf = Math.floor(x)
        let yf = Math.floor(y)

        let tl = this.dot_grid(x,y,xf,yf)
        let tr = this.dot_grid(x,y,xf+1,yf)
        let bl = this.dot_grid(x,y,xf,yf+1)
        let br = this.dot_grid(x,y,xf+1,yf+1)
        let xt = this.interp(x-xf,tl,tr)
        let xb = this.interp(x-xf,bl,br)
        let v = this.interp(y-yf,xt,xb)
        return v
    }
}
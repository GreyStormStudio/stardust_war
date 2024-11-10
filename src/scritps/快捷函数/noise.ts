//懒得搓了,直接copy了keqing的代码
export abstract class Noise {
  public constructor(
    public seed: number,
    public loud: number,
  ) {}
  public abstract getBuff(randomlist:number[],...args: number[]): number
}
export class Noise2D extends Noise {
  public constructor(
    public seed: number,
    public loud: number,
  ) {
    super(seed, loud)
  }
  public smooth(x: number) {
    return (6*x**5-15*x**4+10*x**3)
  }
  public getAroundPosition(x: number, y: number): [x: number, y: number][] {
    let xMin = x
    let xMax = x+1
    let yMin = y
    let yMax = y+1
    if(xMax>127){
      xMax=127
    }
    if(yMax>127){
      yMax=127
    }
    return [
      [xMin, yMax],
      [xMax, yMax],
      [xMin, yMin],
      [xMax, yMin],
    ]
  }
  public getNoise(x: number, y: number,randomlist:number[]) {
    const r = randomlist[x+y*128]
    return (r * 2 - 1) * this.loud
  }
  public getBuff(randomlist:number[],x: number, y: number) {
    const [p1, p2, p3, p4] = this.getAroundPosition(x, y)
    const qR = this.smooth(x - p1[0])
    const qL = 1 - qR
    const qT = this.smooth(y - p4[1])
    const qB = 1 - qT
    const rd_list = randomlist;
    const v1 = this.getNoise(p1[0], p1[1],rd_list)
    const v2 = this.getNoise(p2[0], p2[1],rd_list)
    const v3 = this.getNoise(p3[0], p3[1],rd_list)
    const v4 = this.getNoise(p4[0], p4[1],rd_list)

    return v1 * qL * qT + v2 * qR * qT + v3 * qL * qB + v4 * qR * qB
  }
}
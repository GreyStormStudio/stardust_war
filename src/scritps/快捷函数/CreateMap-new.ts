import { Pos2D } from '../类/泛用类'
import { Noise } from './noise'
export function Constellation(coordinate:Pos2D,size:number){
    const seed = coordinate.x+coordinate.y*256//总宇宙为256*256=65536
    const Map_original =CreateMap(seed,size)
    return Map_original
}
function CreateMap(seed:number,size:number){
    const noise = new Noise(seed)
    
    let map = new Array(size).fill(0).map(() => new Array(size).fill(0));
    for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
            noise.seed(seed);
            map[x][y] = noise.perlin2(x/256,y/256)
        }
    }
    console.log(map)
    return map
}
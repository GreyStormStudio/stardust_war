# Stardust_War(暂时叫这个名字

<p>原汁原味的readme,几乎没有任何更改(:</p>

<details>
<summary>Vue自带的东西</summary>

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

</details>

## 地图
星域大小为**128*128**,即一个星域有**16384**个地块,不同类型的地块会分布在星域内  
其中:  
### 低产地块
修建有自动采集器的低产地块每时刻会产出**1单位**的矿物,舰船在经过该地块时会获得-10%速度的减成  
### 中产地块
修建有自动采集器的中产地块每时刻会产出**2单位**的矿物,舰船在经过该地块时会获得-20%速度的减成  
### 高产地块
修建有自动采集器的高产地块每时刻会产出**4单位**的矿物,舰船在经过该地块时会获得-40%速度的减成  
### 空白地块
空白地块并非意味着该地方什么东西都不会产出,您可以在该位置修建光伏电池来使该地块产出能量  
修建有光伏电池的空白地块每时刻会产出**0.5单位**的能量,这并不会影响舰船的速度  


更多想法还在开发中......


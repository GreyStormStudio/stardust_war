<template>
    <div class="left">
        <!-- 建筑数量和建造 -->
        <div class="building-controls">

        </div>
    </div>
    <div class="map"></div>
    <div class="right">
        <!-- 建筑产出 -->
        <div class="building-output">
            <p>能量:{{ store.energy.toFixed(2) }} +{{ 100 }}</p>
            <p>矿物:{{ store.mineral.toFixed(2) }} +{{ 50 }}</p>
            <p>金属:{{ store.metal.toFixed(2) }} +{{ 1 }}</p>
            <p>坐标: x:{{ info.p.x.toFixed(1) }} y:{{ info.p.y.toFixed(1) }}</p>
            <p>角速度:{{ info.an.v.toFixed(2) }}</p>
            <p>角加速度:{{ info.an.a }}</p>
            <p>速度:{{ ((info.v.x ** 2 + info.v.y ** 2) ** 0.5).toFixed(2) }} 加速度:{{
                ((info.a.x ** 2 + info.a.y ** 2) ** 0.5).toFixed(2) }}</p>
            <p>速度:{{ ((info.v.x ** 2 + info.v.y ** 2) ** 0.5 / 2).toFixed(2) }}% 加速度:{{
                ((info.a.x ** 2 + info.a.y ** 2) ** 0.5 / (40000 / 7750) * 100).toFixed(2) }}%</p>
            <p>极限速度: 200 </p>
        </div>
    </div>
</template>
<script src="../../scripts/constellation.ts"></script>
<style>
body {
    user-select: none;
}

/*.content {
    display: flex;
}*/
.left,
.right {
    height: 100%;
    flex: 1;
    background-color: lightgray;
}

.map {
    flex: 0 0 auto;
    height: 100%;
    aspect-ratio: 1 / 1;
    background-color: lightblue;
    overflow: hidden;
}
</style>
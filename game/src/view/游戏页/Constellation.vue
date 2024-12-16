<template>
    <!-- <div class="left">
        <p>能量:<span class="number" style="width: 100px;">{{ Number(store.energy).toFixed(2) }}</span>
            <span class="number" style="width: 50px;">+{{ 100 }}</span>
            <span class="number" style="width: 70px;">{{ Number(store.energy / capacity * 100).toFixed(2) }}%</span>
        </p>
        <p>矿物:<span class="number" style="width: 100px;">{{ Number(store.mineral).toFixed(2) }}</span>
            <span class="number" style="width: 50px;">+{{ 50 }}</span>
            <span class="number" style="width: 70px;">{{ Number(store.mineral / capacity * 100).toFixed(2) }}%</span>
        </p>
        <p>金属:<span class="number" style="width: 100px;">{{ Number(store.metal).toFixed(2) }}</span>
            <span class="number" style="width: 50px;">+{{ 1 }}</span>
            <span class="number" style="width: 70px;">{{ Number(store.metal / capacity * 100).toFixed(2) }}%</span>
        </p>
    </div> -->
    <div class="map"></div>
    <!-- <div class="right">
        <p>飞船信息</p>
        <p>坐标:({{ info.position.x.toFixed(2) }},{{ info.position.y.toFixed(2) }})</p>
        <p>速度:{{ ((info.velocity.x ** 2 + info.velocity.y ** 2) ** 0.5).toFixed(3) }}/{{ ((info.velocity.x ** 2 +
            info.velocity.y ** 2) ** 0.5 / (info.thrust ** 0.5) * 100).toFixed(2) }}%</p>
        <p>加速度:{{ ((info.acceleration.x ** 2 + info.acceleration.y ** 2) ** 0.5).toFixed(3) }}/{{ ((info.acceleration.x
            ** 2 + info.acceleration.y ** 2) ** 0.5 / (info.thrust / info.mass) * 100).toFixed(2) }}%</p>
        <p>质量:{{ info.mass.toFixed(0) }}</p>
        <p>最大航速:{{ info.thrust ** 0.5 }}</p>
        <p>所有者:{{ info.label }}</p>
    </div> -->
</template>
<script src="../../scripts/constellation/index.ts"></script>
<style>
body {
    user-select: none;
}

.number {
    text-align: right;
    display: inline-block;
}

/*.left,
.right {
    height: 100%;
    flex: 1;
    background-color: lightgray;
}*/

.map {
    flex: 1;
    height: 100%;
    background-color: lightblue;
    overflow: hidden;
}
</style>
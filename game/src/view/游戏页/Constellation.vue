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
            <p>能量:{{ energystore }} +{{ energyproduce }}</p>
            <p>矿物:{{ mineralstore }} +{{ mineralproduce }}</p>
            <p>金属:{{ metalstore }} +{{ metalproduce }}</p>
        </div>
    </div>
</template>
<script>
</script>
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
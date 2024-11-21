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
<script src="../../scritps/ConstellationMap.ts"></script>
<style>
body{
    user-select:none;
}
/*.content {
    display: flex;
}*/
.left, .right {
    height: 100%;
    flex: 1; /* 占据剩余空间 */
    background-color: lightgray; /* 背景颜色，可以根据需要调整 */
}
.map {
    flex: 0 0 auto; /* 不占据额外空间，只根据内容大小 */
    height: 100%; /* 高度等于父容器的高度 */
    aspect-ratio: 1 / 1; /* 宽度等于父容器的高度（正方形） */
    background-color: lightblue; /* 背景颜色，可以根据需要调整 */
    overflow: hidden;
    }
</style>
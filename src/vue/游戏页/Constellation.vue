<template>
    <div class="left">
        <p>建筑列表</p>
    </div>
    <div class="map"></div>
    <div class="right">
        <p>建筑产出</p>
    </div>
</template>
<script src="../../scritps/ConstellationMap-new.ts"></script>
<style>
body{
    user-select:none;
}
ul{
    margin: auto;
    list-style: none;
}
.content {
    display: flex;
}
.left, .right {
    flex: 1; /* 占据剩余空间 */
    background-color: lightgray; /* 背景颜色，可以根据需要调整 */
}
.map {
    flex: 0 0 auto; /* 不占据额外空间，只根据内容大小 */
    height: 100%; /* 高度等于父容器的高度 */
    width: 80%; /* 宽度等于父容器的高度（正方形） */
    background-color: lightblue; /* 背景颜色，可以根据需要调整 */
    overflow: hidden;
}
</style>
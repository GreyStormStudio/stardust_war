<template>
    <div class="Game">
        <div class="navbar">
            <div class="nav-item" @click="navigateTo('Universe')" :class="{ active: currentSection === 'Universe' }">宇宙</div>
            <div class="nav-item" @click="navigateTo('Constellation')" :class="{ active: currentSection === 'Constellation' }">星域</div>
            <div class="nav-item" @click="navigateTo('Rank')" :class="{ active: currentSection === 'Rank' }">排行</div>
        </div>
        <div class="content">
           <router-view/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Game',
    data() {
        return {
            currentSection: '' // 用于存储当前激活的导航项
        };
    },
    methods: {
        navigateTo(section) {
            this.currentSection = section;
            console.log(`Navigating to ${section}`);
        }
    }
};
</script>

<style scoped>
.Game {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    border: 5px solid #0ca1e1; /* 设置边框颜色 */
}

.navbar {
    display: flex;
    justify-content: flex-start; /* 靠左对齐 */
    background-color: #808080; /* 设置背景颜色 */
    /*padding: 10px;*/
}

.nav-item {
    color: white; /* 设置文字颜色 */
    cursor: pointer;
    margin-right: 0px; /* 设置导航项之间的间距 */
    padding: 10px 30px; /* 设置内边距 */
    height: 100%;
    transition: background-color 0.3s ease; /* 添加过渡效果 */
    box-sizing: border-box;
}

.nav-item:hover, .nav-item.active {
    background-color: #606060; /* 鼠标悬停或激活时的背景颜色 */
}

.content {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>

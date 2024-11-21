<template>
    <div class="Game">
        <div class="navbar">
            <div class="nav-item" @click="navigateTo('Universe')" :class="{ active: currentSection === 'Universe' }">宇宙</div>
            <div class="nav-item" @click="navigateTo('Constellation')" :class="{ active: currentSection === 'Constellation' }">星域</div>
            <div class="nav-item" @click="navigateTo('Technology')" :class="{ active: currentSection === 'Technology' }">科技</div>
            <div class="nav-item" @click="navigateTo('Bonus')" :class="{ active: currentSection === 'Bonus' }">加成</div>
            <div class="nav-item" @click="navigateTo('Rank')" :class="{ active: currentSection === 'Rank' }">排行</div>
            <div class="nav-item player-id" @click="navigateToPlayerInfo">{{ playerName }}</div>
        </div>
        <div class="content">
           <router-view/>
        </div>
    </div>
</template>

<script>
import store from "@/store"
export default {
    
    name: 'Game',
    data() {
        return {
            currentSection: '', // 用于存储当前激活的导航项
        };
    },
    computed:{
        playerName(){
            return this.$store.getters.playerName
        }
    },
    methods: {
        navigateTo(section) {
            this.currentSection = section;
            //console.log(`Navigating to ${section}`);
            if(section=='Universe'){
                this.$router.push('/universe')
            }
            if(section=='Constellation'){
                this.$router.push('/constellation')
            }
            if(section=='Technology'){
                this.$router.push('/technology')
            }
            if(section=='Bonus'){
                this.$router.push('/bonus')
            }
            if(section=='Rank'){
                this.$router.push('/rank')
            }
        },
        navigateToPlayerInfo() {
            this.$router.push('/userinfo')
            //console.log(`Navigating to Player Info for ${this.playerId}`);
        }
    }
};
</script>

<style scoped>
body, html {
    margin: 0;
    height: 100%;
}
.Game {
    display: flex;
    flex-direction: column;
    height: 96vh;
    width: 98vw;
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

.player-id {
    margin-left: auto; /* 将玩家ID移到最右边 */
}
</style>

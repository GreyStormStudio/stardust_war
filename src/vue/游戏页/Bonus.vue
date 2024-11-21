<template>
    <div class="boost-container">
      <div class="boost-item" v-for="boost in boosts" :key="boost.id">
        <h2>{{ boost.name }}</h2>
        <div class="boost-value">
          <span>当前加成: {{ boost.value }}%</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        boosts: [
          { id: 1, name: '能量生产加成', value: 0 },
          { id: 2, name: '矿物生产加成', value: 0 },
          /*{ id: 3, name: '能量武器伤害加成', value: 0 },
          { id: 4, name: '动能武器伤害加成', value: 0 },
          { id: 5, name: '能量武器射速加成', value: 0 },
          { id: 6, name: '动能武器射速加成', value: 0 },*/
        ],
      };
    }
  };
  </script>
  
  <style scoped>
.boost-container {
  display: flex;
  flex-direction: row; /* 修改为行排列 */
  flex-wrap: wrap; /* 允许换行 */
  align-items: flex-start; /* 调整对齐方式 */
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-height: 100%; /* 设置最大高度 */
  overflow-y: auto; /* 超出部分显示滚动条 */
}

.boost-item {
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex: 1 1 300px; /* 设置弹性子项的默认大小和最大大小 */
}

.boost-item h2 {
  margin: 0 0 10px 0;
  color: #333;
}

.boost-value {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.boost-value span {
  font-weight: bold;
}
</style>

  
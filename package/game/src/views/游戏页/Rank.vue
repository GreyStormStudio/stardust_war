<template>
  <div class="app-background">
    <table>
      <thead>
        <tr>
          <th>玩家</th>
          <th>科技</th>
          <th>舰队</th>
          <th>领地</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in sortedList" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.tech }}</td>
          <td>{{ item.fleet }}</td>
          <td>{{ item.territory }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<!-- <script lang="ts">
  import { defineComponent, ref } from 'vue';
  
  interface RankingItem {
    id: number;
    name: string;
    tech: number;
    fleet: number;
    territory: number;
  }
  
  export default defineComponent({
    name: 'Ranking',
    setup() {
      const rankings = ref<RankingItem[]>([
        { id: 1, name: '田所浩二', tech: 90, fleet: 85, territory: 78 },
        { id: 2, name: '日川岗阪', tech: 85, fleet: 90, territory: 88 },
        { id: 3, name: '梅川库刹', tech: 80, fleet: 80, territory: 90 },
      ]);
      return {
        sortedList: rankings,
      };
    },
  });
  </script> -->

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface RankingItem {
  id: number;
  name: string;
  tech: number;
  fleet: number;
  territory: number;
}

export default defineComponent({
  name: 'Ranking',
  setup() {
    const sortedList = ref<RankingItem[]>([]);

    // 在组件挂载后获取数据
    onMounted(() => {

    });

    return {
      sortedList
    };
  },
});
</script>

<style scoped>
.app-background {
  top: 0;
  left: 0;
  background-image: url('/public/背景/bg5.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
}

table {
  background: linear-gradient(to bottom, rgba(128, 128, 128, 0.5), rgba(255, 255, 255, 0.5));
  width: 800px;
  margin: auto;
  height: auto;
  border-collapse: collapse;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  text-align: center;
}

th {
  cursor: pointer;
}
</style>
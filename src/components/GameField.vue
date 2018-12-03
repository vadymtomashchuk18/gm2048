<template>
  <div class="game-container">
    <div class="board shadow-border">
      <div v-for="(c, index) in board" :key="index">
        <!-- {{c.value}} -->
        <Cell />
      </div>
    </div>

  </div>
</template>

<script>
import Cell from './Cell.vue';

export default {
  name: 'GameField',
  components: { Cell },
  props: {
  },
  data() {
    return {
      board: [],
    };
  },
  mounted() {
    this.resetBoard();
  },
  methods: {
    resetBoard() {
      this.board = Array(16).map((_, index) => ({
        cell: {
          id: index,
          value: 0,
        },
      }));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.board {
  display: flex;
  flex-wrap: wrap;
  width: 23em;
  padding: 6px;
  border-radius: 6px;
  background-color: rgba(58, 41, 76, 0.5);
}
.shadow-board {
  position: absolute;
  height: 368px;
  background-color: initial;
}

.cell {
  font-size: 24px;
  font-weight: bold;
  background-color: rgb(194, 194, 194);
  color: rgb(210, 248, 201);
  box-sizing: border-box;
  display: flex;
  margin: 6px;
  justify-content: center;
  align-items: center;

  display: flex;
  justify-content: space-around;
  align-items: center;
  /* border: 4px solid #666; */
  border-radius: 4px;
  width: 80px;
  height: 80px;
}
</style>

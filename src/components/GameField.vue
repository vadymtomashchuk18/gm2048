<template>
  <div class="game-container">
    <!-- <Cell v-for="(cell, index) in this.board" :cell="cell" :key="index" /> -->
    <div class="board shadow-border">
      <div v-for="(c, index) in this.board" :key="index">
        <!-- {{c.value}} -->
        <Cell :cell="c"/>
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
  created() {
    this.resetBoard();
  },
  methods: {
    resetBoard() {
      this.board = Array(16).fill({ value: 0 });
      console.log('LOSHARARARARARARARARARARAR');
      console.log(this.board[4].value);
      console.log('LOSHARARARARARARARARARARAR');
    },
    generateNum() {
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.game-container {
  display: flex;
  justify-content: center;
}
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

// .cell {
//   font-size: 24px;
//   font-weight: bold;
//   background-color: rgb(194, 194, 194);
//   color: rgb(255, 255, 255);
//   box-sizing: border-box;
//   display: flex;
//   margin: 6px;
//   justify-content: center;
//   align-items: center;

//   display: flex;
//   justify-content: space-around;
//   align-items: center;
//   /* border: 4px solid #666; */
//   border-radius: 4px;
//   width: 80px;
//   height: 80px;
// }
</style>

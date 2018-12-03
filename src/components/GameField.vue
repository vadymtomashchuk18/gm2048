<template>
  <div class="game-container">
    <!-- <Cell v-for="(cell, index) in this.board" :cell="cell" :key="index" /> -->
    <div class="board shadow-border">
    <Cell v-for="(cell, index) in this.board" :cell="cell" :key="index" />
      <!-- <div v-for="(c, index) in this.board" :key="index">
        {{c.value}}
        <Cell :cell="c"/>
      </div> -->
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
    // this.resetBoard();
    this.newGame();
  },
  computed: {
    checkGameOver() {
      for (let i = 0; i < this.board.length; i += 1) {
        if (this.board[i].value === 0) { return false; }
      }
      return true;
    },
  },
  methods: {
    // generate number on free cell
    generateNum() {
      if (this.checkGameOver) { return; }

      const getRandomCell = () => {
        const getRandomPosition = Math.floor(Math.random() * this.board.length);
        return getRandomPosition;
      };
      let randomCell = getRandomCell();
      while (this.board[randomCell].value !== 0) {
        randomCell = getRandomCell();
        // console.log('Try to find ', randomCell);
      }
      // Generate 2 or 4
      // const twoOrFour = (Math.floor(Math.random() * 2) + 1) * 2;
      this.board[randomCell].value = (Math.floor(Math.random() * 2) + 1) * 2;
    },
    newGame() {
      this.resetBoard();
      this.generateNum();
      this.generateNum();
    },
    resetBoard() {
      this.board = Array(16);
      for (let i = 0; i < this.board.length; i += 1) {
        this.board[i] = { value: 0 };
      }
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

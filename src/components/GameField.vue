<template>
  <div class="game-container">

    <div class="board shadow-border">
      <div v-for="(c, index) in this.board" :key="index">
        <!-- {{c.value}} -->
        <Cell :cell="c" :actValue="c.value"></Cell>
      </div>
      <transition name="fade">
        <div v-if="checkGameOver" class="modal">
          <h1>Game Over!</h1>
          <a class="button button-black" @click="newGame()">Try again</a>
        </div>
      </transition>
    </div>
    <div class="column-buttons">
      <button class="menu-but" @click="newGame();">New Game</button>
      <button class="menu-but" @click="saveGame();">Save game</button>
      <button v-if="!emptyStorage" class="menu-but" @click="resumeGame();">Resume Game</button>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-param-reassign */
// import chunk from 'chunk';
import Cell from './Cell.vue';
import movesMixins from '../mixins/moves-mixins';

export default {
  name: 'GameField',
  components: { Cell },
  props: {},
  data() {
    return {
      board: [],
      gameOver: false,
      slided: false,
      emptyStorage: true,
      mergeAnimationsList: [],
      slideAnimationsList: [],
      mergeGameStateList: [],
      slideGameStateList: [],
    };
  },
  mixins: [movesMixins],
  mounted() {
    this.setupBoard();
  },
  computed: {
    checkGameOver() {
      for (let i = 0; i < this.board.length; i += 1) {
        if (this.board[i].value === 0) {
          return false;
        }
      }
      // console.log('============== gameOver ===============');
      return true;
    },
    savedBoard() {
      return this.$store.state.board;
    },
  },
  methods: {
    checkGameState() {
      this.moveUp('gamestate');
      this.moveDown('gamestate');
      this.moveLeft('gamestate');
      this.moveRight('gamestate');
      if (
        !this.mergeGameStateList.length > 0
        || !this.slideGameStateList.length > 0
      ) {
        this.gameOver = true;
      }
      this.mergeGameStateList = [];
      this.slideGameStateList = [];
    },
    setupBoard() {
      this.newGame();
      this.registerControl();
    },
    // generate number on free cell
    generateNum() {
      if (this.checkGameOver) {
        return;
      }

      const getRandomCell = () => {
        const getRandomPosition = Math.floor(Math.random() * this.board.length);
        return getRandomPosition;
      };
      let randomCell = getRandomCell();
      while (this.board[randomCell].value !== 0) {
        randomCell = getRandomCell();
      }
      // Generate 2 or 4
      // this.board[randomCell].value = (Math.floor(Math.random() * 2) + 1) * 2;
      this.board[randomCell].value = Math.random() < 0.9 ? 2 : 4;
    },
    newGame() {
      this.resetBoard();
      this.generateNum();
      this.generateNum();
      this.gameOver = false;
    },
    saveGame() {
      localStorage.setItem('boardD', JSON.stringify(this.board));
      this.emptyStorage = false;
    },
    resumeGame() {
      const svBoard = JSON.parse(localStorage.getItem('boardD'));
      this.board = svBoard;
      localStorage.clear();
      this.emptyStorage = true;
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
.cell {
  font-size: 26px;
  font-weight: bold;
  /* background-color: #613c1a; */
  color: #ffffff;
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
.menu-but {
  font-size: 18px;
  font-weight: bold;
  color: white;
  width: 150px;
  height: 60px;
  margin: 10px;
  display: block;
  border-radius: 7px;
  background-color: teal;
  cursor: pointer;
}
.modal {
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: rgba(254, 253, 251, 0.5);
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 99999;
}
.button-black {
  font-size: 20px;
  width: 150px;
  height: 60px;
  padding-top: 20px;
  border-radius: 6px;
  text-align: center;
  color: white;
  background-color: #1E1E12;
  border: 1px solid #1E1E12;
  cursor: pointer;
}
.button-black:hover {
  background-color: rgb(39, 39, 15);
  color: white;
}
</style>

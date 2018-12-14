/* eslint-disable no-param-reassign */
import chunk from 'chunk';

export default {
  methods: {
    // =================== Moving Logic ===================
    animate() {
      const boardDidChange = this.mergeGameStateList.length > 0
                || this.slideGameStateList.length > 0;

      if (boardDidChange) {
        setTimeout(() => {
          this.generateNum();
          // save to persisted state
          this.$store.commit('saveGameBoard', this.board);
        }, 100);
      }
    },

    getChangeLists(type) {
      const changeLists = {};
      if (type === 'gamestate') {
        changeLists.merge = this.mergeGameStateList;
        changeLists.slide = this.slideGameStateList;
      }
      return changeLists;
    },

    // rotate matrix by 90 degrees
    rotateMatrixToTheRight(matrix) {
      // reverse the rows
      matrix = matrix.reverse();
      // swap the symmetric elements
      for (let i = 0; i < matrix.length; i += 1) {
        for (let j = 0; j < i; j += 1) {
          const temp = matrix[i][j];
          matrix[i][j] = matrix[j][i];
          matrix[j][i] = temp;
        }
      }
      return matrix;
    },

    // rotate matrix by 270 degrees
    rotateMatrixToTheLeft(matrix) {
      // reverse the individual rows
      matrix = matrix.map(row => row.reverse());
      // swap the symmetric elements
      for (let i = 0; i < matrix.length; i += 1) {
        for (let j = 0; j < i; j += 1) {
          const temp = matrix[i][j];
          matrix[i][j] = matrix[j][i];
          matrix[j][i] = temp;
        }
      }
      return matrix;
    },

    move(key) {
      const board = chunk(this.board, 4);
      if (key === 39) {
        // right
        this.moveRight('gamestate', board);
      } else if (key === 37) {
        // left
        this.rotateMatrixToTheRight(board);
        this.rotateMatrixToTheRight(board);
        this.moveRight('gamestate', board);
        this.rotateMatrixToTheRight(board);
        this.rotateMatrixToTheRight(board);
      } else if (key === 38) {
        // up
        this.rotateMatrixToTheRight(board);
        this.moveRight('gamestate', board);
        this.rotateMatrixToTheLeft(board);
      } else if (key === 40) {
        // down
        this.rotateMatrixToTheLeft(board);
        this.moveRight('gamestate', board);
        this.rotateMatrixToTheRight(board);
      }
      this.board = board.reduce((flat, current) => flat.concat(current), []);
      if (this.slided) {
        this.animate();
        this.slided = false;
      }
    },

    moveRight(type, board) {
      const changeLists = this.getChangeLists(type);
      for (let a = 0; a < board.length; a += 1) {
        this.mergeRight(board, a, changeLists);
        this.slideRight(board, a, changeLists);
      }
    },

    mergeRight(board, a, changeLists) {
      let i = board.length - 2;
      let j = board.length - 1;

      // updated all the possible merge values
      // think of i, j  pointers in the board
      // if they become separate, the pointers will try from catch up
      while (i >= 0) {
        if (board[a][i].value === 0 && board[a][j].value === 0) {
          // if both elements are zero
          j -= 1;
          i -= 1;
        } else if (board[a][i].value === board[a][j].value) {
          // if two elements have same value
          changeLists.merge.push({ from: a * 4 + i, to: a * 4 + j });

          board[a][j].value = board[a][i].value + board[a][j].value;
          board[a][i].value = 0;
          j -= 1;
          i -= 1;
          this.slided = true;
        } else if (board[a][j].value === 0) {
          // if the right most has 0
          j -= 1;
          i -= 1;
        } else if (
          board[a][i].value !== 0
                    && board[a][j].value !== 0
                    && i + 1 === j
        ) {
          // if both are non zero and next from each other
          j -= 1;
          i -= 1;
        } else if (board[a][i].value !== 0 && board[a][j].value !== 0) {
          // if both are non zero and not next from each other
          j -= 1;
          this.slided = true;
        } else if (board[a][i].value === 0) {
          // if the left most element is zero
          i -= 1;
        }
      }
    },

    slideRight(board, a, changeLists) {
      let k = board.length - 2;
      let l = board.length - 1;
      while (k >= 0) {
        if (board[a][l].value !== 0) {
          // if right most element is 0
          l -= 1;
          k -= 1;
        } else if (board[a][l].value !== 0 && board[a][k].value !== 0) {
          // if right most and left most elements are not 0
          l -= 1;
          k -= 1;
          this.slided = true;
        } else if (board[a][l].value === 0 && board[a][k].value === 0) {
          // if right most and left most elements are 0
          k -= 1;
          // this.slided = true;
        } else if (board[a][l].value === 0 && board[a][k].value !== 0) {
          // if right most element is 0 and left most element is not 0
          changeLists.slide.push({ from: a * 4 + k, to: a * 4 + l });

          board[a][l].value = board[a][k].value + board[a][l].value;
          board[a][k].value = 0;
          l -= 1;
          k -= 1;
          this.slided = true;
        }
      }
    },

    registerControl() {
      // const validKeyCodes = [39, 37, 38, 40];
      document.addEventListener('keydown', (event) => {
        const key = event.keyCode;
        if (key >= 37 && key <= 40) {
          this.move(key);
        }
      });
    },

  },
};

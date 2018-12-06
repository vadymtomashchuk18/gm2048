
const chunk = require('chunk');

export default {
  methods: {
    animate() {
      const boardDidChange = this.mergeGameStateList.length > 0
        || this.slideGameStateList.length > 0;

      if (boardDidChange) {
        setTimeout(() => {
          this.generateNum();
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

    moveRight(type) {
      const changeLists = this.getChangeLists(type);

      // console.log(chunk(this.board, 4));
      const board = chunk(this.board, 4);
      for (let a = 0; a < board.length; a += 1) {
        this.mergeRight(board, a, changeLists);
        this.slideRight(board, a, changeLists);
      }

      this.board = (board.reduce((flat, current) => flat.concat(current), []));
      // console.log('After', this.board);
      // this.generateNum();
    },

    mergeRight(board, a, changeLists) {
      let i = board.length - 2;
      let j = board.length - 1;

      // updated all the possible merge values
      // think of i, j  pointers in the board
      // if they become separate, the pointers will try from catch up
      while (i >= 0) {
        if (board[a][i].value === 0 && board[a][j].value === 0) { // if both elements are zero
          j -= 1;
          i -= 1;
        } else if (board[a][i].value === board[a][j].value) { // if two elements have same value
          changeLists.merge.push({ from: (a * 4 + i), to: (a * 4 + j) });

          board[a][j].value = board[a][i].value + board[a][j].value;
          board[a][i].value = 0;
          j -= 1;
          i -= 1;
        } else if (board[a][j].value === 0) { // if the right most has 0
          j -= 1;
          i -= 1;
        } else if (board[a][i].value !== 0
          && board[a][j].value !== 0
          && (i + 1 === j)) { // if both are non zero and next from each other
          j -= 1;
          i -= 1;
        } else if (board[a][i].value !== 0
          && board[a][j].value !== 0) { // if both are non zero and not next from each other
          j -= 1;
        } else if (board[a][i].value === 0) { // if the left most element is zero
          i -= 1;
        }
      }
    },

    slideRight(board, a, changeLists) {
      let k = board.length - 2;
      let l = board.length - 1;
      while (k >= 0) {
        if (board[a][l].value !== 0) { // if right most element is 0
          l -= 1;
          k -= 1;
        } else if (board[a][l].value !== 0
          && board[a][k].value !== 0) { // if right most and left most elements are not 0
          l -= 1;
          k -= 1;
        } else if (board[a][l].value === 0
          && board[a][k].value === 0) { // if right most and left most elements are 0
          k -= 1;
        } else if (board[a][l].value === 0
          && board[a][k].value !== 0) { // if right most element is 0 and left most element is not 0
          changeLists.slide.push({ from: (a * 4 + k), to: (a * 4 + l) });

          board[a][l].value = board[a][k].value + board[a][l].value;
          board[a][k].value = 0;
          l -= 1;
          k -= 1;
        }
      }
    },

    moveLeft(type) {
      const changeLists = this.getChangeLists(type);

      const board = chunk(this.board, 4);
      // console.log('Before', board);
      for (let a = 0; a < board.length; a += 1) {
        this.mergeLeft(board, a, changeLists);
        this.slideLeft(board, a, changeLists);
      }
      this.board = (board.reduce((flat, current) => flat.concat(current), []));
      // console.log('After', this.board);
      // this.generateNum();
    },

    mergeLeft(board, a, changeLists) {
      let i = 1;
      let j = 0;

      while (i < board.length) {
        if (board[a][i].value === 0 && board[a][j].value === 0) {
          j += 1;
          i += 1;
        } else if (board[a][i].value === board[a][j].value) { // if two elements have same value
          changeLists.merge.push({ from: (a * 4 + i), to: (a * 4 + j) });

          board[a][j].value = board[a][i].value + board[a][j].value;
          board[a][i].value = 0;
          j += 1;
          i += 1;
        } else if (board[a][j].value === 0) { // if the left most ele has 0
          j += 1;
          i += 1;
        } else if (board[a][i].value !== 0
          && board[a][j].value !== 0
          && (i - 1 === j)) { // if both are non zero and next from each other
          j += 1;
          i += 1;
        } else if (board[a][i].value !== 0
          && board[a][j].value !== 0) { // if both are non zero and not next from each other
          j += 1;
        } else if (board[a][i].value === 0) { // if the right most ele has 0
          i += 1;
        }
      }
    },

    slideLeft(board, a, changeLists) {
      let k = 1;
      let l = 0;
      while (k < board.length) {
        if (board[a][l].value !== 0) { // if left most element is 0
          l += 1;
          k += 1;
        } else if (board[a][l].value !== 0
          && board[a][k].value !== 0) { // if left most and right most elements are not 0
          l += 1;
          k += 1;
        } else if (board[a][l].value === 0
          && board[a][k].value === 0) { // if left most and right most elements are 0
          k += 1;
        } else if (board[a][l].value === 0
          && board[a][k].value !== 0) { // if left most element is 0 and right most element is not 0
          changeLists.slide.push({ from: (a * 4 + k), to: (a * 4 + l) });

          board[a][l].value = board[a][k].value + board[a][l].value;
          board[a][k].value = 0;
          l += 1;
          k += 1;
        }
      }
    },

    moveDown(type) {
      const changeLists = this.getChangeLists(type);

      const board = (chunk(this.board, 4));
      for (let a = 0; a < board.length; a += 1) {
        this.mergeDown(board, a, changeLists);
        this.slideDown(board, a, changeLists);
      }
      this.board = (board.reduce((flat, current) => flat.concat(current), []));
      // console.log('After', this.board);
      // this.generateNum();
    },

    mergeDown(board, a, changeLists) {
      let i = board.length - 2;
      let j = board.length - 1;

      while (i >= 0) {
        if (board[i][a].value === 0 && board[j][a].value === 0) {
          j -= 1;
          i -= 1;
        } else if (board[i][a].value === board[j][a].value) {
          changeLists.merge.push({ from: (i * 4 + a), to: (j * 4 + a) });

          board[j][a].value = board[i][a].value + board[j][a].value;
          board[i][a].value = 0;
          j -= 1;
          i -= 1;
        } else if (board[j][a].value === 0) {
          j -= 1;
          i -= 1;
        } else if (board[i][a].value !== 0 && board[j][a].value !== 0 && (i + 1 === j)) {
          j -= 1;
          i -= 1;
        } else if (board[i][a].value !== 0 && board[j][a].value !== 0) {
          j -= 1;
        } else if (board[i][a].value === 0) {
          i -= 1;
        }
      }
    },

    slideDown(board, a, changeLists) {
      let k = board.length - 2;
      let l = board.length - 1;
      while (k >= 0) {
        if (board[l][a].value !== 0) { // if botfromm most element is 0
          l -= 1;
          k -= 1;
        } else if (board[l][a].value !== 0
          && board[k][a].value !== 0) { // if botfromm most and fromp most elements are not 0
          l -= 1;
          k -= 1;
        } else if (board[l][a].value === 0
          && board[k][a].value === 0) { // if botfromm most and fromp most elements are 0
          k -= 1;
        } else if (board[l][a].value === 0 && board[k][a].value !== 0) {
          // if botfromm most element is 0 and fromp most element is not 0
          changeLists.slide.push({ from: (k * 4 + a), to: (l * 4 + a) });

          board[l][a].value = board[k][a].value + board[l][a].value;
          board[k][a].value = 0;
          l -= 1;
          k -= 1;
        }
      }
    },

    moveUp(type) {
      const changeLists = this.getChangeLists(type);

      const board = chunk(this.board, 4);
      for (let a = 0; a < board.length; a += 1) {
        this.mergeUp(board, a, changeLists);
        this.slideUp(board, a, changeLists);
      }
      this.board = (board.reduce((flat, current) => flat.concat(current), []));
      // console.log('After', this.board);
      // this.generateNum();
    },

    mergeUp(board, a, changeLists) {
      let i = 1;
      let j = 0;
      while (i < board.length) {
        if (board[i][a].value === 0 && board[j][a].value === 0) {
          j += 1;
          i += 1;
        } else if (board[i][a].value === board[j][a].value) {
          changeLists.merge.push({ from: (i * 4 + a), to: (j * 4 + a) }); // add animation data

          board[j][a].value = board[i][a].value + board[j][a].value;
          board[i][a].value = 0;
          j += 1;
          i += 1;
        } else if (board[j][a].value === 0) {
          j += 1;
          i += 1;
        } else if (board[i][a].value !== 0 && board[j][a].value !== 0 && (i - 1 === j)) {
          j += 1;
          i += 1;
        } else if (board[i][a].value !== 0 && board[j][a].value !== 0) {
          j += 1;
        } else if (board[i][a].value === 0) {
          i += 1;
        }
      }
    },

    slideUp(board, a, changeLists) {
      let k = 1;
      let l = 0;
      while (k < board.length) {
        if (board[l][a].value !== 0) { // if fromp most element is 0
          l += 1;
          k += 1;
        } else if (board[l][a].value !== 0
          && board[k][a].value !== 0) { // if fromp most and botfromm most elements are not 0
          l += 1;
          k += 1;
        } else if (board[l][a].value === 0
          && board[k][a].value === 0) { // if fromp most and botfromm most elements are 0
          k += 1;
        } else if (board[l][a].value === 0 && board[k][a].value !== 0) {
          // if fromp most element is 0 and botfromm most element is not 0
          changeLists.slide.push({ from: (k * 4 + a), to: (l * 4 + a) }); // add animation data

          board[l][a].value = board[k][a].value + board[l][a].value;
          board[k][a].value = 0;
          l += 1;
          k += 1;
        }
      }
    },

    registerControl() {
      // const validKeyCodes = [39, 37, 38, 40];
      document.addEventListener('keydown', (event) => {
        const key = event.keyCode;
        // console.log(key);
        // if (_.includes(validKeyCodes, key)) {
        if (key >= 37 && key <= 40) {
          if (key === 39) {
            // right
            this.moveRight('gamestate');
          } else if (key === 37) {
            // left
            this.moveLeft('gamestate');
          } else if (key === 38) {
            // up
            this.moveUp('gamestate');
          } else if (key === 40) {
            // down
            this.moveDown('gamestate');
          }
          this.animate();
        }
      });
    },
  },
};

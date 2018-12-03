<template>
  <div class="cell" :class="{'tile-empty': emptyTile}" :style="{backgroundColor: backgroundColor}">
    {{ displayValue }}
  </div>
</template>

<script>
export default {
  name: 'Cell',
  props: {
    cell: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors: [
        '#c2c2c2',
        '#c7a2a2',
        '#eb8787',
        '#f05757',
        '#cf2424',
        '#9b2222',
        '#661e1e',
        '#3d0909',
        '#3a1004',
        '#86260c',
        '#be4726',
        '#ff7b00',
        '#a55000',
        '#613c1a',
      ],
    };
  },
  computed: {
    value() {
      return this.cell.value;
    },
    displayValue() {
      if (this.value > 0) { return this.value; }
      return null;
    },
    emptyTile() {
      return this.displayValue === null;
    },
    backgroundColor() {
      return this.colors[this.value.toString(2).length - 1];
    },
  },
};

</script>

<style scoped>
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
</style>

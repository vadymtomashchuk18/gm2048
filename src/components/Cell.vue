<template>
  <div class="cell" :class="{'tile-empty': emptyTile}">
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
  },
};

</script>

<style scoped>
.cell {
  font-size: 26px;
  font-weight: bold;
  background-color: rgb(194, 194, 194);
  color: rgb(255, 255, 255);
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

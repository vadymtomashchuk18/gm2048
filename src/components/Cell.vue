<template>
  <div class="cell">8192</div>
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
};

</script>

<style scoped>
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

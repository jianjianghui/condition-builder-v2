<template>
  <div class="condition-item">
    {{ condition }}
    <div>删除</div>
  </div>
</template>

<script>
export default {
  name: "ConditionItem",
  props: {
    condition: {
      type: Object,
      require: true
    }
  }
}
</script>

<style scoped>
.condition-item {
    display: flex;
    padding: 1rem;
    cursor: all-scroll;
}
</style>

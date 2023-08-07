<template>
  <div class="condition-item">
    <div>拖拽</div>
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
}
</style>

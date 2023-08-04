<template>
  <div id="app">
   <condition-builder style="width: 50vw;margin-top: 20px;margin-left: 20px;"/>
  </div>
</template>

<script>
import ConditionBuilder from "@/components/ConditionBuilder.vue";

export default {
  name: 'App',
  components: {
    ConditionBuilder
  }
}
</script>

<style>
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>

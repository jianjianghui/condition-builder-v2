<template>
  <div id="app">
   <condition-builder  :condition="condition" :dev="true" :config="cbConfig" @initCondition="initCondition"  style="width: 50vw;padding-top: 20px;margin-left: 20px;"/>
  </div>
</template>

<script>
import ConditionBuilder from "@/components/condition/ConditionBuilder.vue"

export default {
  name: 'App',
  components: {
    ConditionBuilder
  },
  data() {
    return {
      cbConfig: {
        editModel:'manual',
        language:'js',
        fieldConfig: {
          dateFormat:'millisecondTimestamp'
        }
      },
      condition : null
    }
  },
  methods: {
    initCondition(condition) {
      this.condition = condition
    }
  }
}
</script>

<style>
#app {

  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>

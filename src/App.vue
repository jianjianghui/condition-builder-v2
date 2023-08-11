<template>
  <div id="app">
    <condition-builder :condition="condition" :dev="true" :config="cbConfig" @initCondition="initCondition"
                       style="width: 50vw;padding-top: 20px;margin-left: 20px;"/>
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
        editModel: 'generator',
        // editModel: 'manual',
        language: 'js',
        schema: {
          fields: [
            {
              "name": "text",
              "label": "文本",
              "type": "string",
            },
            {
              "name": "number",
              "label": "数字",
              "type": "number",
            },
            {
              "name": "bool",
              "label": "布尔",
              "type": "bool",
            },
            {
              "name": "select",
              "label": "选择",
              "type": "select",
              "options": [
                {
                  "label": "男",
                  "value": "1"
                },
                {
                  "label": "女",
                  "value": "0"
                }
              ]
            },
            {
              "name": "date",
              "type": "date",
              "label": "日期",
            }
          ]
        },
        fieldConfig: {
          dateFormat: 'millisecondTimestamp'
        }
      },
      condition: null
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

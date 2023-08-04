<template>
  <div>
    <condition-group  v-if="this.editModel === 'generator'" :conditions="conditions">

    </condition-group>
    <div>表达式预览</div>
  </div>
</template>

<script>
import ConditionGroup from "@/components/ConditionGroup.vue";

export default {
  name: "ConditionBuilder",
  components: { ConditionGroup },
  data() {
    return {
      editModel:'generator', // generator、manual
      conditions: {
        id: '11234',
        conjunction: 'or',
        children: [
          // {
          //   id: 'id',
          //   field: 'name',
          //   operation: 'empty',
          // },
          // {
          //   id: 'id',
          //   field: 'age',
          //   operation: 'empty',
          // },
          // {
          //   id: 'id',
          //   field: 'age',
          //   operation: 'equals',
          //   value: 8
          // }
        ]
      }
    }
  },
  methods: {
    /**
     * 测试条件表达式
     * @param item 测试项
     * @return {boolean} 是否通过
     */
    testCondition(item) {
      console.log(item)

    },
    /**
     * 转换为JS表达式
     */
    toJsExpression() {

    },
    /**
     * 解析JS表达式
     */
    parseJsExpression() {

    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div>
    <condition-group ref="conditionGroup" v-if="this.editModel === 'generator'" :conditionGroup="condition"/>
    <div v-if="dev" class="condition-preview">
      <div class="condition-preview-header">
        <div class="condition-preview-header-title">{{
            this.editModel === 'generator' ? '表达式预览' : '编辑表达式'
          }}
        </div>
        <div class="condition-preview-header-btn">
          <a-button v-if="editModel !== 'manual'" type="link" @click="useManual">编辑表达式</a-button>
          <a-button v-if="editModel !== 'generator'" type="link" @click="useGenerator">使用表达式生成器</a-button>
        </div>
      </div>
      <div v-if="editModel === 'generator'" class="condition-preview-body">

      </div>
      <div v-if="editModel === 'manual'" class="condition-manual">
        <a-textarea
            v-model="expression"
            @change="test(testValue,expression)"
            placeholder="例如：stauts === 'success'"
            :auto-size="{ minRows: 3}"
        />
      </div>
    </div>
    <div v-if="dev" class="condition-test">
      <div class="condition-test-header">
        <div class="condition-preview-test-title">测试表达式</div>
        <div class="condition-preview-test-result">
          <div>{{ testResult }}</div>
        </div>
      </div>

      <a-textarea
          v-model="testValue"
          @change="test(testValue,expression)"
          placeholder='输入测试数据(JSONObject)，例如： {"type":"mini","status":"success"}'
          :auto-size="{ minRows: 3}"
      />
    </div>
  </div>
</template>

<script>
import ConditionGroup from "@/components/condition/ConditionGroup.vue"
import { generateSnowflakeId } from '@/components/condition/Utils'

export default {
  name: "ConditionBuilder",
  components: { ConditionGroup },
  props: {
    dev: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object,
      default: () => {
        return {
          language: 'js',
          editModel: 'manual', //'generator' | 'manual'
          schema: null,
          fieldConfig: {
            dateFormat: 'YYYY-MM-DD'
          }
        }
      }
    },
    condition: {
      type: Object
    }
  },
  setup({ config, dev }) {
    if (!dev) {
      // eslint-disable-next-line vue/no-mutating-props
      config.editModel = 'generator'
    }

    return { language: config.language, schema: config.schema, fieldConfig: config.fieldConfig }
  },
  data() {
    return {
      expression: '',
      testValue: '',
      testResult: '',
    }
  },
  computed: {
    editModel() {
      return this.config.editModel
    }
  },
  created() {
    if (!this.condition) {
      /*
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
       */

      this.$emit('initCondition', {
        id: generateSnowflakeId(),
        conjunction: 'or',
        children: []

      })
    }

  },
  mounted() {
    if (this.dev && this.language !== 'js') {
      alert('编辑以及测试表达式仅支持JS语言')
    }
    window.builder = this
  },
  methods: {
    useManual() {
      // eslint-disable-next-line vue/no-mutating-props
      this.config.editModel = 'manual'
    },
    useGenerator() {
      if (!this.checkSupport(this.expression)) {
        this.$confirm({
          title: '放弃更改',
          content: '当前表达式不受表达式生成器支持，将丢弃当前表达式',
          okText: '放弃更改',
          cancelText: '取消',
          onOk: () => {
            console.log(this)
            this.expression = this.toJsExpression()
            // eslint-disable-next-line vue/no-mutating-props
            this.config.editModel = 'generator'
          },
          onCancel() {

          },
        })
        return
      }

      // eslint-disable-next-line vue/no-mutating-props
      this.config.editModel = 'generator'
      console.log('当前表达式不受表达式生成器支持，将丢弃当前表达式')
    },
    test(text, expression) {
      if (!text) {
        return
      }
      try {
        let item = JSON.parse(text)
        try {
          let isTrue = this.testCondition(item, expression)
          if (isTrue !== true && isTrue !== false) {
            throw '返回结果必须为true或false'
          }
          this.testResult = isTrue ? '条件满足' : '条件不满足'
        } catch (e) {
          this.testResult = '表达式错误：' + e
        }
      } catch (e) {
        this.testResult = '非JSON格式'
      }
    },
    /**
     * 测试条件表达式
     * @param item 测试项
     * @param expression 表达式
     * @return {boolean} 是否通过
     */
    testCondition(item, expression) {
      console.log(item,expression)
      const expressionFn = new Function(Object.keys(item), 'return ' + expression)
      return expressionFn(...Object.values(item))
    },
    /**
     * 转换为JS表达式
     */
    toJsExpression(condition) {
      return ''
    },
    /**
     * 解析该表达式是否支持
     * @param expression
     * @return {boolean}
     */
    checkSupport(expression) {
      return false
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
.condition-preview, .condition-test {
    margin-top: 2rem;
    position: relative;
    margin-bottom: 2rem;
}

.condition-preview-header, .condition-test-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
}


.condition-preview-header-btn, .condition-test-header-btn {
    display: flex;
    height: auto;
}

.condition-preview-body {
    padding: 1rem;
    background-color: #f8f8f8;
}
</style>

<template>
  <div class="condition-item">
    <a-select :style="conditionRef.field ? {width:'auto'}:{width:'8rem'}" @change="handleFieldChange"
              class="condition-item-select"
              show-search
              :filter-option="filterFieldOption"
              placeholder="请选择字段">
      <a-select-option v-for="item of schema.fields" :value="item.name" :key="item.value">{{item.label}}</a-select-option>
    </a-select>
    <a-select v-if="conditionRef.field" v-model="conditionRef.operation"
              class="condition-item-select"
              :style="conditionRef.operation ? {width:'auto'}:{width:'8rem'}"
              @change="handleOperationChange"
              placeholder="请选择操作">
      <a-select-option v-for="(value,key) of operations" :value="key" :key="key">{{value.label}}</a-select-option>
    </a-select>
    <template>

    </template>
    <a-button icon="delete" type="link" class="condition-item-delete-btn" @click="remove"/>
  </div>
</template>

<script>
import { SUPPORT_TYPE_OPERATORS } from "@/components/condition/Utils"

export default {
  name: "ConditionItem",
  props: {
    condition: {
      type: Object,
      require: true
    },
    parentConditionGroup: {
      type: Object
    },
    schema: {
      type: Object
    }
  },
  setup({condition}) {
    return {conditionRef:condition}
  },
  data() {
    return {
      cache: {},
      operations: {},
      formControls : []
    }
  },
  computed: {
    fromSelectNum() {
      return this.formControls.filter(item => item.type !== 'template').length
    },
    schemaMap() {
      const schema = this.schema
      const schemaMap = {}
      schema?.fields.forEach((field)=>{
        schemaMap[field.name] = field
      })
      return schemaMap
    }
  },
  methods: {
    filterFieldOption(input, option) {
      const value = option.componentOptions.propsData.value
      const field = this.schemaMap[value]
      let hit = false
      if(field && (field.name.toLowerCase().indexOf(input) >= 0 || field.label.toLowerCase().indexOf(input) >= 0)) {
        hit = true
      }
      return hit
    },
    handleOperationChange(e) {
      const operation = this.operations[e]
      const form = operation.form
      this.formControls = []
      if(Array.isArray(form)) {
        this.formControls.push(...form)
      } else {
        this.formControls.push({
          type:form
        })
      }
      console.log(operation)
    },
    handleFieldChange(e) {
      const field = this.schemaMap[e]
      this.operations = SUPPORT_TYPE_OPERATORS[field.type]
      this.conditionRef.field = e
      this.conditionRef.operation = undefined
    },
    remove() {
      if (!this.parentConditionGroup) {
        return
      }
      let index = this.parentConditionGroup.children.findIndex(item => item.id === this.condition.id)
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.parentConditionGroup.children.splice(index, 1)
      }

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

.condition-item.error {
    background-color: #ffdcdc;
}

.condition-item-body {
    font-size: 14px;
}

.condition-item:hover .condition-item-delete-btn {
    display: inline-block;
}

.condition-item-delete-btn {
    display: none;
    margin-left: 1rem;
    height: auto;
    font-size: 14px;
    border: none;
}
.condition-item-select {
    margin-right: .5rem;
}
</style>

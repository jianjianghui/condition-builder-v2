<template>
  <div class="condition-group" style="display: flex"
       :class="isHover?'is-hover':''"
       @mouseover.stop="isHover = true"
       @mouseout.stop="isHover = false">
    <div class="condition-group-conjunction">
      <a-button v-if="children.length > 1" class="condition-group-conjunction-arrow" shape="circle"
                :icon="collapse?'up':'down'" size="small" @click="toggleFold"/>
      <a-button class="condition-group-conjunction-btn" type="primary" @click="toggleConjunction">{{
          i18n.conjunction[conditionGroup.conjunction]
        }}
      </a-button>
    </div>
    <div class="condition-group-wrapper" style="flex: 1">
      <template v-if="conditionGroup.children && conditionGroup.children.length">
        <draggable :list="children" v-bind="draggableOptions">
          <transition-group type="transition">
            <div v-for="(element,index) in conditionGroup.children" :key="element.id"
                 v-show="index === 0 || (!collapse && index !== 0)">
                <condition-group v-if="element.conjunction && element.children"
                                 :ref="'sub-group'" class="sub-group"
                                 :conditionGroup="element"
                                 :removable="true" :parent-condition-group="conditionGroup"/>
              <condition-item class="condition-group-wrapper-body" v-else :condition="element"/>
            </div>
          </transition-group>
        </draggable>
      </template>
      <div class="condition-group-wrapper-body" v-else>
        <div class="condition-group-wrapper-body-placeholder">{{ i18n.empty }}</div>
      </div>
      <div v-show="!collapse" class="condition-group-toolbar">
        <a-button class="condition-group-toolbar-btn" type="link" @click="addConditionItem">添加条件</a-button>
        <a-button class="condition-group-toolbar-btn" type="link" @click="addConditionItemGroup">添加条件组</a-button>
        <a-button v-if="removable" class="condition-group-toolbar-btn" type="link" @click="removeConditionItemGroup">
          删除组
        </a-button>
      </div>
      <div v-show="collapse" class="condition-group-collapse">
        <a-divider class="condition-group-collapse-divider"><a-button class="condition-group-collapse-btn" type="link" @click="fold(false)">展开全部<a-icon type="down" /></a-button></a-divider>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable"
import ConditionItem from "@/components/condition/ConditionItem.vue"
import { generateSnowflakeId } from '@/components/condition/Utils'

const zh_CN = {
  empty: '空',
  conjunction: {
    or: '或',
    and: '且'
  }
}

export default {
  name: "ConditionGroup",
  components: { ConditionItem, draggable },
  props: {
    conditionGroup: {
      required: true,
      type: Object
    },
    removable: {
      type: Boolean,
      default: false
    },
    parentConditionGroup: {
      type: Object
    }
  },
  setup({ conditionGroup }) {
    return { children: conditionGroup.children, conditionGroupRef: conditionGroup }
  },
  data() {
    return {
      i18n: zh_CN,
      collapse: false,
      draggableOptions: {
        animation: 200
      },
      isHover: false
    }
  },
  methods: {
    toggleFold() {
      if (this.children.length <= 1) {
        return
      }

      this.collapse = !this.collapse
      for (let i = 0; i < this.children.length; i++) {
        this.$refs["sub-group"].forEach(item=> item.fold(this.collapse))
      }
    },
    fold(isTrue) {
      this.collapse = isTrue
      for (let i = 0; i < this.children.length; i++) {
        this.$refs["sub-group"].forEach(item=> item.fold(isTrue))
      }
    },
    toggleConjunction() {
      let conjunction = this.conditionGroupRef.conjunction
      this.conditionGroupRef.conjunction = conjunction === 'or' ? 'and' : 'or'
    },
    addConditionItem() {
      this.conditionGroupRef.children.push({
        id: generateSnowflakeId(),
      })
    },
    addConditionItemGroup() {
      this.conditionGroupRef.children.push({
        id: generateSnowflakeId(),
        conjunction: 'and',
        children: []
      })
    },
    removeConditionItemGroup() {
      if (!this.parentConditionGroup) {
        return
      }
      let index = this.parentConditionGroup.children.findIndex(item => item.id === this.conditionGroup.id)
      if (index !== -1) {
        // eslint-disable-next-line vue/no-mutating-props
        this.parentConditionGroup.children.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
.condition-group {
    --cb-primary-color: #1890ff;
    --cb-conjunction-square-size: calc(var(--cb-conjunction-fontSize) * 2.13 * var(--cb-conjunction-scale));
    --cb-conjunction-line-width: calc(var(--cb-conjunction-fontSize) * 0.16 * var(--cb-conjunction-scale));
    --cb-conjunction-margin: calc(var(--cb-conjunction-fontSize) * 0.66 * var(--cb-conjunction-scale));
    --cb-conjunction-fontSize: 1rem;
    --cb-conjunction-scale: 1;
}

.condition-group {
    display: flex;
    margin-top: 20px;
}

.condition-group.sub-group:hover {
    cursor: all-scroll;
}
.condition-group.sub-group.is-hover {
    transition: all 0.3s ease;
    border-radius: 15px;
    box-shadow: 0.5px 0.5px 8px 1px #999;
}


.condition-group-conjunction {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-left: var(--cb-conjunction-margin);
    margin-right: var(--cb-conjunction-margin);
}

.condition-group-conjunction::before {
    content: '';
    background-color: var(--cb-primary-color);
    width: var(--cb-conjunction-line-width);
    top: var(--cb-conjunction-margin);
    bottom: var(--cb-conjunction-margin);
    position: absolute;
    z-index: -1;
}

.condition-group-conjunction-arrow {
    position: absolute;
    top: 0.5rem;
}

.condition-group-conjunction-btn {
    font-size: var(--cb-conjunction-fontSize);
    padding-top: var(--cb-conjunction-margin);
    padding: 0;
    height: var(--cb-conjunction-square-size);
    width: var(--cb-conjunction-square-size);
}

.condition-group-wrapper-body {
    margin-top: 0.5rem;
    background-color: #f8f8f8;
    margin-bottom: 0.5rem;
    width: calc(100% - 0.5rem);
}

.condition-group-wrapper-body-placeholder {
    color: #999;
    padding: 1rem;
}

.condition-group-toolbar {
    display: flex;
}

.condition-group-toolbar-btn:not(:last-child) {
    margin-right: 0.5rem;
}

.condition-group-collapse-divider {
  margin: 0;
}

.condition-group-collapse-btn {
  font-size: 12px;
}
</style>

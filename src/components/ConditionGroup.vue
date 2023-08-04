<template>
  <div class="condition-group" style="display: flex">
    <div class="condition-group-conjunction">
      <a-button class="condition-group-conjunction-btn" type="primary">{{
          i18n.conjunction[conditions.conjunction]
        }}
      </a-button>
    </div>
    <div class="condition-group-wrapper" style="flex: 1">
      <template v-if="conditions.children && conditions.children.length">
        <draggable>
          <transition-group>
            <div v-for="element in conditions.children" :key="element.id">
              <condition-group v-if="element.conjunction && element.children" :conditions="element"/>

              <condition-item class="condition-group-wrapper-body" v-else :condition="element"/>
            </div>
          </transition-group>
        </draggable>
      </template>
      <div class="condition-group-wrapper-body" v-else>
        <div class="condition-group-wrapper-body-placeholder">{{ i18n.empty }}</div>
      </div>
      <div class="condition-group-toolbar">
        <a-button class="condition-group-toolbar-btn" type="link" @click="addConditionItem">添加条件</a-button>
        <a-button class="condition-group-toolbar-btn" type="link" @click="addConditionItemGroup">添加条件组</a-button>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import ConditionItem from "@/components/ConditionItem.vue";

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
    conditions: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      i18n: zh_CN
    }
  },
  methods: {
    addConditionItem() {
      // eslint-disable-next-line vue/no-mutating-props
      this.conditions.children.push({
        id: '',
      })

    },
    addConditionItemGroup() {
      // eslint-disable-next-line vue/no-mutating-props
      this.conditions.children.push({
        id: '',
        conjunction: 'or',
        children: []
      })

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

}

.condition-group-conjunction {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
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

.condition-group-conjunction-btn {
    font-size: var(--cb-conjunction-fontSize);
    padding: 0;
    height: var(--cb-conjunction-square-size);
    width: var(--cb-conjunction-square-size);
}

.condition-group-wrapper-body {
    background-color: #f8f8f8;
    margin-bottom: 0.5rem;
}

.condition-group-wrapper-body-placeholder {
    color: #999;
    padding: 1rem;
}

.condition-group-toolbar {
    display: flex;
}

.condition-group-toolbar-btn:not(:last-child) {
    margin-right: 1rem;
}
</style>

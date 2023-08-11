export function generateSnowflakeId() {
  const timestamp = Date.now().toString(16).padStart(13, '0')
  const randomChars = Math.random().toString(36).substring(2, 10)

  return timestamp + randomChars
}


export const SUPPORT_TYPE_OPERATORS = {
  "string": {
    "equals": { "label": "等于", "form": "input" },
    "notEquals": { "label": "不等于", "form": "input" },
    "empty": { "label": "为空" },
    "notEmpty": { "label": "不为空" },
    "contains": { "label": "模糊匹配", "form": "input" },
    "notContains": { "label": "不匹配", "form": "input" },
    "startsWith": { "label": "匹配开头", "form": "input" },
    "endsWith": { "label": "匹配结尾", "form": "input" }
  },
  "number": {
    "equals": { "label": "等于", "form": "inputNumber" },
    "notEquals": { "label": "不等于", "form": "inputNumber" },
    "empty": { "label": "为空" },
    "notEmpty": { "label": "不为空" },
    "less": { "label": "小于", "form": "inputNumber" },
    "lessEqual": { "label": "小于或等于", "form": "inputNumber" },
    "greater": { "label": "大于", "form": "inputNumber" },
    "greaterEqual": { "label": "大于或等于", "form": "inputNumber" },
    "betweenAnd": {
      "label": "属于范围",
      "form": [ { "type": "inputNumber" }, { "type": "template", "template": "~" }, { "type": "inputNumber" } ],
      "role": {}
    },
    "notBetweenAnd": {
      "label": "不属于范围",
      "form": [ { "type": "inputNumber" }, { "type": "template", "template": "~" }, { "type": "inputNumber" } ],
      "role": {}
    }
  },
  "bool": {
    "empty": { "label": "为空" },
    "notEmpty": { "label": "为空" },
    "true": { "label": "满足" },
    "false": { "label": "不满足" }
  },
  "select": {
    "equals": { "label": "等于", "form": "select" },
    "notEquals": { "label": "不等于", "form": "select" },
    "empty": { "label": "为空", "form": "select" },
    "notEmpty": { "label": "不为空", "form": "select" },
    "contains": { "label": "包含", "form": "multipleSelect" },
    "notContains": { "label": "不包含", "form": "multipleSelect" }
  },
  "date": {
    "equals": { "label": "等于", "form": "date" },
    "notEquals": { "label": "不等于", "form": "date" },
    "empty": { "label": "为空" },
    "notEmpty": { "label": "为空" },
    "less": { "label": "小于", "form": "date" },
    "lessEqual": { "label": "小于或等于", "form": "date" },
    "greater": { "label": "大于", "form": "date" },
    "greaterEqual": { "label": "大于或等于", "form": "date" },
    "betweenAnd": {
      "label": "属于范围",
      "form": [ { "type": "date" }, { "type": "template", "template": "~" }, { "type": "date" } ],
      "role": {}
    },
    "notBetweenAnd": {
      "label": "不属于范围",
      "form": [ { "type": "date" }, { "type": "template", "template": "~" }, { "type": "date" } ],
      "role": {}
    }
  },
  "datetime": {
    "equals": { "label": "等于", "form": "datetime" },
    "notEquals": { "label": "不等于", "form": "datetime" },
    "empty": { "label": "为空" },
    "notEmpty": { "label": "为空" },
    "less": { "label": "小于", "form": "datetime" },
    "lessEqual": { "label": "小于或等于", "form": "datetime" },
    "greater": { "label": "大于", "form": "datetime" },
    "greaterEqual": { "label": "大于或等于", "form": "datetime" },
    "betweenAnd": {
      "label": "属于范围",
      "form": [ { "type": "datetime" }, { "type": "template", "template": "~" }, { "type": "datetime" } ],
      "role": {}
    },
    "notBetweenAnd": {
      "label": "不属于范围",
      "form": [ { "type": "datetime" }, { "type": "template", "template": "~" }, { "type": "datetime" } ],
      "role": {}
    }
  },
  "time": {
    "equals": { "label": "等于", "form": "time" },
    "notEquals": { "label": "不等于", "form": "time" },
    "empty": { "label": "为空" },
    "notEmpty": { "label": "为空" },
    "less": { "label": "小于", "form": "time" },
    "lessEqual": { "label": "小于或等于", "form": "time" },
    "greater": { "label": "大于", "form": "time" },
    "greaterEqual": { "label": "大于或等于", "form": "time" },
    "betweenAnd": {
      "label": "属于范围",
      "form": [ { "type": "time" }, { "type": "template", "template": "~" }, { "type": "time" } ],
      "role": {}
    },
    "notBetweenAnd": {
      "label": "不属于范围",
      "form": [ { "type": "time" }, { "type": "template", "template": "~" }, { "type": "time" } ],
      "role": {}
    }
  },
  "other": {
    "empty": { "label": "为空" },
    "notEmpty": { "label": "不为空" }
  }
}

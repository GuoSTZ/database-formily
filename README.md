# database-formily


## schema 标准
```json
{
  "type": "object",                   // 对象类型
  "properties": {                     // 属性
    "dbType_hidden": {
      "type": "string",
      "title": "数据源类型",
      "maxLength": 10,
      "default": 1,
      "x-decorator": "FormItem",
      "x-component": "Input",
      "x-component-props": { },
      "x-display": "",         // 隐藏 - hidden, none
    }
  }
}

```
import React, { useEffect, useState } from 'react';
import { 
  FormItem,
  Input,
  NumberPicker,
  Password,
  Radio,
  Reset,
  Select,
  SelectTable,
  Space,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Form
} from '@formily/antd'
import {
  createForm,
  registerValidateRules,
} from '@formily/core'
import { createSchemaField } from '@formily/react';
import { action } from '@formily/reactive';

// const SchemaField = createSchemaField();

interface SchemaFieldWrapProps {
  form?: any;
  schema: any;
  components: any
  scope?: any;
  validator?: any
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    NumberPicker,
    Password,
    Radio,
    Reset,
    Select,
    SelectTable,
    Space,
    Switch,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload
  }
});

const SchemaFieldWrap: React.FC<SchemaFieldWrapProps> = props => {
  const { schema, form, validator, ...otherProps} = props;

  const baseform = createForm({
    validateFirst: true,
    effects: () => { },
  })

  // 自定义校验规则注册
  registerValidateRules(validator);

  useEffect(() => {
    console.log("SchemaFieldWrap组件渲染完成")
    return () => {
      console.log("SchemaFieldWrap组件卸载中")
    }
  }, [SchemaField])

  return (
    <Form form={baseform} {...form}>
      <SchemaField {...otherProps} schema={schema}/>
    </Form>
  )
}

export default SchemaFieldWrap;

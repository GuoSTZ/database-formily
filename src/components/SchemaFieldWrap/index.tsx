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
  getForm?: any;
  formPorps?: any;
  schema: any;
  components: any
  scope?: any;
  validator?: any
}

// 修改schema字段源数据的方法
const useAsyncDataSource = (service: any, transform: Function) => (field: any) => {
  field.loading = true;
  service(field).then(
    action.bound && action.bound((data: any) => {
      field.dataSource = transform ? transform(data) : data;
      field.loading = false;
    }),
  );
};

// 修改schema字段源数据的方法
const useAsyncDataSourceWithUrl = (url: string, transform: Function) => (field: any) => {
  field.loading = true;
  fetch(url)
    .then(res => res.json())
    .then(
      action.bound && action.bound((data: any) => {
        field.dataSource = transform ? transform(data) : data;
        field.loading = false;
      })
    )
};

const useDicts = (data: any) => (field: any) => {
  field.dataSource = data;
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
  },
  scope: {
    useAsyncDataSource,
    useAsyncDataSourceWithUrl,
    useDicts
  }
});

const SchemaFieldWrap: React.FC<SchemaFieldWrapProps> = props => {
  const { getForm, schema, formPorps, validator, ...otherProps} = props;

  useEffect(() => {
    getForm && getForm(baseform);
  }, [getForm])

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
    <Form form={baseform} {...formPorps}>
      <SchemaField {...otherProps} schema={schema} />
    </Form>
  )
}

export default SchemaFieldWrap;

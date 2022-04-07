import React, { useMemo, useState, useEffect } from 'react'
import { createForm } from '@formily/core'
import {
  createSchemaField,
  RecursionField,
  useForm,
  useField,
  observer,
} from '@formily/react'
import { Form, FormItem, Input, Select, FormButtonGroup, Submit } from '@formily/antd'
import { ConfigProvider } from 'antd';


const Custom = observer(() => {
  const field = useField()
  const form = useForm()
  const [schema, setSchema] = useState({} as any)

  useEffect(() => {
    form.clearFormGraph(`${field.address}.*`) //回收字段模型
    //可以异步获取
    setSchema(DYNAMIC_INJECT_SCHEMA[form.values.type])
  }, [form.values.type])

  return (
    <RecursionField
      basePath={field.address}
      schema={schema}
      onlyRenderProperties
    />
  )
})

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
    Custom,
  },
})

const DYNAMIC_INJECT_SCHEMA: any = {
  type_1: {
    type: 'void',
    properties: {
      aa: {
        type: 'string',
        title: 'AA',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'Input',
        },
      },
      cc: {
        type: 'string',
        title: 'CC',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'Input',
        },
      },
    },
  },
  type_2: {
    type: 'void',
    properties: {
      aa: {
        type: 'string',
        title: 'AA',
        required: true,
        'x-decorator': 'FormItem',
        enum: [
          {
            label: '111',
            value: '111',
          },
          { label: '222', value: '222' },
        ],
        'x-component': 'Select',
        'x-component-props': {
          placeholder: 'Select',
        },
      },
      bb: {
        type: 'string',
        title: 'BB',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      cc: {
        type: 'string',
        title: 'CC',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
        'x-component-props': {
          placeholder: 'Input',
        },
      },
    },
  },
}

export default observer(() => {
  const form = useMemo(() => createForm(), [])
  const schema = {
    type: 'object',
    properties: {
      type: {
        type: 'string',
        title: '类型',
        enum: [
          { label: '类型1', value: 'type_1' },
          { label: '类型2', value: 'type_2' },
        ],
        'x-decorator': 'FormItem',
        'x-component': 'Select',
      },
      container: {
        type: 'object',
        'x-component': 'Custom',
      },
    },
  }

  return (
    <ConfigProvider prefixCls='antd-v4'>
      <Form form={form} layout="vertical">
        <SchemaField schema={schema} />
        <FormButtonGroup>
          <Submit onSubmit={console.log}>提交</Submit>
        </FormButtonGroup>
      </Form>
    </ConfigProvider>
  )
})
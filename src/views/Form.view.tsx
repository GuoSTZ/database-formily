import React, { useState, useEffect } from 'react'
import { Input, FormItem, FormButtonGroup, Submit, Form, Select } from '@formily/antd'
import { createForm } from '@formily/core'
import { FormProvider, createSchemaField } from '@formily/react'
import { Row, Col, Select as AntdSelect } from 'antd';
import DefaultSchema, { MysqlSchema } from '../schema'

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select
  },
})

interface FormPorps {  
  dbType?: string;
}

const form = createForm()

const dbTypeSchema = {
  type: 'object',
  properties: {
    dbType: {
      type: 'string',
      title: '数据库类型',
      required: 'true',
      labelCol: 4,
      enum: [
        { label: 'Mysql', value: 'Mysql' },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        style: {
          // width: 120,
        }
      }
    }
  }
}

const layout = {
  labelCol: 6,
  wrapperCol: 8,
};

const options = [
  { label: 'Mysql', value: 'Mysql' }
]

const FormView: React.FC<FormPorps> = props => {
  const [dbType, setDbType] = useState(undefined as undefined|string);

  useEffect(() => {
    setDbType(props.dbType)
  }, [props.dbType]);

  const onChange = (value: any, option: any) => {
    setDbType(value);
  }

  const onSubmit = (values: any) => {
    console.log(values);
  }

  return (
    <React.Fragment>
      <Row>
        <Col span={6} style={{textAlign: 'right'}}>
          数据库类型：
        </Col>
        <Col span={8}>
          <AntdSelect 
            onChange={onChange}
            placeholder="请选择数据库类型"
            style={{width: "100%", marginBottom: 24}}>
            { 
              options.map((item: any) => 
                <AntdSelect.Option value={item.value} key={item.value}>{item.label}</AntdSelect.Option>
              ) 
            }
          </AntdSelect>
        </Col>
      </Row>

      {/* schema配置 */}
      <Form form={form} {...layout}>
        <SchemaField schema={DefaultSchema} />
        <FormButtonGroup>
          <Submit onSubmit={onSubmit}>提交</Submit>
        </FormButtonGroup>
      </Form>

    </React.Fragment>
  )
}

export default FormView;
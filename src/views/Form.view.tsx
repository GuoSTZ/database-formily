import React, { useState, useEffect } from 'react'
import { Input, FormItem, FormButtonGroup, Submit, Form, Select, Radio } from '@formily/antd'
import { 
  createForm, 
  registerValidateRules,
  onFieldReact,
  onFieldInit,
  FormPathPattern,
  Field,
  onFieldValueChange,
  onFieldChange,
} from '@formily/core'
import { FormProvider, createSchemaField, useForm } from '@formily/react'
import { Row, Col, Select as AntdSelect, Button } from 'antd';
import { 
  validateIpV4V6, 
  validatePort, 
  validateSpecialCharacters,
  validateWhiteSpaceAnywhere
} from '../utils/validate';
import mockDbVersion from '../utils/mockData';
import EditTable from '../components/EditTable';
// import * as schemaConfig from '../schema'
const schemaConfig = require('../schema');

interface FormPorps {  
  dbType?: string;
}

const form = createForm({
  validateFirst: true,
  effects: () => {
    onFieldReact('dbVersion', (field: any) => {
      // console.log(666, field)
      // field.dataSource = [
      //   {label: "aaa", value: 1},
      //   {label: "bbbw", value: 2}
      // ]
    })
    onFieldValueChange('', (field: Field) => {
      console.log(field, '===')
    })
    onFieldChange('', (field: any) => {
      console.log(field, '===***')
    })
    // onField
  },
})

// 测试数据库按钮
const TestButton = (props: any) => {
  const form = useForm();
  const onClick = () => {
    form.validate()
      .then(() => {
        const values = JSON.parse(JSON.stringify(form.values));
        console.log("请求已发出，包含参数为：", values)
      })
  }
  return <Button type="primary" ghost onClick={onClick}>测试数据源</Button>;
}

const SchemaField = createSchemaField({
  components: {
    Input,
    FormItem,
    Select,
    Submit,
    Radio,
    TestButton,
    EditTable
  },
})

// 自定义校验规则注册
registerValidateRules({
  validateIpV4V6,
  validatePort,
  validateSpecialCharacters,
  validateWhiteSpaceAnywhere
})

const layout = {
  labelCol: 6,
  wrapperCol: 8,
};

const FormView: React.FC<FormPorps> = props => {
  const [dbType, setDbType] = useState(undefined as string|undefined);
  const [schemaType, setSchemaType] = useState("DefaultSchema");

  useEffect(() => {
    setDbType(props.dbType)
  }, [props.dbType]);

  const dbTypeOnChange = (value: any, option: any) => {
    setDbType(value);
    setSchemaType(value ? `${value}Schema` : 'DefaultSchema');
    form.setFieldState('dbVersion',(state)=>{
      state.dataSource = (mockDbVersion as any)[value];
    })
  }

  const handleDbVersion = async (value: string) => {
    await fetch(`https://suggest.taobao.com/sug?q=${value}`, {
      method: 'jsonp',
    })
      .then((response) => response.json())
      .then((d) => {
        const { result } = d
        const data: any= []
        result.forEach((r: any) => {
          data.push({
            value: r[0],
            label: r[0],
          })
        })
        form.setFieldState('dbVersion',(state)=>{
          state.dataSource = data;
        })
      })
  }

  const onSubmit = (values: any) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        console.log(values)
        resolve()
      }, 2000)
    })
  } 

  const options = [
    // { label: 'Mysql', value: 'Mysql' },
    // { label: 'Oracle', value: 'Oracle' },
    // { label: 'Odps', value: 'Odps' },
    { label: 'Test_Mysql', value: 'Mysql' },
    { label: 'Test_Oracle', value: 'Oracle' }
  ]

  return (
    <React.Fragment>
      <Row>
        <Col span={6} style={{textAlign: 'right'}}>
          数据库类型：
        </Col>
        <Col span={8}>
          <AntdSelect 
            value={dbType}
            onChange={dbTypeOnChange}
            allowClear
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
        <SchemaField schema={schemaConfig[schemaType]} />
        <FormButtonGroup.FormItem>
          <Submit onSubmit={onSubmit}>提交</Submit>
        </FormButtonGroup.FormItem>
      </Form>
    </React.Fragment>
  )
}

export default FormView;
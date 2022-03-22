import React, { useState, useEffect } from 'react'
import { Input, FormItem, FormButtonGroup, Submit, Form, Select, Radio } from '@formily/antd'
import { 
  createForm, 
  registerValidateRules,
  onFieldReact,
  onFieldInit,
  FormPathPattern,
  Field
} from '@formily/core'
import { FormProvider, createSchemaField, useForm } from '@formily/react'
import { action, observable } from '@formily/reactive'
import { Row, Col, Select as AntdSelect, Button } from 'antd';
import { 
  validateIpV4V6, 
  validatePort, 
  validateSpecialCharacters,
  validateWhiteSpaceAnywhere
} from '../utils';
import EditTable from '../components/EditTable';
// import * as schemaConfig from '../schema'
const schemaConfig = require('../schema');

interface FormPorps {  
  dbType?: string;
}

let timeout: any
let currentValue: any

function fetchData(value: any, callback: any) {
  if (timeout) {
    clearTimeout(timeout)
    timeout = null
  }
  currentValue = value

  function fake() {
    fetch(`https://suggest.taobao.com/sug?q=${value}`, {
      method: 'jsonp',
    })
      .then((response) => response.json())
      .then((d) => {
        if (currentValue === value) {
          const { result } = d
          const data: any= []
          result.forEach((r: any) => {
            data.push({
              value: r[0],
              text: r[0],
            })
          })
          callback(data)
        }
      })
  }

  timeout = setTimeout(fake, 300)
}

const asyncDataSource = (
  pattern: FormPathPattern,
  service: (field: Field) => Promise<{ label: string; value: any }[]>
) => {
  const keyword = observable.ref('')

  // onFieldInit(pattern, (field) => {
  //   field.setComponentProps({
  //     onSearch: (value: any) => {
  //       keyword.value = value
  //     },
  //   })
  // })

  onFieldReact(pattern, (field: any) => {
    field.loading = true
    service({ field, keyword: keyword.value } as any).then(
      action.bound && action.bound((data) => {
        field.dataSource = data
        field.loading = false
      })
    )
  })
}

const form = createForm({
  validateFirst: true,
  effects: () => {
    asyncDataSource('dbVersion', async ({ keyword }: any) => {
      if (!keyword) {
        return []
      }
      return new Promise((resolve) => {
        fetchData(keyword, resolve)
      })
    })
    // console.log(form, 666)
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

  const onChange = (value: any, option: any) => {
    setDbType(value);
    setSchemaType(`${value}Schema`);
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
    { label: 'Test_Mysql', value: 'Test_Mysql' },
    { label: 'Test_Oracle', value: 'Test_Oracle' }
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
            onChange={onChange}
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
        {/* <SchemaField schema={schemaConfig[schemaType]} /> */}
        { dbType === undefined &&  <SchemaField schema={schemaConfig.DefaultSchema} />}
        { dbType === 'Mysql' &&  <SchemaField schema={schemaConfig.MysqlSchema} />}
        { dbType === 'Oracle' &&  <SchemaField schema={schemaConfig.OracleSchema} />}
        { dbType === 'Test_Mysql' &&  <SchemaField schema={schemaConfig.Test_MysqlSchema} />}
        { dbType === 'Test_Oracle' &&  <SchemaField schema={schemaConfig.Test_OracleSchema} />}
        <FormButtonGroup.FormItem>
          <Submit onSubmit={onSubmit}>提交</Submit>
        </FormButtonGroup.FormItem>
      </Form>
    </React.Fragment>
  )
}

export default FormView;
import React, { useState, useEffect } from 'react'

import { Row, Col, Select as AntdSelect, Button } from 'antd';
import {
  validateIpV4V6,
  validatePort,
  validateSpecialCharacters,
  validateWhiteSpaceAnywhere
} from '../utils/validate';
import mockDbVersion from '../utils/mockData';
import {
  SchemaFieldWrap,
  TestButton,
  EditTable
} from '../components';
// import * as schemaConfig from '../schema'
const schemaConfig = require('../schema');

interface FormPorps {
  dbType?: string;
}

const FormView: React.FC<FormPorps> = props => {
  const [dbType, setDbType] = useState(undefined as string | undefined);
  const [schemaType, setSchemaType] = useState("DefaultSchema");
  const [submitLoading, setSubmitLoading] = useState(false);
  let form: any = null;

  useEffect(() => {
    setDbType(props.dbType)
  }, [props.dbType]);

  const loadData = async (field: any) => {
    const linkage = field.query('dbType_hidden').get('value')
    // if (!linkage) return []
    return new Promise((resolve) => {
      if(linkage === null) {
        resolve([
          {
            label: 'AAA',
            value: 'aaa',
          },
          {
            label: 'BBB',
            value: 'ccc',
          },
        ])
      } else {
        resolve([
          {
            label: '2',
            value: '2',
          },
          {
            label: '3',
            value: '3',
          },
        ])
      }
    })
  }

  // 模拟字典取值方法
  const dicts = (str: "Mysql" | "Oracle") => {
    if(!str) return [];
    return mockDbVersion[str] || [];
  }

  const dbTypeOnChange = (value: any, option: any) => {
    setDbType(value);
    setSchemaType(value ? `${value}Schema` : "DefaultSchema");
  }

  // 表单提交
  const onSubmit = () => {
    // setSubmitLoading(true);
    form?.submit().then((values: any) => {
      console.log(values)
    })
  }

  const fetchTest = async (field: any) => {
    return [{label: 'aa', value: 1}]
    // field.loading = true;
    // await fetch(`https://guostz.github.io/Tuan/files/select.json`)
    //   .then((res: any) => res.json())
    //   .then((data: any) => new Promise((resolve: any) => resolve(data)))
  }

  const options = [
    { label: 'Mysql', value: 'Mysql' },
    { label: 'Oracle', value: 'Oracle' },
    { label: 'Odps', value: 'Odps' }
    // { label: 'Odps', value: 'Odps' },
    // { label: 'Test_Mysql', value: 'Mysql' },
    // { label: 'Test_Oracle', value: 'Oracle' },
    // { label: 'Hive', value: 'Hive' },
    // { label: 'OceanBase', value: 'OceanBase' }
  ]

  // form 相关属性配置
  const formPorps = {
    labelCol: 6,
    wrapperCol: 8,
  }

  // 自定义组件
  const components = {
    TestButton,
    EditTable
  }

  // 相关方法传入
  const scope = {
    dicts,
    loadData,
    fetchTest
  }

  // 自定义校验规则
  const validator = {
    validateIpV4V6,
    validatePort,
    validateSpecialCharacters,
    validateWhiteSpaceAnywhere
  }

  return (
    <React.Fragment>
      <Row>
        <Col span={6} style={{ textAlign: 'right' }}>
          数据库类型：
        </Col>
        <Col span={8}>
          <AntdSelect
            value={dbType}
            onChange={dbTypeOnChange}
            allowClear
            placeholder="请选择数据库类型"
            style={{ width: "100%", marginBottom: 24 }}>
            {
              options.map((item: any) =>
                <AntdSelect.Option value={item.value} key={item.value}>{item.label}</AntdSelect.Option>
              )
            }
          </AntdSelect>
        </Col>
      </Row>

      <SchemaFieldWrap 
        getForm={(baseForm: any) => form = baseForm} 
        components={components}
        scope={scope}
        formPorps={formPorps}
        validator={validator}
        schema={schemaConfig[schemaType]}
      />

      <Row>
        <Col offset={6}>
          <Button loading={submitLoading} type="primary" onClick={onSubmit}>提交</Button>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default FormView;
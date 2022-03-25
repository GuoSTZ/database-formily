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

  const useAsyncDataSource = (service: any) => (field: any) => {
    field.loading = true;
    service(field).then(
      // action.bound && action.bound((data: any) => {
      //   field.dataSource = data;
      //   field.loading = false;
      // }),
    );
  };

  const useDicts = (data: any) => (field: any) => {
    console.log(field, '===')
    field.dataSource = data;
  }

  const dicts = (str: "Mysql" | "Oracle") => {
    console.log(str, JSON.stringify(mockDbVersion[str]), '====')
    return { label: "a", value: 1 }
    // if(!str) return [];
    // return mockDbVersion[str] || [];
  }

  const dbTypeOnChange = (value: any, option: any) => {
    setDbType(value);
    setSchemaType(value ? `${value}Schema` : "DefaultSchema");
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
    { label: 'Mysql', value: 'Mysql' },
    { label: 'Oracle', value: 'Oracle' },
    { label: 'Odps', value: 'Odps' }
    // { label: 'Odps', value: 'Odps' },
    // { label: 'Test_Mysql', value: 'Mysql' },
    // { label: 'Test_Oracle', value: 'Oracle' },
    // { label: 'Hive', value: 'Hive' },
    // { label: 'OceanBase', value: 'OceanBase' }
  ]
  const form = {
    labelCol: 6,
    wrapperCol: 8,
  }

  const components = {
    TestButton,
    EditTable
  }

  const scope = {
    dicts,
    useDicts,
    useAsyncDataSource,
    loadData
  }

  const validator = {
    validateIpV4V6,
    validatePort,
    validateSpecialCharacters,
    validateWhiteSpaceAnywhere
  }

  const schemaProps = {
    components,
    scope,
    form,
    validator,
    schema: schemaConfig[schemaType]
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

      <SchemaFieldWrap {...schemaProps} />
    </React.Fragment>
  )
}

export default FormView;
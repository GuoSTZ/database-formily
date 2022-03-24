import React from 'react';
import { Table } from 'antd';
import column from './column.json';

const EditTable: React.FC<any> = props => {
  const dataSource = [
    { key: 1, name: "张三", age: 18, address: "杭州" }
  ]
  return (
    <Table columns={column} dataSource={dataSource}/>
  )
}

export default EditTable;
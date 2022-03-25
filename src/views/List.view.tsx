import React, { useEffect } from 'react';
import { Table } from 'antd';
import SearchForm from '../components/SearchForm';
import tableColumns from '../utils/column.json';
import SearchFormSchema from '../schema/SearchForm.json';
import { tableData } from '../utils/mockData';

interface ListViewProps { }

const ListView: React.FC<ListViewProps> = props => {
  // console.log(window, '===')
  useEffect(() => {
    
  }, [])
  return (
    <div>
      <SearchForm schema={SearchFormSchema}/>

      <div className='list'>
        <Table
          size="middle"
          columns={tableColumns}
          dataSource={tableData}
        />
      </div>

    </div>
  )
}

export default ListView;
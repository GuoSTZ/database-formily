import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import SearchForm from '../components/SearchForm';
import tableColumns from '../utils/column.json';
import SearchFormSchema from '../schema/SearchForm.json';
import { tableData } from '../utils/mockData';
import { EventTypes } from '../utils/event_type'

interface ListViewProps { }

const ListView: React.FC<ListViewProps> = props => {
  const _window = window as any;
  const [data, setData] = useState([] as any[]);

  useEffect(() => {
    setData(tableData);
  }, [tableData])

  useEffect(() => {
    subscribe(EventTypes.FormSearch, handleData);
    subscribe(EventTypes.TableChange, handleData);
    return () => {
      subscribe(EventTypes.FormSearch);
      subscribe(EventTypes.TableChange);
    }
  }, [])

  // 事件订阅
  const subscribe = (type: string, values?: any) => {
    _window.PubSub && _window.PubSub.subscribe(type, values);
  }

  // 事件发布
  const publish = (type: string, values?: any) => {
    _window.PubSub && _window.PubSub.publish(type, values);
  }

  const handleData = (message: any, values: any) => {
    switch (message) {
      case EventTypes.FormSearch:
        values.status === 0 ? setData([]) : setData(tableData.slice(0, 3))
        break;
      case EventTypes.TableChange:
        console.log(values)
        break;
      default:
        break;
    }
  }

  const handlePublish = (values: any) => {
    publish(EventTypes.FormSearch, values);
  }

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    const values = { pagination, filters, sorter, extra };
    publish(EventTypes.TableChange, values);
  }

  return (
    <div>
      <SearchForm 
        schema={SearchFormSchema}
        handleReset={handlePublish}
        handleSubmit={handlePublish}
      />

      <div className='list'>
        <Table
          size="middle"
          columns={tableColumns}
          dataSource={data}
          onChange={onChange}
        />
      </div>

    </div>
  )
}

export default ListView;
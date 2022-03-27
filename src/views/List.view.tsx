import React, { useEffect } from 'react';
import { Table } from 'antd';
import SearchForm from '../components/SearchForm';
import tableColumns from '../utils/column.json';
import SearchFormSchema from '../schema/SearchForm.json';
import { tableData } from '../utils/mockData';
import { EventTypes } from '../utils/event_type'

interface ListViewProps { }

const ListView: React.FC<ListViewProps> = props => {
  const _window = window as any;
  useEffect(() => {
    _window.PubSub && _window.PubSub.subscribe(EventTypes.FormSearch, handleData);
    _window.PubSub && _window.PubSub.subscribe(EventTypes.TableChange, handleData);
    return () => {
      _window.PubSub && _window.PubSub.subscribe(EventTypes.FormSearch);
      _window.PubSub && _window.PubSub.subscribe(EventTypes.TableChange);
    }
  }, [])

  const handleData = (message: any, values: any) => {
    switch (message) {
      case EventTypes.FormSearch:
        console.log(values)
        break;
      case EventTypes.TableChange:
        console.log(values)
        break;
      default:
        break;
    }
  }

  const handlePublish = (values: any) => {
    _window.PubSub && _window.PubSub.publish(EventTypes.FormSearch, values);
  }

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    const values = { pagination, filters, sorter, extra };
    _window.PubSub && _window.PubSub.publish(EventTypes.TableChange, values);
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
          dataSource={tableData}
          onChange={onChange}
        />
      </div>

    </div>
  )
}

export default ListView;
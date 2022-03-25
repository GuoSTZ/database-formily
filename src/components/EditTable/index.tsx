import React from 'react';
import { EditTable as McEditTable } from '@mcfed/components';
import { renderOracleColumns, renderDefaultColumns } from './Columns.render';

const EditTable: React.FC<any> = props => {

  const formatTableDataSource = (dataSource: any[]) => {
    const isOracle = props.dbType === 'Oracle';

    return dataSource?.map((it: any) => {
      return isOracle ? it : {...it, racSid: undefined};
    });
  }

  
  const formatEditTableData = (data: any[]) => {
    return data.map(it => ({
      ...it,
      key: it.racName,
      racStatus: it.racStatus === undefined ? 1 : it.racStatus
    }));
  }
  
  const compileColumns = () => {

    if (props.dbType === 'Oracle') {
      return renderOracleColumns((value: any) => value, {});
    }

    return renderDefaultColumns((value: any) => value, {});
  }

  const tableConf = {
    rowKey: 'racName',
    data: formatTableDataSource(props.data) || [],
    columns: compileColumns(),
    formatData4Form: formatEditTableData
  };
  return (
    <McEditTable
      {...tableConf}
    />
  )
}

export default EditTable;
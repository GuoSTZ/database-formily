import React, { useEffect, useState } from 'react';
import { createSchemaField, useForm } from '@formily/react'

// const SchemaField = createSchemaField();

interface SchemaFieldWrapProps {
  schema: any;
  components: any
  scope?: any;
}


const SchemaFieldWrap: React.FC<SchemaFieldWrapProps> = props => {

  const SchemaField = createSchemaField();

  useEffect(() => {
    console.log("SchemaFieldWrap组件渲染完成")
    return () => {
      console.log("SchemaFieldWrap组件卸载中")
    }
  }, [SchemaField])

  return (
    <SchemaField {...props}/>
  )
}

export default SchemaFieldWrap;

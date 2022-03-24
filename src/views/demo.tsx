import React, { useEffect } from 'react';
import { Form, Select, FormItem } from '@formily/antd';
import { createSchemaField } from '@formily/react';
import { createForm } from '@formily/core';


export default (props: any) => {
  const { layout, schema, components, scope } = props;
  
  useEffect(() => {
    return () => {
      console.log("卸载了")
    }
  })
  const SchemaField = createSchemaField();
  const form = createForm({
    validateFirst: true,
    effects: () => { },
  })
  return (
    <Form form={form} {...layout}>
      <SchemaField
        components={{Select, FormItem}}
        schema={schema}
        scope={scope}
      />
    </Form>
  )
}
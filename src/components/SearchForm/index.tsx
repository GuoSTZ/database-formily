import React, { useMemo, Fragment } from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider, observer } from '@formily/react'
import {
  Form,
  Input,
  Select,
  DatePicker,
  FormItem,
  FormGrid,
  Submit,
  Reset,
  FormButtonGroup,
} from '@formily/antd'
import { EventTypes } from '../../utils/event_type'
import "./index.less"

interface SearchFormProps {
  schema: any;
}

const SchemaField = createSchemaField({
  components: {
    // QueryForm,
    Input,
    Select,
    DatePicker,
    FormItem,
    FormGrid
  },
})

const SearchForm: React.FC<SearchFormProps> = props => {
  const { schema, ...otherProps } = props;
  const form = useMemo(() => createForm(), []);
  const win = window as any;

  const onSubmit = (values: any) => {
    win.PubSub && win.PubSub.publish(EventTypes.FormSearch, values);
  }

  const onReset = (event: any) => {
    form.submit((values: any) => {
      win.PubSub && win.PubSub.publish(EventTypes.FormSearch, values);
    })
  }

  return (
    <Form form={form} className="SearchForm">
      <SchemaField {...otherProps} schema={schema} />

      <FormButtonGroup>
        <Reset onClick={onReset}>重置</Reset>
        <Submit onSubmit={onSubmit}>搜索</Submit>
      </FormButtonGroup>
    </Form>
  )
}

export default SearchForm;
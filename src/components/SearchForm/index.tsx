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
import "./index.less"

interface SearchFormProps {
  schema: any;
  handleReset?: Function;
  handleSubmit?: Function;
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
  const { schema, handleSubmit, handleReset, ...otherProps } = props;
  const form = useMemo(() => createForm(), []);
  const _window = window as any;
  
  const onSubmit = (values: any) => {
    handleSubmit && handleSubmit(values);
  }

  const onReset = (event: any) => {
    form.submit((values: any) => {
      handleReset && handleReset(values);
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
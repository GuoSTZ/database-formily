import React, { useEffect } from 'react';
import { 
  FormItem,
  Input,
  NumberPicker,
  Password,
  Radio,
  Reset,
  Select,
  SelectTable,
  Space,
  Switch,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  Form,
  ArrayTable,
  FormButtonGroup,
  FormCollapse,
  FormDialog,
  FormDrawer,
  FormGrid,
  FormLayout,
  FormStep,
  FormTab
} from '@formily/antd'
import {
  createForm,
  registerValidateRules,
  onFormInit,
  onFormMount
} from '@formily/core'
import { createSchemaField, RecursionField, observer } from '@formily/react';
import { action } from '@formily/reactive';
import { ConfigProvider } from 'antd';
// import './assets/index.less';

interface McFormilyProps {
  getForm?: any;
  formPorps?: any;
  schema: any;
  components: any
  scope?: any;
  validator?: any
}

// 同步设置输入控件的数据源
const useDataSource = (data: any, transform: any) => (field: any) => {
  field.dataSource = transform ? transform(data) : data;
}

// 异步设置输入控件的数据源
const useAsyncDataSource = (service: any, transform: any) => (field: any) => {
  service(field).then(
    action.bound && action.bound((data: any) => {
      field.dataSource = transform ? transform(data) : data;
    })
  )
}

const SchemaField = createSchemaField({
  components: {
    FormItem,
    Input,
    NumberPicker,
    Password,
    Radio,
    Reset,
    Select,
    SelectTable,
    Space,
    Switch,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    ArrayTable,
    FormButtonGroup,
    FormCollapse,
    FormGrid,
    FormLayout,
    FormStep,
    FormTab
  },
  scope: {
    useDataSource,
    useAsyncDataSource
  }
});

const McFormily: React.FC<McFormilyProps> = observer(props => {
  const { 
    getForm, 
    schema = {}, 
    validator, 
    components,
    ...otherProps
  } = props;

  const baseform = React.useMemo(() => 
    createForm({
      validateFirst: true,
      effects: () => {
        onFormInit(form => {
          // 自定义校验规则注册
          registerValidateRules(validator);
        })
        onFormMount((form) => {
          getForm && getForm(form);
        })
      },
    })
  , [schema])

  useEffect(() => {
    getForm && getForm(baseform);
  }, [schema])

  // 自定义校验规则注册
  registerValidateRules(validator);

  // 自定义组件传出form实例
  const handleCustomComp = () => {
    if(!components) return {};
    const customComp: any = {};
    for(let key in components) {
      const Comp = components[key];
      customComp[key] = (props: any) => <Comp {...props} form={baseform}/>
    }
    return customComp;
  }

  return (
    // <ConfigProvider prefixCls='McFormily-ant'>
    <Form form={baseform} {...schema.form || {}}>
      <SchemaField {...otherProps} schema={schema.schema || {}} components={handleCustomComp()}/>
    </Form>
    // </ConfigProvider>
  )
})

export default McFormily;

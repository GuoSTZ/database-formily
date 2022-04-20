import React from 'react';
import { Button } from 'antd';
import { McFormily, JsonEditor } from '../components';
import { FormBlockSchema, FormBlockLayoutSchema } from '../schema';
import './index.less';

const FormBlock = (props: any) => {
  let form: any = null;
  // 自定义组件
  const components = {
    JsonEditor
  }

  // 相关方法传入
  const scope = {
  }

  // 自定义校验规则
  const validator = {

  }
  return (
    <div className='FormBlock'>
      <McFormily
        getForm={(baseForm: any) => form = baseForm}
        components={components}
        scope={scope}
        validator={validator}
        schema={FormBlockLayoutSchema}
      />
      <Button 
        type="primary"
        onClick={() => form.submit(console.log)}>
        提交
      </Button>
    </div>
  )
}

export default FormBlock;
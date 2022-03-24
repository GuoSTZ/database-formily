import { createSchemaField, useForm } from '@formily/react'
import { Button } from 'antd';

// 测试数据库按钮
const TestButton = (props: any) => {
  const form = useForm();
  const onClick = () => {
    form.validate()
      .then(() => {
        const values = JSON.parse(JSON.stringify(form.values));
        console.log("请求已发出，包含参数为：", values)
      })
  }
  return <Button type="primary" ghost onClick={onClick}>测试数据源</Button>;
}

export default TestButton;
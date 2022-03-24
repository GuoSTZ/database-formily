import { Button } from 'antd';
import React, { useState } from 'react';
import Demo from './demo';

import test1 from '../schema/test1.json'
import test2 from '../schema/test2.json'


const Test = (props: any) => {
  const [config, setConfig] = useState(test1 as any);
  const onClick = () => {
    setConfig(test2);
  }
  return (
    <React.Fragment>
      <Demo schema={config}/>

      <Button onClick={onClick}>
        切换schema配置
      </Button>
    </React.Fragment>
  )
}

export default Test;
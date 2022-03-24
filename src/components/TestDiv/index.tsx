import React, { useState, useEffect, useMemo } from 'react';
import { Button, Input } from 'antd';

const TestDiv: React.FC<any> = props => {
  const { onChange, value } = props;
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    setCount(value);
    // onChange(value);
  }, [value])

  const onClick = () => {
    setCount((count ?? 0) + 1);
    onChange && onChange((count ?? 0) + 1);
  }

  return (
    <div>
      <span>{count}</span>
      <Button onClick={onClick}>加1</Button>
    </div>
  )
}

export default TestDiv;



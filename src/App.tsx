import React from 'react';
import { ConfigProvider } from 'antd';
import FormView from './views/Form.view';
import ListView from './views/List.view';
import Control from './views/control';

import './App.less';

function App() {
  return (
    <div className="App">
      <FormView />
      {/* <ListView /> */}
      {/* <Control /> */}
    </div>
  );
}

export default App;

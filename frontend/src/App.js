
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { MainPage } from './components/MainPage/MainPage.js';
import 'antd/dist/antd.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={ MainPage } />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

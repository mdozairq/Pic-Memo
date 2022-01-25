import React from 'react';
import './App.css';
import MenuAppBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Auth from './components/Auth/Auth';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MenuAppBar />
        <div style={{ padding: '5%' }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/auth" exact component={Auth} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;

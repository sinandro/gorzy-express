import React from 'react'
import 'rsuite/dist/styles/rsuite-default.css'
import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/styles.css'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'

import TopNav from './components/layout/TopNav'

import Index from './modules/pre'

function App() {
  return (
    <div className="App">
      <TopNav />
      <Router>
        <Switch>
          <Route exact path="/" component={Index} />
          {/* <Route path="/about">
            <About />
          </Route> */}
        </Switch>
      </Router>
    </div>
  );
}

export default App;

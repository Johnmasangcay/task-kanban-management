import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import DashboardPage from "./pages/dashboard";
import TitlePage from "./pages/titlepage";
import { getProject, getTask } from "./pages/firebase";


function App() {
  useEffect(()=>{
    getProject()
    getTask()
  }, [])

return(
  <>
  <Router>
    <Switch>
      <Route exact path="/dashboard">
        <DashboardPage />
      </Route>
      <Route exact path="/">
      <TitlePage />
      </Route>
    </Switch>
  </Router>
  </>
)
}

export default App;

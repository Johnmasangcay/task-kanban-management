import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import DashboardPage from "./pages/dashboard";
import TitlePage from "./pages/titlepage";
import { getProject, getTask, getTaskByID } from "./pages/firebase";


function App() {
  useEffect(()=>{
    
    
  }, [])

return(
  <>
  <Router>
    <Switch>
      <Route exact path="/">
        <DashboardPage />
      </Route>
    </Switch>
  </Router>
  </>
)
}

export default App;

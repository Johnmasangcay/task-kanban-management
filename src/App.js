import React, { useState, useEffect } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import DashboardPage from "./pages/dashboard";
import { getProject, getTask, getTaskByID } from "./pages/firebase";


function App() {

return(
  <>
  <Router>
    <Switch>
      <Route exact path="/">
        <DashboardPage />
      </Route>
    </Switch>
  </Router>y
  </>
)
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import './App.css';

import Home from './Home';                      // Page de sign-in & sign-up --> Dans 1 premier temps uniquement des bouttons pour accéder aux différentes pages du site
import AddDrugs from './AddDrugs';              // Page uniquement accessible à un modérateur : ajout d'un principe actif dans la BDD
import AddPrincipes from './AddPrincipes';      // Page uniquement accessible à un modérateur : ajout d'un médicament dans la BDD 
import CmdPharmacie from './CmdPharmacie';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={AddDrugs} path="/add-drugs" exact />
        <Route component={AddPrincipes} path="/add-principes" exact />
        <Route component={CmdPharmacie} path="/cmd-pharmacie" exact /> 
      </Switch>
    </Router>  
  );
}

export default App;

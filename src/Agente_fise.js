import './App.css';
import React from 'react';
import Agente from './Agente.js';
import Ubigeo from './Ubigeo.js';
import {BrowserRouter, Route, Routes,NavLink,Link} from 'react-router-dom';

const Agentefise=()=>{

return(
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Administracion Mapa de Agentes
      </h3>
        
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <Link className="btn btn-light btn-outline-primary" to="/agente">
              Agente
            </Link>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/ubigeo">
              Ubigeo
            </NavLink>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path='/agente' element={<Agente/>}/>
        <Route path='/ubigeo' element={<Ubigeo/>}/>
      </Routes>
    </div>
    </BrowserRouter>
);

}

export default Agentefise;
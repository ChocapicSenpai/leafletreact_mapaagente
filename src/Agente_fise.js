import './App.css';
import React, { useState, useEffect } from 'react';
import Agente from './Agente.js';
import Ubigeo from './Ubigeo.js';
import {BrowserRouter, Route, Routes,NavLink} from 'react-router-dom';
import { variables } from "./Variables";
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import logo from './assets/logof.jpg';



const Agentefise=()=>{

  const [agentes, setAgentes] = useState([]);
  const [agentesActivos, setAgentesActivos] = useState(0);
  const [agentesInactivos, setAgentesInactivos] = useState(0);


  useEffect(() => {
    fetch(variables.API_URL+'agente')
      .then(response => response.json())
      .then(data => setAgentes(data))
      .catch(error => console.log(error));
  }, [agentes]);

  useEffect(() => {
    // Contar la cantidad de agentes activos (estado = 1)
    const activos = agentes.filter(agente => agente.estado === 1).length;
    setAgentesActivos(activos);

    // Contar la cantidad de agentes inactivos (estado = 0)
    const inactivos = agentes.filter(agente => agente.estado === 0).length;
    setAgentesInactivos(inactivos);
  }, [agentes]);  

  useEffect(() => {
    function refrescarContadores() {
      // Actualizar los contadores cuando se dispare el evento 'refrescarMapa'
      const activos = agentes.filter(agente => agente.estado === 1).length;
      setAgentesActivos(activos);

      const inactivos = agentes.filter(agente => agente.estado === 0).length;
      setAgentesInactivos(inactivos);
    }

    document.addEventListener('refrescarMapa', refrescarContadores);

    return () => {
      document.removeEventListener('refrescarMapa', refrescarContadores);
    };
  }, [agentes]);


return(
    <BrowserRouter>

<br></br>
      <div className="d-flex justify-content-center align-items-center  m-3">
      <a href='/'>
      <img src={logo} alt="Logo" className="logo" />
      </a>
    
      <h2 className="m-0">Administracion Mapa de Agentes</h2>
      </div>
      <br></br>
    <div className="App container">

     
        
      <nav className="navbar navbar-expand-sm bg-light navbar-light">
       
        <ul className="navbar-nav d-flex w-100" >
          <li className="nav-item flex-grow-1 m-1">
          
            <NavLink className="btn btn-light btn-outline-primary btn-lg " to="/agente">
              
              Administrar Agentes
            </NavLink>
          </li>
          <li className="nav-item flex-grow-1 m-1">
            <NavLink className="btn btn-light btn-outline-success btn-lg" to="/ubigeo">
              Administrar Ubigeos
            </NavLink>         
          </li>

          <li className="nav-item flex-grow-1 m-1 ml-auto contador">
              <p className="nav-link ml-auto contador">
                 <IconContext.Provider value={{ color: "black"  }}>
                  <AiFillCheckCircle  size="20px"/> 
                  </IconContext.Provider>
                  Total Agentes: {agentesActivos+agentesInactivos}</p>
          </li>
                
          <li className="nav-item flex-grow-1 m-1 ml-auto contador">
              <p className="nav-link ml-auto contadorp">
                 <IconContext.Provider value={{ color: "green"  }}>
                  <AiFillCheckCircle  size="20px"/> 
                  </IconContext.Provider>
                  Agentes Activos: {agentesActivos}</p>
          </li>
    
            <li className="nav-item flex-grow-1 m-1 mr-0 ">
              <p className="nav-link m-0 mr-0 contadorn">
              <IconContext.Provider value={{ color: "red" }}>
                  <AiFillCloseCircle size="20px"/> 
                  </IconContext.Provider>
                  Agentes Inactivos: {agentesInactivos}</p>
          </li>
             
          
 
        </ul>
  

      
      </nav>
      <br></br>
      <Routes>
        <Route path='/agente' element={<Agente/>}/>
        <Route path='/ubigeo' element={<Ubigeo/>}/>
      </Routes>
    </div>
    </BrowserRouter>
);

}

export default Agentefise;
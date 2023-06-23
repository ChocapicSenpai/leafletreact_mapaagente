import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import Agente from './Agente';
import Ubigeo from './Ubigeo';
import NotFound from './NotFound';
import Login from './Login';
import logo from './assets/logof.jpg';
import { variables } from './Variables.js';
import { AiFillCheckCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
import Home from "./Home"

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState('');
  const [agentes, setAgentes] = useState([]);
  const [agentesActivos, setAgentesActivos] = useState(0);
  const [agentesInactivos, setAgentesInactivos] = useState(0);

  useEffect(() => {
    // Verifica si hay un token almacenado en el localStorage
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // Si hay un token almacenado, establece el estado isLoggedIn en true y guarda el token
      setIsLoggedIn(true);
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    fetch(variables.API_URL + 'agente')
      .then((response) => response.json())
      .then((data) => setAgentes(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    // Contar la cantidad de agentes activos (estado = 1)
    const activos = agentes.filter((agente) => agente.estado === 1).length;
    setAgentesActivos(activos);

    // Contar la cantidad de agentes inactivos (estado = 0)
    const inactivos = agentes.filter((agente) => agente.estado === 0).length;
    setAgentesInactivos(inactivos);
  }, [agentes]);

  useEffect(() => {
    function refrescarContadores() {
      // Actualizar los contadores cuando se dispare el evento 'refrescarMapa'
      const activos = agentes.filter((agente) => agente.estado === 1).length;
      setAgentesActivos(activos);

      const inactivos = agentes.filter((agente) => agente.estado === 0).length;
      setAgentesInactivos(inactivos);
    }

    document.addEventListener('refrescarMapa', refrescarContadores);

    return () => {
      document.removeEventListener('refrescarMapa', refrescarContadores);
    };
  }, [agentes]);

  const handleLogin = (token) => {
    setIsLoggedIn(true);
    setToken(token);
    // console.log('Token:', token);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setToken('');
    localStorage.removeItem('token');
    // console.log('Token:', token);
  };

  return (
    <BrowserRouter>
      <div>
        {isLoggedIn ? (
          <div>
            {/* <h2>Logged In</h2>
            <button onClick={handleLogout}>Logout</button> */}

            <div className="d-flex justify-content-center align-items-center  m-3">
              <a href="/">
                <img src={logo} alt="Logo" className="logo" />
              </a>

              <h2 className="m-0">Administracion Mapa de Agentes</h2>
            </div>
            <br />

            <div className="App container">
              <nav className="navbar navbar-expand-sm bg-light navbar-light ">
                <ul className="navbar-nav d-flex w-100 ">
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
                      <IconContext.Provider value={{ color: 'black' }}>
                        <AiFillCheckCircle size="20px" />
                      </IconContext.Provider>
                      Total Agentes: {agentesActivos + agentesInactivos}
                    </p>
                  </li>

                  <li className="nav-item flex-grow-1 m-1 ml-auto contador">
                    <p className="nav-link ml-auto contadorp">
                      <IconContext.Provider value={{ color: 'green' }}>
                        <AiFillCheckCircle size="20px" />
                      </IconContext.Provider>
                      Agentes Activos: {agentesActivos}
                    </p>
                  </li>

                  <li className="nav-item flex-grow-1 m-1 mr-0 ">
                    <p className="nav-link m-0 mr-0 contadorn ">
                      <IconContext.Provider value={{ color: 'red' }}>
                        <AiFillCloseCircle size="20px" />
                      </IconContext.Provider>
                      Agentes Inactivos: {agentesInactivos}
                    </p>
                  </li>

                  <li className="nav-item flex-grow-1 m-1">
                    
                  <button style={{marginTop:"6px"}} className="btn btn-light btn-outline-danger btn-sm" onClick={handleLogout}>Cerrar sesión</button>   
                  
            
                  </li>
                  <li>

                  </li>
                </ul>
                {/* <div className=" row m-0  text-center align-itens-center justify-content-center">
                    <div className="col-atuto">
                          <button className="btn btn-light btn-outline-danger btn-sm" onClick={handleLogout}>Cerrar sesión</button>     
                    </div>
                  </div> */}
              </nav>
              <br />
              <Routes>
              <Route path="/" element={<Home token={token} />} />
                <Route path="/agente" element={<Agente token={token} />} />
                <Route path="/ubigeo" element={<Ubigeo token={token} />} />
                <Route path="*" element={<NotFound token={token}/>}/>
              </Routes>
            </div>
          </div>
        ) : (
          <Login onLogin={handleLogin} />
        )}
      </div>
    </BrowserRouter>
  );
};

export default App;



/////
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

// import './App.css';

// import Agentefise from './Agente_fise';
// import Agente from './Agente';
// import MapView from './component/MapView';
// import Login from './Login';

// const App = () => {
//   const isAuthenticated = localStorage.getItem('token');

//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         {isAuthenticated ? (
//           <>
//             <Route path="/agente" element={<Agentefise />} />
//             <Route path="/mapview" element={<MapView />} />
//           </>
//         ) : (
//           <Navigate to="/login" />
           
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;

/////



////

// import React, { useState } from 'react';
// import './App.css';
// import Agentefise from './Agente_fise';
// import MapView from './component/MapView';
// import Login from './Login';

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [token, setToken] = useState('');

//   const handleLogin = (username, password) => {
//     // Aquí realizarías la lógica de autenticación y obtención del token
//     // Puedes utilizar una API o cualquier otra forma de autenticación

//     // Si la autenticación es exitosa, actualizamos el estado isLoggedIn a true
//     setIsLoggedIn(true);
//     // Y establecemos el token obtenido en el estado token
//     setToken('TOKEN_AQUI');
//   };

//   const handleLogout = () => {
//     // Aquí realizarías la lógica de cierre de sesión y eliminación del token
//     setIsLoggedIn(false);
//     setToken('');
//   };

//   return (
//     <div>
//       {isLoggedIn ? (
//         <div>
//           <button onClick={handleLogout}>Cerrar sesión</button>
//           <Agentefise token={token} />
//           <MapView token={token} />
//         </div>
//       ) : (
//         <Login onLogin={handleLogin} />
//       )}
//     </div>
//   );
// }

// export default App;

////////
  // import React from 'react';


  // import './App.css';

  // //import MapView from './component/MapView';
  // import Agentefise from './Agente_fise';
  // import Agente from './Agente';
  // import Ubigeo from './Ubigeo';
  // import MapView from './component/MapView';
  // import Login from './Login';




  // function App() {


  //   return (
  //     <div>
  //     <Agentefise/>
  //     <MapView/>
  //     </div>
      
  
  //   );
  // }

  // export default App;
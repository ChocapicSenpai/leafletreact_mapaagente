    // import React, { useState } from 'react';
    // import { variables } from "./Variables";

    // const Login = () => {
    //   const [username, setUsername] = useState('');
    //   const [password, setPassword] = useState('');

    //   const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // Aquí puedes realizar la llamada a la API para enviar las credenciales de login
    //     // Puedes utilizar la función fetch u otras librerías como Axios
    //     const token = '...'; // Obtén el token de la respuesta del servidor

    //     localStorage.setItem('token', token); // Almacena el token en localStorage
    //     window.location.href = '/agentefise';

    //     // Ejemplo de una llamada fetch a la API
    //     fetch(variables.API_URL+'auth/login', {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({ username, password }),
    //     })
    //       .then((response) => response.json())
    //       .then((data) => {
    //         // Aquí puedes manejar la respuesta de la API, como guardar el token en el localStorage
    //         // o redireccionar al usuario a otra página
    //       })
    //       .catch((error) => {
    //         // Manejo de errores
    //         console.error('Error:', error);
    //       });
    //   };

    //   return (
    //     <div>
    //       <h1>Login</h1>
    //       <form onSubmit={handleSubmit}>
    //         <div>
    //           <label>Username:</label>
    //           <input
    //             type="text"
    //             value={username}
    //             onChange={(e) => setUsername(e.target.value)}
    //           />
    //         </div>
    //         <div>
    //           <label>Password:</label>
    //           <input
    //             type="password"
    //             value={password}
    //             onChange={(e) => setPassword(e.target.value)}
    //           />
    //         </div>
    //         <button type="submit">Login</button>
    //       </form>
    //     </div>
    //   );
    // };

    // export default Login;

    ////
    import { variables } from "./Variables";
    import React, { useState } from 'react';
    import logln from "./assets/flgn.png"

    const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {

        e.preventDefault();

        if(!username||!password){
            setError('Por favor, ingresa tu usuario y contraseña');
      return;
        }

        // Realiza la lógica de autenticación aquí
            fetch(variables.API_URL+'auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        })
        .then((response) => {
            if (response.ok) {
            return response.json();
            } else if (response.status === 401) {
            throw new Error('Credenciales incorrectas');
            } else {
            throw new Error('Error en la autenticación');
            }
        })
        .then((data) => {
            const token = data.token;
            localStorage.setItem('token', token);

            onLogin(token);
            
        })
        .catch((error) => {
            setError(error.message);
        });
    };

    return (
        // <div>
        // <h1>Login</h1>
        // <form onSubmit={handleSubmit}>
        //     <div>
        //     <label>Username:</label>
        //     <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        //     </div>
        //     <div>
        //     <label>Password:</label>
        //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        //     </div>
        //     <button type="submit">Login</button>
        // </form>
        // </div>

        /////

        <div class=" row align-items-center justify-content-center border rounded login" style={{margin:"1%"}}>
        <div class="card-body p-4 p-lg-5 text-black">

          <form  onSubmit={handleSubmit}>

            <div class="d-flex align-items-center mb-3 pb-1">
              <i class="fas fa-cubes fa-2x me-3" ></i>
              <img src={logln} alt="FISE Logo" height="100px" width="150px" style={{marginTop:"5px", marginBottom:"5px "}}/>
            </div>

            {/* <h5 class="fw-normal mb-3 pb-3" >Ingresa tus credenciales</h5> */}

            <div class="form-outline mb-4">
              <input type="text"  class="form-control form-control-lg" value={username} onChange={(e) => setUsername(e.target.value)}  />
              <label class="form-label" >Nombre usuario</label>
            </div>

            <div class="form-outline mb-4">
              <input type="password"  class="form-control form-control-lg" value={password} onChange={(e) => setPassword(e.target.value)}  />
              <label class="form-label" >Contraseña</label>
            </div>

            <div class="pt-1 mb-4">
              <button class="btn btn-dark btn-lg btn-block" type="submit">Login</button>
            </div>
          
          </form>

        </div>
      </div>

    );
    };

    export default Login;


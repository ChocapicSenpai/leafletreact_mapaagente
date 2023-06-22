import React,{ Component } from "react";
import { variables } from "./Variables";

// import ReCAPTCHA from "react-google-recaptcha";

class Agente extends Component{
    

    constructor(props){
        super(props);

        this.state={
            agentes:[],
            modalTitle:"",
            NombreAgente: "",
            AgenteId: 0,
            Tlf: "",
            Ubigeo: "",
            Direccion: "",
            latlng: "",
            estado: "",
            NumeroUbigeo:"",
            
            AgenteIdFilter:"",
            NombreAgenteFilter:"",
            agentesWithoutFilter:[],
            ubigeos: [],

            filterNombreAgente:"",
            currentPage: 1, 
            totalPages: 0,
            itemsPerPage: 20, 

            // captcha:[],
            // captchaToken:[],
        }
    }
    
        ///      
        // handleRecaptchaChange = (token) => {
        // console.log('Token reCAPTCHA:', token);
        // this.setState({ captchaToken: token });
            // Guarda el token en el estado o realiza cualquier otra acción necesaria
        //   };
        ///
    getFilteredAgentes() {
        const { agentes, filterNombreAgente } = this.state;
        return agentes.filter((age) =>
          age.NombreAgente.toLowerCase().includes(filterNombreAgente.toLowerCase())
        );
      }    
    // Método para cambiar a la página anterior
      goToPreviousPage = () => {
        const { currentPage } = this.state;
        if (currentPage > 1) {
          this.setState({ currentPage: currentPage - 1 });
        }
      };
      
    // Método para cambiar a la página siguiente
      goToNextPage = () => {
        const { currentPage, totalPages } = this.state;
        if (currentPage < totalPages) {
          this.setState({ currentPage: currentPage + 1 });
        }
      };
      
    // Método para cambiar a una página específica
      goToPage = (pageNumber) => {
        const { totalPages } = this.state;
        if (pageNumber >= 1 && pageNumber <= totalPages) {
          this.setState({ currentPage: pageNumber });
        }
      };
    ///
    // changePage=(page)=>{
    //     this.setState({currentPage:page})
    // }

    changeFilterNombreAgente = (e) => {
        this.setState({ filterNombreAgente: e.target.value, currentPage: 1 });
      };

    

    enviarEventoRefrescarMapa() {
        const evento = new CustomEvent('refrescarMapa');
        document.dispatchEvent(evento);
      }


    refreshList(){
        fetch(variables.API_URL+'agente')
        .then(response=>response.json())
        .then(data=>{
            // const filteredAgentes = this.getFilteredAgentes();
            const totalPages = Math.ceil(data.length / this.state.itemsPerPage);
            this.setState({ agentes: data, totalPages });
            console.log(data);
        });

        fetch(variables.API_URL + 'ubigeo') // reemplaza 'ubigeo' con el nombre correcto del endpoint para obtener los datos de Ubigeo
        .then(response => response.json())
        .then(data => {
          this.setState({ ubigeos: data });
        });
    }

    componentDidMount(){
        this.refreshList();

    }

    changeNombreAgente = (e) =>{
        this.setState({NombreAgente:e.target.value});
    }
    changeTlf = (e) =>{
        this.setState({Tlf:e.target.value});
    }
    changeUbigeo = (e) =>{
        this.setState({Ubigeo:e.target.value});
    }
    changeNumeroUbigeo = (e) =>{
        this.setState({NumeroUbigeo:e.target.value});
    }

    changeDireccion = (e) =>{
        this.setState({Direccion:e.target.value});
    }
    changelatlng = (e) =>{
        this.setState({latlng:e.target.value});
    }
    changeestado = (e) =>{
        this.setState({estado:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Añadir Agente",
            AgenteId:0,
            NombreAgente:"",
            Tlf:"",
            Ubigeo:"",
            Direccion:"",
            latlng:"",
            estado:"",


        });
    }

    editClick(age){
        this.setState({
            modalTitle:"Editar Agente",
            AgenteId:age.AgenteId,
            NombreAgente:age.NombreAgente,
            Tlf:age.Tlf,
            Ubigeo:age.Ubigeo,
            Direccion:age.Direccion,
            latlng:age.latlng,
            estado:age.estado
        });
    }

   createClick(){

        fetch(variables.API_URL+'agente',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body:JSON.stringify({
           
                NombreAgente:this.state.NombreAgente,
                Tlf:this.state.Tlf,
                Ubigeo:this.state.Ubigeo,
                Direccion:this.state.Direccion,
                latlng:this.state.latlng,
                estado:this.state.estado,
                captcha: this.state.captchaToken


            })
            })

        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
            this.enviarEventoRefrescarMapa();

        },(error)=>{
            alert('Failed');
        })
    }


    updateClick(){
        fetch(variables.API_URL+'agente',{
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.token}`
            },
            body:JSON.stringify({
                AgenteId:this.state.AgenteId,
                NombreAgente:this.state.NombreAgente,
                Tlf:this.state.Tlf,
                Ubigeo:this.state.Ubigeo,
                Direccion:this.state.Direccion,
                latlng:this.state.latlng,
                estado:this.state.estado
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
            this.enviarEventoRefrescarMapa();


        },(error)=>{
            alert('Failed');
        })
    }



    deleteClick(id){
        if(window.confirm('¿Esta seguro?')){ 
        fetch(variables.API_URL+'agente/'+id,{
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json',
                'Authorization': `Bearer ${this.props.token}`
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
            this.enviarEventoRefrescarMapa();
        },(error)=>{
            alert('Failed');
        })
    }
    }

    render(){
        const {
            modalTitle,
            AgenteId,
            NombreAgente,
            Tlf,
            Ubigeo,
            Direccion,
            latlng,
            estado,
            ubigeos,
            filterNombreAgente,
            currentPage, 
            itemsPerPage,
            totalPages

        }=this.state

        const filteredAgentes = this.getFilteredAgentes();

      
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;
        const currentItems = filteredAgentes.slice(indexOfFirstItem, indexOfLastItem);

        
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);}


        return(

            <div>
            
            <nav class="navbar navbar-expand-lg justify-content-between">
            <ul className="pagination ">
                {/* Botón para la página anterior */}
                <li
                className={`page-item${currentPage === 1 ? " disabled" : ""}`}
                >
                <button
                    className="page-link"
                    onClick={this.goToPreviousPage}
                >
                    Anterior
                </button>
                </li>

                {/* Números de página */}
                {pageNumbers.map((pageNumber) => (
                <li
                    key={pageNumber}
                    className={`page-item${currentPage === pageNumber ? " active" : ""}`}
                >
                    <button
                    className="page-link"
                    onClick={() => this.goToPage(pageNumber)}
                    >
                    {pageNumber}
                    </button>
                </li>
                ))}

                {/* Botón para la página siguiente */}
                <li
                className={`page-item${currentPage === totalPages ? " disabled" : ""}`}
                >
                <button
                    className="page-link"
                    onClick={this.goToNextPage}
                >
                    Siguiente
                </button>
                </li>
            </ul>

            <form class="form-inline">
                        <input
                        type="text"
                        className="form-control nav-item"
                        placeholder="Buscar NombreAgente"
                        value={filterNombreAgente}
                        onChange={this.changeFilterNombreAgente}
                         /> 
            </form>
        
            <button type="button" 
            className="btn btn-primary m-2 float-end" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
            onClick={()=>this.addClick()}
            >Agegar Agente</button>    

            </nav>
            <br></br>
            
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th>
                            AgenteId
                        </th>
                        <th>
                           NombreAgente
                        </th>

                    <th>Tlf</th>            
                    <th>Ubigeo</th>
                    <th>Direccion</th>
                    <th>Latlng</th>
                    <th>Estado</th>
                    <th>
                        Options
                    </th>
                    </tr>
                    </thead>

                    <tbody>
                        {currentItems.map((age)=>(
                            <tr key={age.AgenteId}>
                                <td>{age.AgenteId}</td>
                                <td>{age.NombreAgente}</td>
                                <td>{age.Tlf}</td>
                                <td>{age.NumeroUbigeo}</td>
                                <td>{age.Direccion}</td>
                                <td>{age.latlng}</td>
                                <td>{age.estado}</td>
                                <td>
                                    <button type="button"
                                    className="btn btn-light mr-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#exampleModal"
                                    onClick={()=>this.editClick(age)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg> 
                                    </button>
                                    <button type="button"
                                    className="btn btn-light mr-1"
                                    onClick={()=>this.deleteClick(age.AgenteId)}>
                                    
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            
                            ))}
                    </tbody>

                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">
                                    <span className="input-group-text">NombreAgente</span>
                                    <input type="text" className="form-control"
                                    value={NombreAgente}
                                    onChange={this.changeNombreAgente}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Tlf</span>
                                    <input type="text" className="form-control"
                                    value={Tlf}
                                    onChange={this.changeTlf}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Ubigeo</span>
                                    
                                    <select className="form-control" value={Ubigeo} onChange={this.changeUbigeo}>
                                    <option value="">Seleccionar Ubigeo</option>
                                        {ubigeos.map(ubi => (
                                            <option key={ubi.UbigeoId} value={ubi.UbigeoId}>
                                                {ubi.NumeroUbigeo}
                                            </option>
                                        ))}
                                    </select>

                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Direccion</span>
                                    <input type="text" className="form-control"
                                    value={Direccion}
                                    onChange={this.changeDireccion}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Latlng</span>
                                    <input type="text" className="form-control"
                                    value={latlng}
                                    onChange={this.changelatlng}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Estado</span>
                                    {/* <input type="text" className="form-control"
                                    value={estado}
                                    onChange={this.changeestado}/> */}
                                     <select className="form-control" value={estado} onChange={this.changeestado}>
                                    <option value="">Seleccione...</option>
                                    <option value="0">Inactivo</option>
                                    <option value="1">Activo</option>
                                    </select>
                                </div>

                                {/* <div>
                                        <ReCAPTCHA
                                          
                                          sitekey="6Lfeqq8mAAAAANI2S78dn1zE22t2UdXZav_cB6jG"
                                          onChange={this.handleRecaptchaChange}
                                        />
                                      </div> */}

                                {AgenteId===0?


                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.createClick()}
                                >Crear</button>
                                
                                :null}   

                                {AgenteId!==0?
                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.updateClick()}
                                >Modificar</button>
                                :null}  

                            </div>

                        </div>
                    </div>
                </div>
                
            </div>

        )
    }
}

export default Agente;
import React,{ Component } from "react";
import { variables } from "./Variables";

class Ubigeo extends Component{

    constructor(props){
        super(props);

        this.state={
            ubigeos:[],
            modalTitle:"",
            NumeroUbigeo:"",
            UbigeoId:0
        }
    }

    refreshList(){
        fetch(variables.API_URL+'ubigeo')
        .then(response=>response.json())
        .then(data=>{
            this.setState({ubigeos:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    changeNumeroUbigeo =(e)=>{
        this.setState({NumeroUbigeo:e.target.value});
    }

    changeDepartamentoUbigeo =(e)=>{
        this.setState({DepartamentoUbigeo:e.target.value});
    }

    changeProvinciaUbigeo =(e)=>{
        this.setState({ProvinciaUbigeo:e.target.value});
    }

    changeDistritoUbigeo =(e)=>{
        this.setState({DistritoUbigeo:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:"Añadir Ubigeo",
            UbigeoId:0,
            NumeroUbigeo:""
        });
    }

    editClick(ubi){
        this.setState({
            modalTitle:"Editar Ubigeo",
            UbigeoId:ubi.UbigeoId,
            NumeroUbigeo:ubi.NumeroUbigeo,
            DepartamentoUbigeo:ubi.DepartamentoUbigeo,
            ProvinciaUbigeo:ubi.ProvinciaUbigeo,
            DistritoUbigeo:ubi.DistritoUbigeo
        });
    }

    createClick(){
        fetch(variables.API_URL+'ubigeo',{
            method: 'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                NumeroUbigeo:this.state.NumeroUbigeo,
                DepartamentoUbigeo:this.state.DepartamentoUbigeo,
                ProvinciaUbigeo:this.state.ProvinciaUbigeo,
                DistritoUbigeo:this.state.DistritoUbigeo
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'ubigeo',{
            method: 'PUT',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                UbigeoId:this.state.UbigeoId,
                NumeroUbigeo:this.state.NumeroUbigeo,
                DepartamentoUbigeo:this.state.DepartamentoUbigeo,
                ProvinciaUbigeo:this.state.ProvinciaUbigeo,
                DistritoUbigeo:this.state.DistritoUbigeo
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(id){
        if(window.confirm('¿Esta seguro?')){ 
        fetch(variables.API_URL+'ubigeo/'+id,{
            method: 'DELETE',
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    }

    render(){
        const {
            ubigeos,
            modalTitle,
            UbigeoId,
            NumeroUbigeo,
            DepartamentoUbigeo,
            ProvinciaUbigeo,
            DistritoUbigeo
        }=this.state

        return(
            <div>
            <button type="button"
            className="btn btn-primary m-2 float-end"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            onClick={()=>this.addClick()}>
                Añadir Ubigeo
            </button>  
                <table className="table table-striped">
                    <thead>
                    <tr>
                    <th>
                        UbigeoId
                    </th>
                    <th>
                        NumeroUbigeo
                    </th>
                    <th>
                        DepartamentoUbigeo
                    </th>
                    <th>
                        ProvinciaUbigeo
                    </th>
                    <th>
                        DistritoUbigeo
                    </th>
                    <th>
                        Options
                    </th>
                    </tr>
                    </thead>

                    <tbody>
                        {ubigeos.map(ubi=>
                            <tr key={ubi.UbigeoId}>
                                <td>{ubi.UbigeoId}</td>
                                <td>{ubi.NumeroUbigeo}</td>
                                <td>{ubi.DepartamentoUbigeo}</td>
                                <td>{ubi.ProvinciaUbigeo}</td>
                                <td>{ubi.DistritoUbigeo}</td>
                                <td>
                                <button type="button"
                                className="btn btn-light mr-1"
                                data-bs-toggle="modal"
                                data-bs-target="#exampleModal"
                                onClick={()=>this.editClick(ubi)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                        </svg> 
                                    </button>

                                    <button type="button"
                                    className="btn btn-light mr-1"
                                    onClick={()=>this.deleteClick(ubi.UbigeoId)}>
                                    
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                                        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                            
                            )}
                    </tbody>

                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{modalTitle}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                    ></button>
                </div>

                            <div className="modal-body">
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Numero Ubigeo</span>
                                    <input type="text" className="form-control"
                                    value={NumeroUbigeo}
                                    onChange={this.changeNumeroUbigeo}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Departamento Ubigeo</span>
                                    <input type="text" className="form-control"
                                    value={DepartamentoUbigeo}
                                    onChange={this.changeDepartamentoUbigeo}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Provincia Ubigeo</span>
                                    <input type="text" className="form-control"
                                    value={ProvinciaUbigeo}
                                    onChange={this.changeProvinciaUbigeo}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Distrito Ubigeo</span>
                                    <input type="text" className="form-control"
                                    value={DistritoUbigeo}
                                    onChange={this.changeDistritoUbigeo}/>
                                </div>

                            {UbigeoId===0?
                            <button type="button"
                            className="btn btn-primary float-start"
                            onClick={()=>this.createClick()}
                            >Crear</button>
                            :null}

                            {UbigeoId!==0?
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

export default Ubigeo;

import React,{Component} from 'react';
import { variables } from '../Variables.js';

export class Agente extends Component{

    constructor(props){
        super(props);

        this.state={
            agentes:[]
        }
    }

    refreshList(){
        fetch(variables.API_URL+'agente')
        .then(response=>response.json())
        .then(data=>{
            this.setState({agentes:data});
        });
    }
    componentDidMount(){
        this.refreshList();
    }

    render(){
        const{
            agentes
        }=this.state;

        return(
            <div>
                <table>
                <tr><th>  
                AGENTES
                </th></tr>
                <tbody> 
                {agentes.map(age=>
                <tr key={age.AgenteId}>
                    <td>{age.AgenteId}</td>
                    <td>{age.latlng}</td>
                </tr>
    )}
            </tbody>
            </table>
            </div>
        )
    }
        
}


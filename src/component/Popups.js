import {Popup} from "react-leaflet";

const Popups=(props) =>{
  const { place } = props;

  const {NombreAgente, Tlf, Direccion}=place;

  return(
    <Popup>
      <div> {NombreAgente} </div>
      <div> {Tlf} </div>
      <div> {Direccion} </div>
    </Popup>
  )
}
export default Popups

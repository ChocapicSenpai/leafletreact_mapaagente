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

// const Popups = (props) =>{
//   const {name}=props.data;
//   const {tlf}=props.data;
//   const {drc}=props.data;
//     return (
//         <Popup>
//           <div> {name} </div>
//           <div> {tlf} </div>
//           <div> {drc} </div>         
//         </Popup>

//     )
// }

// export default Popups
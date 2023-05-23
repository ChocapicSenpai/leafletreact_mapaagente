import {Popup} from "react-leaflet";

const Popups = (props) =>{
  const {name}=props.data;
  const {tlf}=props.data;
  const {drc}=props.data;
    return (
        <Popup>
          <div> {name} </div>
          <div> {tlf} </div>
          <div> {drc} </div>         
        </Popup>

    )
}

export default Popups
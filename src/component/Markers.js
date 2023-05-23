import React from "react";
import { Marker, Popup} from "react-leaflet";
import {IconLocation} from "./IconLocation";
import Popups from "./Popups";


const Markers = (props) =>{

    const {places} = props;
    const markers = places.map((places,i)=>( 
        <Marker 
        key={i}
        position={places.latlng} 
        icon={IconLocation}
        >
            <Popups data={places}/>
        </Marker>    
        ));

    return markers;
    
}


export default Markers
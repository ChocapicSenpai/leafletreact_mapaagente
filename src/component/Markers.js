import React from "react";
import { Marker, Popup} from "react-leaflet";
import {IconLocation} from "./IconLocation";
import {Popups} from "./Popups";


const marcadores = [-6.771590,-79.838013]

const Markers = (props) =>{

    const {places} = props;
    const markers = places.map((places,i)=>( 
        <Marker 
        key={i}
        position={places.latlng} 
        icon={IconLocation}
        />
        ));

    return markers;
    
}


export default Markers
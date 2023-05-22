import React from "react";

import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'

import 'leaflet/dist/leaflet.css'
import Markers from "./Markers";
import data from "../assets/data.json"
import { useState } from 'react';

const position = [-6.771590,-79.838013]


const MapView = () =>{ 
    const [state, setState] = useState({
        currentLocation: {lat:'-6.771590',lng:'-79.838013'},
        zoom: 13
    })

    return <MapContainer center={state.currentLocation} zoom={state.zoom} >
        <TileLayer 
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
    
        <Markers places={data.places}/>
        
    </MapContainer>
};

export default MapView;
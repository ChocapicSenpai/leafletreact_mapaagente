import React from "react";
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import Markers from "./Markers";
//import data from "../assets/data.json"
import { useEffect, useState } from 'react';
import { variables } from "../Variables";

const MapView = () => {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch(variables.API_URL + 'agente')
            .then(response => response.json())
            .then(data => {
                setPlaces(data);
            });
    }, []);

    const defaultLocation = { lat: '-6.771590', lng: '-79.838013' };
    const defaultZoom = 10;

    return (
        <MapContainer center={defaultLocation} zoom={defaultZoom}>
            <TileLayer 
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Markers places={places} />
        </MapContainer>
    );
};

export default MapView;


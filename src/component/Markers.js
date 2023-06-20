import React from "react";
import { Marker} from "react-leaflet";
import {IconLocation} from "./IconLocation";
import Popups from "./Popups";


const Markers = (props) => {
    const { places } = props;

    const filteredPlaces = places.filter((place) => place.estado === 1);
  
    const markers = filteredPlaces.map((place, i) => {
      if (!place || !place.latlng) {
        return null;
      }
  
      const [lat, lng] = place.latlng.split(",").map((coord) => parseFloat(coord));
  
      if (isNaN(lat) || isNaN(lng)) {
        return null;
      }
  
      return (
        <Marker key={i} position={[lat, lng]} icon={IconLocation}>
          <Popups place={place} />
        </Marker>
      );
    });
  
    return markers;
  };
  
  export default Markers;

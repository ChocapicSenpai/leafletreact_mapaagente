import React from "react";
import { Marker, Popup} from "react-leaflet";
import {IconLocation} from "./IconLocation";
import Popups from "./Popups";
import { latLng } from "leaflet";

const Markers = (props) => {
    const { places } = props;
  
    const markers = places.map((place, i) => {
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

// const Markers = (props) => {
//     const { places } = props;

//     const markers = places.map((place, i) => (
//         <Marker 
//             key={i}
//             position={place.latlng}
//             icon={IconLocation}
//         >
//             <Popups data={place} />
//         </Marker>
//     ));

//     return markers;
// }

// export default Markers;


// const Markers = (props) =>{

//     const {places} = props;
//     const markers = places.map((places,i)=>( 
//         <Marker 
//         key={i}
//         position={places.latlng} 
//         icon={IconLocation}
//         >
//             <Popups data={places}/>
//         </Marker>    
//         ));

//     return markers;
    
// }


// export default Markers
import React, { useState } from "react";
import { GoogleMap, InfoWindowF, MarkerF, useLoadScript } from '@react-google-maps/api';

const Map = ({latitude, longitude, weather, state, country}) => {
    const [activeMarker, setActiveMarker] = useState('');
    const API_Key = process.env.REACT_APP_MAPS_API_KEY;

    const {isLoaded} = useLoadScript({
        googleMapsApiKey : API_Key
    });

    const marker =[
        {
            id: 1,
            position: {lat: latitude, lng: longitude},
        }
    ];

    const handleActiveMarker = (marker) =>{
        if(marker === activeMarker){
            return;
        }
        setActiveMarker(marker);
    };

    const mapContainerStyle ={
        position: 'absolute',
        top: '20%',
        left: '5%',
        width: '90%',
        height: '500px'
    }

    return(
        <div>
            {isLoaded ? (
                <GoogleMap
                    center={{lat: latitude, lng: longitude}}
                    zoom={10}
                    onClick={()=> setActiveMarker(null)}
                    mapContainerStyle={mapContainerStyle}
                >
                    {marker.map(({id, position}) =>(
                        <MarkerF
                            key={id}
                            position={position}
                            onClick={() => handleActiveMarker(id)}
                        >
                            {activeMarker === id ? (
                                <InfoWindowF onCloseClick={() => setActiveMarker(null)}>
                                    <div>
                                        <p>{weather.name}, {state}, {country}, {weather.weather[0].description}, {(weather.main.temp - 273.15).toFixed(2)}°C</p>
                                    </div>
                                </InfoWindowF>
                            ) : null}
                        </MarkerF>
                    ))}
                </GoogleMap>
            ) : null}
        </div>
    );
};

export default Map;
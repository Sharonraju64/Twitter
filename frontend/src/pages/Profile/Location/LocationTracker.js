import React, { useState } from 'react';
import axios from 'axios';
import { Box, IconButton, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Map from './Map';
import './locationtracker.css';

const LocationTracker = () => {
    const [open, setOpen] = useState('');
    const [error, setError] = useState('');
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const Weather_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
    const Location_API_Key = process.env.REACT_APP_LOCATION_API_KEY;

    const getLocation = () =>{
        setOpen(true);
        console.log(Weather_API_KEY);
        console.log(Location_API_Key);
        
        if(navigator.geolocation){
            navigator.geolocation.getCurrentPosition(showPosition, showError);
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

     const showPosition = async (position) => {
        const { latitude, longitude } = position.coords;
        try {
            const locationResopnse = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}%2C${longitude}&key=${Location_API_Key}`
            );
            console.log(locationResopnse);
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Weather_API_KEY}`
            );
            console.log(weatherResponse);
            setLocation({ latitude, longitude });
            setWeather(weatherResponse.data);
            setState(locationResopnse.data.results[0].components.state);
            setCountry(locationResopnse.data.results[0].components.country);
        } catch (error) {
            setError('Failed to fetch location or weather data.');
        }
    };

    const showError = (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setError('User denied the request for Geolocation.');
            break;
          case error.POSITION_UNAVAILABLE:
            setError('Location information is unavailable.');
            break;
          case error.TIMEOUT:
            setError('The request to get user location timed out.');
            break;
          case error.UNKNOWN_ERROR:
            setError('An unknown error occurred.');
            break;
          default:
            setError('An unknown error occurred.');
        }
      };

    const style={
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '900px',
        height: '650px',
        bgcolor: 'background.paper',
        boxShadow: '24',
        borderRadius: 8,
    };

    return(
        <div>
            <button className='locaktion-track-btn' onClick={getLocation}>Obtine Location</button>
            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"                
            >
                <Box sx={style} className='modal'>
                    <div className='head'>
                        <IconButton onClick={() =>{setOpen(false)}}><CloseIcon /></IconButton>
                        <h1 className='head-title'>Location</h1>                        
                    </div>
                    <p className='note'>Note: Click on Marker to get data</p>
                    <Map latitude={location.latitude} longitude={location.longitude} weather={weather} state={state} country={country} />
                </Box>
            </Modal>
            
        </div>
    );
};

export default LocationTracker;
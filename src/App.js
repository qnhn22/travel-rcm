import React, { useState, useEffect } from "react";
import Header from './components/Header/Header';
import List from './components/List/List';
import Helmet from 'react-helmet';
import Map from "./components/Map";
import Grid from '@mui/material/Grid';
import { getPlacesData } from "./api";


export default function App() {
  const [coords, setCoords] = useState({});
  const [bounds, setBounds] = useState({});
  const [places, setPlaces] = useState([])
  const [childClicked, setChildClicked] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('attractions');
  const [rating, setRating] = useState('all');
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoords({ lat: latitude, lng: longitude });
    });
  }, []);

  useEffect(() => {
    const filtered = places.filter((place) => Number(place.rating) > rating);

    setFilteredPlaces(filtered);
  }, [rating]);

  useEffect(() => {
    setIsLoading(true)
    getPlacesData(type, bounds.sw, bounds.ne).then((data) => {
      setPlaces(data)
      setFilteredPlaces([]);
      setIsLoading(false)
    })
  }, [type, coords, bounds]);

  return (
    <div className="">
      <Helmet bodyAttributes={{ style: 'background-color : #F3F4F6' }} />
      <Header />
      <Grid container spacing={3} styles={{ width: '100%' }} >
        <Grid item xs={12} md={4} >
          <main className="flex-grow justify-end ml-6">
            <List places = {filteredPlaces.length ? filteredPlaces : places}
            childClicked={childClicked}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}/>
            
          </main>
        </Grid>
        <Grid item xs={12} md={8} >
          <Map 
            setCoords={setCoords}
            setBounds={setBounds}
            coords={coords}
            places={filteredPlaces.length ? filteredPlaces : places}
            setChildClicked={setChildClicked}            
          />
        </Grid>
      </Grid>


    </div>

  )
}

'use client';

import { useState } from "react";
import Data from "./components/Data";
import LngLat from "./components/LngLat";


export default function Home() {
  
  const [data, setData] = useState(null);
  const [date, setDate] = useState('')

  const handleDate = (v) => {
    setDate(v.target.value)
  };

  const handleSubmit = () => {
    const coordinates = {
      userLat: [lat1, lat2, lat3, lat4, lat5],
      userLng: [lng1, lng2, lng3, lng4, lng5],
    };
    const coordsArray = {
      userLat: Object.values(coordinates.userLat),
      userLng: Object.values(coordinates.userLng),
    };
    //console.log(coordsArray)
    fetch('http://localhost:4000/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({coordinates: coordsArray, date: date}),
      })
      .then((res) => res.json())
      .then((data) => {
        //console.log('Server Res', data);
        setData(data);
      })
      .catch((error) => {
        console.error('Error', error)
      });
  };



  return (
    <main id="page-wrapper">
      <LngLat data={data} setData={setData} date={date} handleDate={handleDate}/>
      <div className='co-ords-div-button'>
        <button className='btn btn-coords' onClick={handleSubmit}>Submit</button>
      </div>
      <Data data={data} setData={setData} date={date}/>
    </main>
  )
}

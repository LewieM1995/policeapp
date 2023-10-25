import { useEffect, useState } from 'react';
import './lnglat.css';
import Dropwdown from './Select';
import Encounters from './Encounters';

function Data ({data, setData, date, selectedValue}) {

  
  const [city, setCity] = useState('')
  const [loading, setLoading] = useState();

  const location = [
    { label: 'London', lat: [51.5890,  51.3409, 51.3957, 51.6452, 51.58901], lng: [-0.4861, -0.4586, 0.3543, 0.2664, -0.4916]},
    { label: 'Manchester', lat: [53.5109, 53.2898, 53.3866, 53.5925, 53.5141], lng: [-2.5598, -2.4746, -1.9198, -2.0681, -2.5653]},
    { label: 'Kent', lat: [51.3711, 51.4064, 51.3674, 51.3164, 51.3719], lng: [-359.5241, -359.4578, -359.3634, -359.4235, -359.5244]}
  ];

  

  const handleCity = (city) => {
    setCity(city)
    console.log(city)
  };
  
  useEffect(() => {
    if (city) {
      setLoading(true);
      fetch('http://localhost:4000/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        city: city,
        date: date,
        searchType: selectedValue
      }),
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
        //console.log('Server:', data);
      })
      .catch((error) => {
        console.error('Error', error);
      });
    }
  }, [city]);
  
  

  return (
    <div>
      <h3 style={{margin: 'auto', width: '600px', textAlign: 'center'}} >Choose a City/Town or Enter your own Latitude & Longitude</h3>
        <div className='dropdown-container'>
          <Dropwdown
            options={location}
            value={city}
            onChange={handleCity}/>
      </div>
    {loading ? (
      <h2 style={{ textAlign: 'center', paddingTop: '1rem' }}>Loading...</h2>
    ) : (
     <Encounters data={data} />
    )}
    </div>
  )
}

export default Data
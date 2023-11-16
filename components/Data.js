import { useEffect, useState } from 'react';
import './styles.css';
import Dropdown from './Dropdown';
import Encounters from './Encounters';

function Data ({data, setData, date}) {

  const [city, setCity] = useState('')
  const [loading, setLoading] = useState();

  const location = [
    { label: 'London', lat: [51.5890,  51.3409, 51.3957, 51.6452, 51.58901], lng: [-0.4861, -0.4586, 0.3543, 0.2664, -0.4916]},
    { label: 'Manchester', lat: [53.5109, 53.2898, 53.3866, 53.5925, 53.5141], lng: [-2.5598, -2.4746, -1.9198, -2.0681, -2.5653]},
    { label: 'Birmingham', lat: [52.65, 52.40, 52.39, 52.62, 52.65], lng: [-362.22, -362.221, -361.63, -361.61, -362.22]},
    { label: 'Leeds', lat: [53.89, 53.61, 53.62, 53.88, 53.89], lng: [-361.85, -361.841, -361.32, -361.35, -361.85]},
    { label: 'Essex', lat: [51.49, 51.65, 51.93, 51.85, 51.48], lng: [-359.12,-359.78, -359.60, -358.68, -359.12]},
  ];

  const handleCity = (city) => {
    setCity(city)
    //console.log(city)
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
      <h3 style={{margin: 'auto', width: '600px', textAlign: 'center'}} >Choose a City/Town from the dropdown or Enter your own Latitude & Longitude above</h3>
        <div className='dropdown-container'>
          <Dropdown
            options={location}
            value={city}
            onChange={handleCity}
            />
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
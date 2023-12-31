import React, { useEffect, useState } from 'react';
import './styles.css';
import Dropdown from './Dropdown';
import Encounters from './Encounters';
import LoadingSpinner from '../../../shared components/LoadingSpinner';

const Data = ({ data, setData, date }) => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState();
  const [error, setError] = useState(null);

  const location = [
    { label: 'London', lat: [51.5890, 51.3409, 51.3957, 51.6452, 51.58901], lng: [-0.4861, -0.4586, 0.3543, 0.2664, -0.4916] },
    { label: 'Manchester', lat: [53.5109, 53.2898, 53.3866, 53.5925, 53.5141], lng: [-2.5598, -2.4746, -1.9198, -2.0681, -2.5653] },
    { label: 'Avon & Somerset', lat: [51.6299, 51.158, 50.85, 50.98, 51.34], lng: [-2.55, -3.2931, -2.856, -2.194, -2.021] },
    { label: 'Bedfordshire', lat: [52.039, 51.85, 52.23, 52.24, 52.037], lng: [-0.355, -0.174, 0.2540, 0.214, -0.068] }
  ];

  const handleCity = (city) => {
    setCity(city);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (city) {
          setLoading(true);
          const response = await fetch('https://policeappserver.duckdns.org:4000/policeapp/location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              city: city,
              date: date,
            }),
          });
  
          console.log('Res:', response);
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const data = await response.json();
          setData(data);
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [city]);
  

  return (
    <section className='dropdown&output-section'>
      <h3 style={headerStyle}>Choose a City/Town from the dropdown or Enter your own Latitude & Longitude above</h3>
      <p style={headerStyle}>(London will have slower load times)</p>
      <div className='dropdown-container'>
        <Dropdown
          options={location}
          value={city}
          onChange={handleCity}
        />
      </div>
      {!error ? <p style={{textAlign:'center'}} >{error}</p> : null}
      {loading ? (
        <>
        <LoadingSpinner />
        <h2 style={loadingStyle}>Loading...</h2>
        </>
      ) : (
        <Encounters data={data} date={date} />
      )}
    </section>
  );
};

const headerStyle = { margin: 'auto', width: '90%', textAlign: 'center' };
const loadingStyle = { textAlign: 'center', paddingTop: '5px' };

export default Data;

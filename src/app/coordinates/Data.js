import React, { useEffect, useRef, useState } from 'react';
import './styles.css';
import Dropdown from './Dropdown';
import Encounters from './Encounters';


const Data = ({ data, setData, date }) => {
  
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState({
    overall: false,
    outcomeWithCounts: false,
    searchObjectCount: false,
    ethnicityCount: false,
  });
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
          if (loading.overall) {
            setData({
              males: 0,
              females: 0,
              date: '',
              searchObjectCount: [],
              outcomeWithCounts: [],
              ethnicityCount: [],
            });
          }
          setLoading(prevLoading => ({...prevLoading, overall: true, outcomeWithCounts: true, searchObjectCount: true, ethnicityCount: true, }));
          const response = await fetch('http://localhost:4000/location', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              city: city,
              date: date,
            }),
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const reader = response.body.getReader();
          let partialData = '';
  
          while (true) {
            const { done, value } = await reader.read();
  
            if (done) {
              break;
            }
  
            const chunk = typeof value === 'string' ? value : new TextDecoder().decode(value);
  
            partialData += chunk;
  
            if (chunk.endsWith('\n')) {
              try {
                const jsonData = JSON.parse(partialData.trim());
                setData(prevData => ({ ...prevData, ...jsonData }));
                if (jsonData.outcomeWithCounts) {
                  setLoading(prevLoading => ({ ...prevLoading, outcomeWithCounts: false }));
                }
                if (jsonData.searchObjectCount) {
                  setLoading(prevLoading => ({ ...prevLoading, searchObjectCount: false }));
                }
                if (jsonData.ethnicityCount) {
                  setLoading(prevLoading => ({ ...prevLoading, ethnicityCount: false }));
                }

                partialData = '';
              } catch (error) {
                console.error('Error parsing JSON:', error);
                console.log('Problematic JSON chunk:', partialData);
              }
            }
          }
        }
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(prevLoading => ({ ...prevLoading, overall: false }));
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
        <Encounters data={data} date={date} error={error} loading={loading}/>
    </section>
  );
};

const headerStyle = { margin: 'auto', width: '90%', textAlign: 'center' };


export default Data;

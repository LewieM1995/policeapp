import React, { useEffect, useState } from 'react';
import './styles.css';
import Dropdown from './Dropdown';
import Encounters from './Encounters';


const Data = ({ data, setData, date, loading, setLoading, error, setError }) => {
  
  const [city, setCity] = useState('');
  const [clientError, setClientError] = useState('');

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
    setError('');
    setClientError('');
    const fetchData = async () => {
      try {
        if (city) {
          if (!loading.overall) {
            setData({
              males: null,
              females: null,
              date: '',
              searchObjectCount: [],
              outcomeWithCounts: [],
              ethnicityCount: [],
            });
          }
          setLoading(prevLoading => ({...prevLoading, overall: true, outcomeWithCounts: true, searchObjectCount: true, ethnicityCount: true, }));
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

          if (response.status === 404) {
            setLoading(false);
            setClientError('No data in api for this date, try another date');
            throw new Error('API returned a 404 error');
          }
  
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
  
          const reader = response.body.getReader();
          let partialData = '';
          //console.log(reader)
  
          while (true) {
            const { done, value } = await reader.read();
            //console.log(value)
  
            if (done) {
              break;
            }
            
            const chunk = new TextDecoder().decode(value);
            //console.log(chunk)
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
        setLoading(false);
        setClientError('api has no data for this date, please try another date');
        console.error('Error:', error);
      } finally {
        setLoading(prevLoading => ({ ...prevLoading, overall: false }));
      }
    };
    fetchData();
  }, [city]);
  
  return (
    <section className='dropdown&output-section'>
      <h3 style={headerStyle}>Enter a date and choose a city from the dropdown or enter your own coordinates</h3>
      <p style={errorStyle}>{clientError}</p>
      <p style={errorStyle}>(London will have slower load times)</p>
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
const errorStyle = { margin: "10px auto", width: '90%', textAlign: 'center', color: "red" };


export default Data;

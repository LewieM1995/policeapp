import { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

//Components and Styles
import './styles.css';
import CoordinateInput from './CoordinateInput';
import AppInfo from './AppInfo';


const LngLat = ({ date, handleDate, setData, error, setLoading, data, setError }) =>  {

  const [lat1, setLat1] = useState("");
  const [lng1, setLng1] = useState("");
  const [lat2, setLat2] = useState("");
  const [lng2, setLng2] = useState("");
  const [lat3, setLat3] = useState("");
  const [lng3, setLng3] = useState("");

  const handleLat1 = (v) => {
    setLat1(v.target.value)
  };
  const handleLng1 = (v) => {
    setLng1(v.target.value)
  };
  const handleLat2 = (v) => {
    setLat2(v.target.value)
  };
  const handleLng2 = (v) => {
    setLng2(v.target.value)
  };
  const handleLat3 = (v) => {
    setLat3(v.target.value)
  };
  const handleLng3 = (v) => {
    setLng3(v.target.value)
  };


  const isFormValid = (coordinates) => {
    if (!coordinates || !date){
      document.getElementById("btn btn-coords"); 
      submitButton.disabled = true;
    } else {
      return coordinates && date;
    }
  };

  const handleFetch = async (coordsArray) => {
    try {
      const response = await fetch('https://policeappserver.duckdns.org:4000/policeapp/location', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ coordinates: coordsArray, date: date }),
      });

      if (response.status === 404) {
        setError('No data in api for this date, try another date');
        setLoading(false);
        throw new Error('API returned a 404 error');
      }

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
            setData((prevData) => ({ ...prevData, ...jsonData }));
            
            if (jsonData.outcomeWithCounts) {
              setLoading((prevLoading) => ({ ...prevLoading, outcomeWithCounts: false }));
            }
            if (jsonData.searchObjectCount) {
              setLoading((prevLoading) => ({ ...prevLoading, searchObjectCount: false }));
            }
            if (jsonData.ethnicityCount) {
              setLoading((prevLoading) => ({ ...prevLoading, ethnicityCount: false }));
            }
            partialData = '';
          } catch (error) {
            console.error('Error', error);
          }
        }
      }
    } catch (error) {
      console.error('Error', error);
      const responseText = await response.text();
      console.log('Response Text:', responseText);
    } finally {
      setLoading((prevLoading) => ({ ...prevLoading, overall: false }));
    }
  };

  const handleSubmit = async () => {
    setError('')
    try {
      const coordinates = {
        userLat: [lat1, lat2, lat3],
        userLng: [lng1, lng2, lng3],
      };

      const coordsArray = {
        userLat: Object.values(coordinates.userLat),
        userLng: Object.values(coordinates.userLng),
      };

      if (isFormValid(coordinates)) {
        setLoading((prevLoading) => ({
          ...prevLoading,
          overall: true,
          outcomeWithCounts: true,
          searchObjectCount: true,
          ethnicityCount: true,
        }));

        await handleFetch(coordsArray);
      }
    } catch (error) {
      console.error('Error', error);
      setError('1 or 3 pairs of coordinates required and make sure to select a valid date');
    } finally {
      setLoading((prevLoading) => ({
        ...prevLoading,
        overall: false,
        outcomeWithCounts: false,
        searchObjectCount: false,
        ethnicityCount: false,
      }));
    }
  };

  const coordinates = [
    { label1: "Latitude 1", value1: lat1, onChange1: handleLat1, placeholder1: "51.5890", label2: "Longitude 1", value2: lng1, onChange2: handleLng1, placeholder2: "-0.4861" },
    { label1: "Latitude 2", value1: lat2, onChange1: handleLat2, placeholder1: "51.3409", label2: "Longitude 2", value2: lng2, onChange2: handleLng2, placeholder2: "-0.4586" },
    { label1: "Latitude 3", value1: lat3, onChange1: handleLat3, placeholder1: "51.3957", label2: "Longitude 3", value2: lng3, onChange2: handleLng3, placeholder2: "0.3543" }
  ];

return (
  <>
    <AppInfo />
    <div className='co-ords-wrapper'>
      {coordinates.map((coordinate, index) => (
        <CoordinateInput
          key={index}
          label1={coordinate.label1}
          value1={coordinate.value1}
          onChange1={coordinate.onChange1}
          placeholder1={coordinate.placeholder1}
          label2={coordinate.label2}
          value2={coordinate.value2}
          onChange2={coordinate.onChange2}
          placeholder2={coordinate.placeholder2}
        />
      ))}
    </div>
    <div className="date-submit-container">
      {error && <div style={errorStyle}>{error}</div>}
      <div className='centered-content'>
        <label>Date: </label>
        <Datetime 
          dateFormat='YYYY-MM'
          timeFormat={false}
          onChange={(selectedDate) => handleDate(selectedDate)}
          value={date}
          inputProps={{ id: 'dateInput' }} 
          closeOnSelect={true}
          />
        <button className='btn btn-coords' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  </>
  )
};

export default LngLat

const errorStyle = { color: "red", textAlign: 'center' };

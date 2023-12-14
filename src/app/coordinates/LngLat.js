import { useState } from 'react';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";

//Components and Styles
import './styles.css';
import CoordinateInput from './CoordinateInput';
import AppInfo from './AppInfo';


function LngLat ( { date, handleDate, setData, setLoading, error} ) {


  
  const [lat1, setLat1] = useState("");
  const [lng1, setLng1] = useState("");
  const [lat2, setLat2] = useState("");
  const [lng2, setLng2] = useState("");
  const [lat3, setLat3] = useState("");
  const [lng3, setLng3] = useState("");
  const [lat4, setLat4] = useState("");
  const [lng4, setLng4] = useState("");
  const [lat5, setLat5] = useState("");
  const [lng5, setLng5] = useState("");

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
  const handleLat4 = (v) => {
    setLat4(v.target.value)
  };
  const handleLng4 = (v) => {
    setLng4(v.target.value)
  };
  const handleLat5 = (v) => {
    setLat5(v.target.value)
  };
  const handleLng5 = (v) => {
    setLng5(v.target.value)
  };


  const isFormValid = () => {
    return coordinates && coordinates.length >= 1 && date;
  };

  const handleSubmit = () => {
    setLoading(true);
    const coordinates = {
      userLat: [lat1, lat2, lat3, lat4, lat5],
      userLng: [lng1, lng2, lng3, lng4, lng5],
    };
    const coordsArray = {
      userLat: Object.values(coordinates.userLat),
      userLng: Object.values(coordinates.userLng),
    };
    if (isFormValid()){
      fetch('https://policeappserver.duckdns.org:4000/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({coordinates: coordsArray, date: date}),
      })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error', error)
      });
    }
  };

return (
  <>
    <AppInfo />
      <div className='co-ords-wrapper'>
        <CoordinateInput
          label1="Latitude 1" value1={lat1} onChange1={handleLat1} placeholder1="51.5890"
          label2="Longitude 1" value2={lng1} onChange2={handleLng1} placeholder2="-0.4861"
        />
        <CoordinateInput
          label1="Latitude 2" value1={lat2} onChange1={handleLat2} placeholder1="51.3409"
          label2="Longitude 2" value2={lng2} onChange2={handleLng2} placeholder2="-0.4586"
        />
        <CoordinateInput
          label1="Latitude 3" value1={lat3} onChange1={handleLat3} placeholder1="51.3957"
          label2="Longitude 3" value2={lng3} onChange2={handleLng3} placeholder2="0.3543"
        />
        <CoordinateInput
          label1="Latitude 4" value1={lat4} onChange1={handleLat4} placeholder1="51.6452"
          label2="Longitude 4" value2={lng4} onChange2={handleLng4} placeholder2="0.2664"
        />
        <CoordinateInput
          label1="Latitude 5" value1={lat5} onChange1={handleLat5} placeholder1="51.5890"
          label2="Longitude 5" value2={lng5} onChange2={handleLng5} placeholder2="-0.4916"
        />
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
          inputProps={{ id: 'dateInput' }} />
        <button className='btn btn-coords' onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  </>
  )
};

export default LngLat

const errorStyle = { color: "red", textAlign: 'center' };

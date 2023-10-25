import { useState } from 'react';
import './lnglat.css';
import { Button } from 'react-bootstrap';


function LngLat ( {setData, date, handleDate, selectedValue} ) {

  
  const [lat1, setLat1] = useState('')
  const [lng1, setLng1] = useState('')
  const [lat2, setLat2] = useState('')
  const [lng2, setLng2] = useState('')
  const [lat3, setLat3] = useState('')
  const [lng3, setLng3] = useState('')
  const [lat4, setLat4] = useState('')
  const [lng4, setLng4] = useState('')
  const [lat5, setLat5] = useState('')
  const [lng5, setLng5] = useState('')

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
  

  const handleSubmit = () => {
    const coordinates = {
      userLat: [lat1, lat2, lat3, lat4, lat5],
      userLng: [lng1, lng2, lng3, lng4, lng5],
    };
    const coordsArray = {
      userLat: Object.values(coordinates.userLat),
      userLng: Object.values(coordinates.userLng),
    };
    console.log(coordsArray)

    fetch('http://localhost:4000/location', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({coordinates: coordsArray, date: date, searchType: selectedValue}),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log('Server Res', data);
        setData(data);
      })
      .catch((error) => {
        console.error('Error', error)
      });
  };


  return (
    <form>
    <h1 style={{textAlign: 'center'}}>United Kingdom Crime Stats</h1>
    <p style={{textAlign: 'center', fontSize: '25px'}}>You must enter either one pair or 3+ pairs. Enter a date or it will default to 2023-05</p>
    <p style={{textAlign: 'center', fontSize: '25px'}}>You might find <a href='https://www.keene.edu/campus/maps/tool/' >this</a> useful </p>
      <div className='co-ords-wrapper'>
        <div className="co-ords-container">
          <label>Latitude 1:</label>
          <input type="number" value={lat1} onChange={handleLat1} placeholder='51.5890' />
          <label>Longitude 1:</label>
          <input type="number" value={lng1}  onChange={handleLng1} placeholder='-0.4861'/>
        </div>
        <div className="co-ords-container">
          <label>Latitude 2:</label>
          <input type="number"  value={lat2}  onChange={handleLat2} placeholder='51.3409'/>
          <label>Longitude 2:</label>
          <input type="number"  value={lng2}  onChange={handleLng2} placeholder='-0.4586'/>
        </div>
        <div className="co-ords-container">
          <label>Latitude 3:</label>
          <input type="number"   value={lat3}  onChange={handleLat3} placeholder='51.3957'/>
          <label>Longitude 3:</label>
          <input type="number"  value={lng3}  onChange={handleLng3} placeholder='0.3543'/>
        </div>
        <div className="co-ords-container">
          <label>Latitude 4:</label>
          <input type="number"  value={lat4}  onChange={handleLat4} placeholder='51.6452'/>
          <label>Longitude 4:</label>
          <input type="number"  value={lng4}  onChange={handleLng4} placeholder='0.2664'/>
        </div>
        <div className="co-ords-container">
          <label>Latitude 5:</label>
          <input type="number"  value={lat5}  onChange={handleLat5} placeholder='51.5890'/>
          <label>Longitude 5:</label>
          <input type="number"  value={lng5}  onChange={handleLng5} placeholder='-0.4916'/>
        </div>
        <div className="co-ords-container">
            <label>Date</label>
            <input type='text' placeholder='YYYY-MM' value={date} onChange={handleDate}/>
            <Button onClick={handleSubmit}>Search</Button>
        </div>
      </div>
    </form>
  )
}

export default LngLat
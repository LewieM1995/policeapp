import React, { useState, useRef } from "react";
import Dropdown from "../../coordinates/Dropdown";
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import LoadingSpinner from "../../../../shared components/LoadingSpinner";




const FetchForce = ({ dropdown, handleDropDown, listData, date, setDate, setData, forcename }) => {
  const options = listData.map((item) => ({ value: item.id, label: item.name }));
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [forceLoading, setForceLoading] = useState('');

  const handleDate = (selectedDate) => {
    /* Some redundant code previous version of input 
    const inputDate = e.target.value;
    const regex = /^(?:\d{4})-(?:0[1-9]|1[0-2])$/;
    setDate(inputDate);
    setError(regex.test(inputDate) || inputDate === "" ? "" : "Invalid date format. Please use YYYY-MM."); */

    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    
    if (currentDate.getMonth() < 3) {
      threeMonthsAgo.setFullYear(currentDate.getFullYear() - 1);
      threeMonthsAgo.setMonth(currentDate.getMonth() + 9); 
    } else {
      threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
    }
  
    const dateObject = new Date(selectedDate);
  
    if (dateObject < threeMonthsAgo) {
      const formattedDate = `${dateObject.getFullYear()}-${(dateObject.getMonth() + 1).toString().padStart(2, '0')}`;
      setDate(formattedDate);
      setError('');
    } else {
      setError("The API isn't always up to date, use a date earlier in the year.");
      document.getElementById('form-wrapper').focus();
    }

  };
  

  const isFormValid = () => {
    return dropdown.value && date;
  };
  
  const handleFunction = (e) => {
    setForceLoading(null);
    setLoading(true);
    e.preventDefault();
    if (isFormValid()){
      fetch('https://policeappserver.duckdns.org:4000/byforce', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({dropdownvalue: dropdown.value, date: date}),
        })
        .then((res) => {
          console.log('Res:', res);
          return res.json();
        })
        .then((data) => {
          //console.log('Server Res', data);
          setData(data);
          setForceLoading(`${forcename} - ${date}`);
          setLoading(false);
          //console.log('DATA:', data);
        })
        .catch((error) => {
          console.error('Error', error)
        });
      } 
  };


  return (
    <section id="form-wrapper">
      <form className='form' onSubmit={handleFunction}>
        <div className="form-inside">
          <Dropdown
            options={options}
            initialValue={'2023-03'}
            value={dropdown}
            onChange={handleDropDown}
            getOptionLabel={options}
          />
        </div>
        <div className="form-inside-date" >
        {error && <div style={errorStyle}>{error}</div>}
          <label>Enter a Date:</label>
          <Datetime 
            dateFormat='YYYY-MM'
            timeFormat={false}
            onChange={(selectedDate) => handleDate(selectedDate)}
            value={date}
            inputProps={{ id: 'dateInput' }}
            closeOnSelect={true}
          />
        </div>
        <div className="form-inside">
          <button className="btn" type="submit">Submit</button>
        </div>
        <div style={{textAlign: 'center', marginBottom: '1rem', marginTop:'1rem'}}>
          {loading ? (<LoadingSpinner/>) : <h3>{forceLoading}</h3>}
        </div>
      </form>
    </section>
  );
};

const errorStyle = { color: "red" };

export default FetchForce;

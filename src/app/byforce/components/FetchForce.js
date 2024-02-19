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
    const currentDate = new Date();
    const minDate = new Date(2020, 12);
    const inputDate = new Date(selectedDate);

    if (inputDate <= currentDate && inputDate >= minDate) {
      const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}`;
      setDate(formattedDate);
      console.log(formattedDate);
      setError('');
    } else {
      if (inputDate > currentDate) {
        setError("Cannot select a date in the future.");
      } else if (inputDate < minDate) {
        setError("Please choose a date on or after January 2021.");
      }
      //removing focus - testing 
      document.getElementById('dateInput').focus();
    }
  };


  const isFormValid = () => {
    return dropdown.value && date;
  };

  const handleFunction = async (e) => {
    try {
      setForceLoading(null);
      setLoading(true);
      e.preventDefault();

      if (isFormValid()) {
        const response = await fetch('https://policeappserver.duckdns.org:4000/policeapp/byforce', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ dropdownvalue: dropdown.value, date: date }),
        });
        //console.log('Res:', response);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setData(data);
        //console.log(data);
        setForceLoading(`${forcename} - ${(data[0].date) || data[0].datetime.slice(0,7)}`);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
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
          <br/>
          {date === "2024-01" ? <p>Date may default to 2023-11 if the API hasn't updated current month</p> : null }
        </div>
        <div className="form-inside">
          <button className="btn" type="submit">Submit</button>
        </div>
        <div style={{ textAlign: 'center', marginBottom: '1rem', marginTop: '1rem' }}>
          {loading ? (<LoadingSpinner />) : <h3>{forceLoading}</h3>}
        </div>
      </form>
    </section>
  );
};

const errorStyle = { color: "red" };

export default FetchForce;

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
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 3);
  
    const minDate = new Date('2020-12');
    const inputDate = new Date(selectedDate);

    if (
      inputDate <= currentDate && // Check if the selected date is current or in the future
      inputDate >= minDate && // Check if the selected date is on or after December 2021
      inputDate > threeMonthsAgo // Check if the selected date is not within the past three months
    ) {
      const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}`;
      setDate(formattedDate);
      setError('');
    } else {
      if (inputDate > currentDate) {
        setError("Cannot select a date in the future.");
      } else (inputDate < minDate) {
        setError("Please choose a date on or after December 2020.");
      }
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
      fetch('https://policeappserver.duckdns.org:4000/policeapp/byforce', {
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

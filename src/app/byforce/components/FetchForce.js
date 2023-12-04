import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";


const FetchForce = ({ dropdown, handleDropDown, listData, date, setDate, setData, forcename }) => {
  const options = listData.map((item) => ({ value: item.id, label: item.name }));
  const [error, setError] = useState("");
  const [forceLoading, setForceLoading] = useState('');

  const handleDate = (e) => {
    /* Some redundant code previous version of input */
    const inputDate = e.target.value;
    const regex = /^(?:\d{4})-(?:0[1-9]|1[0-2])$/;

    setDate(inputDate);

    setError(regex.test(inputDate) || inputDate === "" ? "" : "Invalid date format. Please use YYYY-MM.");
  };

  const handleFunction = (e) => {
    setForceLoading(null)
    e.preventDefault();
    {
      fetch('http://localhost:4000/byforce', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({dropdownvalue: dropdown.value, date: date}),
      })
      .then((res) => res.json())
      .then((data) => {
        //console.log('Server Res', data);
        setData(data);
        setForceLoading(`${forcename} - ${date}`);
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
            value={dropdown}
            onChange={handleDropDown}
            getOptionLabel={options}
          />
        </div>
        <div className="form-inside-date" >
          {error && <div style={errorStyle}>{error}</div>}
          <label>Enter a Date:</label>
          <input
            type="month"
            value={date}
            onChange={handleDate}
            placeholder="YYYY-MM"
          />
        </div>
        <div className="form-inside">
          <button className="btn btn-submit" type="submit">Submit</button>
        </div>
        <div style={{textAlign: 'center', marginBottom: '1rem', marginTop:'1rem'}}>
          <h3>{forceLoading}</h3>
        </div>
      </form>
    </section>
  );
};

const errorStyle = { color: "red" };

export default FetchForce;
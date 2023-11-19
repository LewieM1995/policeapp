import React, { useState } from "react";
import Dropdown from "../../components/Dropdown";

const FetchForce = ({ dropdown, handleDropDown, data, date, setDate, setData }) => {
  const options = data.map((item) => ({ value: item.id, label: item.name }));
  const [error, setError] = useState("");

  const handleDate = (e) => {
    const inputDate = e.target.value;
    const regex = /^(?:\d{4})-(?:0[1-9]|1[0-2])$/;

    setDate(inputDate);

    setError(regex.test(inputDate) || inputDate === "" ? "" : "Invalid date format. Please use YYYY-MM.");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`https://data.police.uk/api/stops-force?force=${dropdown.value}&date=${date}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => { 
        //const dataWithIds = data.map((item, index) => ({ id: index + 1, ...item }));
        setData(data);
        console.log(data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <section id="form-wrapper">
      <form className='form' onSubmit={handleSubmit}>
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
      </form>
    </section>
  );
};

const errorStyle = { color: "red" };

export default FetchForce;
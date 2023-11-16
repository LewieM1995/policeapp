
import { useState } from "react";
import Dropdown from "./Dropdown";


export default function ForceFetch({
  dropdown,
  handleDropDown,
  data,
  date,
  setDate,
  setData
}) {
  const options = data.map((item) => ({ value: item.id, label: item.name }));

  const [error, setError] = useState("");

  const handleDate = (e) => {
    const inputDate = e.target.value;
    const regex = /^(?:\d{4})-(?:0[1-9]|1[0-2])$/;

    setDate(inputDate);

    if (!regex.test(inputDate) && inputDate !== "") {
      setError("Invalid date format. Please use YYYY-MM.");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(
      `https://data.police.uk/api/stops-no-location?force=${dropdown.value}&date=${date}`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        //console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <div style={{width:'500px', margin:'auto'}}>
          <Dropdown
            options={options}
            value={dropdown}
            onChange={handleDropDown}
            getOptionLabel={options}
          />
        </div>
        <div style={{width:'500px', margin:'10px auto'}}>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <label style={{marginRight:'5px'}}>Date:</label>
          <input
            type="text"
            value={date}
            onChange={handleDate}
            placeholder="YYYY-MM"
            style={{width:'80px'}}
          />
        </div>
        <div style={{width:'500px', margin:'auto', display:'flex', justifyContent:'center' }}>
          <button style={{width:'80px', height:'25px', background:'lightblue', border:'1px black solid', borderRadius:'5px', cursor:'pointer'}} type="submit">Submit</button>
        </div>
      </form>
    </section>
  );
}

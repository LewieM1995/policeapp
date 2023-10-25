
'use client';

import { useState } from "react";
import Data from "../../components/Data";
import LngLat from "../../components/LngLat";
import RadioButton from "../../components/RadioButton";


export default function Home() {
  //fetch(`https://data.police.uk/api/stops-street?ploy=${poly}&data=${date}`)
  const [data, setData] = useState(null);
  const [date, setDate] = useState('')
  const [selectedValue, setSelectedValue] = useState('');

  const radioButtonOptions = [
    { label: "Stop & Search", value: "Stop&Search"},
    { label: "Crime By Location", value: "CrimeByLocation" }
  ];

  const handleDate = (v) => {
    setDate(v.target.value)
  };

  const handleRadioChange = (value) => {
    if (selectedValue === value) {
      // If the same option is clicked again, deselect it
      setSelectedValue('');
    } else {
      setSelectedValue(value);
    }
  };

  return (
    <main >
      <div>
        <RadioButton radioButtonOptions={radioButtonOptions} handleRadioChange={handleRadioChange} selectedValue={selectedValue} />
        <LngLat data={data} setData={setData} date={date} handleDate={handleDate} selectedValue={selectedValue}/>
      </div>
      <Data data={data} setData={setData} date={date} selectedValue={selectedValue}/>
    </main>
  )
}

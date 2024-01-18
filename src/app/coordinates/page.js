
'use client';

import { useState } from "react";
import Data from "./Data";
import LngLat from "./LngLat";


const CoordinatesPage = () => {
  
  const [data, setData] = useState({
    males: 0,
    females: 0,
    searchObjectCount: [],
    outcomeWithCounts: [],
    ethnicityCount: [],
    date: '',
  });

  const [loading, setLoading] = useState({
    overall: false,
    outcomeWithCounts: false,
    searchObjectCount: false,
    ethnicityCount: false,
  });
  
  const [date, setDate] = useState();
  const [error, setError] = useState();

  const handleDate = (selectedDate) => {
    const currentDate = new Date();
    const minDate = new Date(2020, 12);
    const inputDate = new Date(selectedDate);

    if (inputDate <= currentDate && inputDate >= minDate) {
      const formattedDate = `${inputDate.getFullYear()}-${(inputDate.getMonth() + 1).toString().padStart(2, '0')}`;
      setDate(formattedDate);
      setError('');
    } else {
      if (inputDate > currentDate) {
        setError("Cannot select a date in the future.");
      } else if (inputDate < minDate) {
        setError("Please choose a date on or after January 2021.");
      }
      //document.getElementById('dateInput').focus();
    }
  };

  return (
    <main id="page-wrapper">
      <LngLat data={data} setData={setData} date={date} handleDate={handleDate} error={error} setError={setError} loading={loading} setLoading={setLoading} />
      <Data data={data} setData={setData} date={date} loading={loading} setLoading={setLoading} />
    </main>
  )
}


export default CoordinatesPage;

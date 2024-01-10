
'use client';

import { useState } from "react";
import Data from "./Data";
import LngLat from "./LngLat";
import LoadingSpinner from "../../../shared components/LoadingSpinner";


const CoordinatesPage = () => {
  
  const [data, setData] = useState({
    males: 0,
    females: 0,
    searchObjectCount: [],
    outcomeWithCounts: [],
    ethnicityCount: [],
    date: '',
  });
  const [date, setDate] = useState();
  const [loading, setLoading] = useState();
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
      <LngLat data={data} setData={setData} date={date} handleDate={handleDate} setLoading={setLoading} error={error} setError={setError} />
      {loading ? (
        <>
        <LoadingSpinner />
        <h2 style={loadingStyle}>Loading...</h2>
        </>
      ) : (
        <Data data={data} setData={setData} date={date}/>
      )}
    </main>
  )
}

const loadingStyle = { textAlign: 'center', paddingTop: '5px' };

export default CoordinatesPage;

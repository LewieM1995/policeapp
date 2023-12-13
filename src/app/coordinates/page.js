
'use client';

import { useState } from "react";
import Data from "./Data";
import LngLat from "./LngLat";
import LoadingSpinner from "../../../shared components/LoadingSpinner";


export default function CoordinatesPage() {
  
  const [data, setData] = useState([]);
  const [date, setDate] = useState();
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const handleDate = (selectedDate) => {
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


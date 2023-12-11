
'use client';

import { useState } from "react";
import Data from "./Data";
import LngLat from "./LngLat";
import LoadingSpinner from "./LoadingSpinner";


export default function CoordinatesPage() {
  
  const [data, setData] = useState([]);
  const [date, setDate] = useState('2023-01');
  const [loading, setLoading] = useState();

  const handleDate = (v) => {
    const inputDate =  v.target.value;
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate);
    threeMonthsAgo.setMonth(currentDate.getMonth() - 4);

    const dateObject = new Date(inputDate);

    if (dateObject < threeMonthsAgo){
      setDate(inputDate);
    } else {
      const userConfirmed = window.confirm("The API isn't always up to date. Do you want to proceed?");
      
      if (userConfirmed) {
        setDate(inputDate);
      }
    }
  };

  return (
    <main id="page-wrapper">
      <LngLat data={data} setData={setData} date={date} handleDate={handleDate} setLoading={setLoading} />
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

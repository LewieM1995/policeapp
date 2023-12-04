
'use client';

import { useState } from "react";
import Data from "./components/Data";
import LngLat from "./components/LngLat";
import LoadingSpinner from "./components/LoadingSpinner";


export default function Home() {
  
  const [data, setData] = useState([]);
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState();

  const handleDate = (v) => {
    setDate(v.target.value)
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
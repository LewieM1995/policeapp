
'use client';

import { useState } from "react";
import Data from "../../components/Data";
import LngLat from "../../components/LngLat";


export default function Home() {
  
  const [data, setData] = useState(null);
  const [date, setDate] = useState('')

  const handleDate = (v) => {
    setDate(v.target.value)
  };



  return (
    <main >
      <LngLat data={data} setData={setData} date={date} handleDate={handleDate}  />
      <div>
      <Data data={data} setData={setData} date={date}/>
      </div>
    </main>
  )
}

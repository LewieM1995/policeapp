'use client'
import { useState, useEffect } from "react";

// Component Imports and Styles
import './components/styles.css'
import ForceFetch from './components/FetchForce';
import Output from "./components/OutputForForceSearch";


export default function Byforce() {

  const [dropdown, setDropDown] = useState("");
  const [date, setDate] = useState("");
  const [listData, setListData] = useState([]);
  const [data, setData] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("listData");
        const storedTimestamp = localStorage.getItem("listDataTimestamp");

        if (storedData && storedTimestamp) {
          const currentTime = new Date().getTime();
          const storedTime = new Date(storedTimestamp).getTime();
          const threeWeeksInMillis = 3 * 7 * 24 * 60 * 60 * 1000;

          if (currentTime - storedTime < threeWeeksInMillis) {
            setListData(JSON.parse(storedData));
            return;
          }
        }
        //'http://localhost:4000/byforce'
        const response = await fetch("https://data.police.uk/api/forces");
        const data = await response.json();
        setListData(data);
        localStorage.setItem("listData", JSON.stringify(data));
        localStorage.setItem("listDataTimestamp", new Date().toISOString());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const forcename = dropdown.value
  ? `${dropdown.value.charAt(0).toUpperCase()}${dropdown.value.slice(1)}`
  : '';

  return (
    <main id="page-wrapper">
     <ForceFetch
        forcename={forcename}
        date={date}
        listData={listData}
        dropdown={dropdown}
        handleDropDown={setDropDown}
        setDate={setDate}
        setData={setData}
      />
    {data.length === 0 ? <div style={{textAlign:'center'}}>Select a police force and a date</div> : 
    <>
    <Output data={data} />
    </>
    }  
    </main>
  );
}
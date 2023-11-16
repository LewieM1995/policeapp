import ForceFetch from "../components/ForceFetch";
import Output from "../components/OutputForForceSearch";
import { useState, useEffect } from "react";
import '../components/styles.css';
import Navbar from "../components/Navbar";


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

  return (
    <main>
      <Navbar />
      <br/>
      <ForceFetch
        date={date}
        data={listData}
        dropdown={dropdown}
        handleDropDown={setDropDown}
        setDate={setDate}
        setData={setData}
      />
      <Output data={data} />
    </main>
  );
}
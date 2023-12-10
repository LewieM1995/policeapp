'use client';

import { useEffect, useState } from 'react';
import ListItems from "../components/ListItems";
import '../components/styles.css';

async function getDataById(id) {
  try {
    const response = await fetch(`https://policeappserver.duckdns.org/get-data/${id}`);
    if (!response.ok) {
      throw new Error('Request failed');
    }
    return await response.json();
  } catch (error) {
    console.error('Error', error);
    throw error; 
  }
}

export default function Page({ params }) {
  const [fullData, setFullData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataById(params.id);
        setFullData(result);
        //console.log('result', result);
      } catch (error) {
        console.error('Error fetching data', error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <section className='dynamic-section'>
      <h4>Full Object:</h4>
        <ul className="list-items" >
          <ListItems label="Force Name" value={fullData.forcename} />
          <ListItems label="Age" value={fullData.age_range} />
          <ListItems label='DATETIME' value={fullData.datetime} />
          <ListItems label="Gender" value={fullData.gender} />
          <ListItems label="Persons Involved" value={fullData.involved_person} />
          <ListItems label="Legislation" value={fullData.legislation} />
          <ListItems label="Latitude" value={fullData.location_latitude} />
          <ListItems label="Longitude" value={fullData.location_longitude} />
          <ListItems label="Street id" value={fullData.location_street_id} />
          <ListItems label="Street Name" value={fullData.location_street_name} />
          <ListItems label="Reason For Search" value={fullData.object_of_search} />
          <ListItems label="Officer Defined Ethnicity" value={fullData.officer_defined_ethnicity} />
          <ListItems label="Operation" value={fullData.operation} />
          <ListItems label="Operation Name" value={fullData.operation_name} />
          <ListItems label="Outcome" value={fullData.outcome} />
          <ListItems label="Outcome link to reason" value={fullData.outcome_linked_to_obejct_of_search} />
          <ListItems label="Clothing Removal" value={fullData.removal_of_more_than_outer_clothing} />
          <ListItems label="Ethnicity" value={fullData.self_defined_ethnicity} />
          <ListItems label="Type" value={fullData.type} />
        </ul>
      </section>
    </>
  );
}

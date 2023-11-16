import calculateOutcomePercentage from "./CalcPercentagesEtc";
import { useState } from "react";
import Pagination from "./PaginationButtons";

export default function OutputForForceSearch({ data }) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= Math.ceil(data.length / itemsPerPage)) {
      setCurrentPage(pageNumber);
    }
  };
  
  const mainList = currentItems.map((item, index) => (
    <li key={index}>
      <h4 style={{margin:'15px 1px 1px 1px'}}>{item.type}</h4>
      <ul style={{ listStyle: "none", background:'whitesmoke', borderRadius:'10px'}}>
        <li>
          Age: {item.age_range === null ? "No age documented" : item.age_range}
        </li>
        <li>
          Ethnicity:{" "}
          {item.self_defined_ethnicity === null
            ? "No ethnicity documented"
            : item.self_defined_ethnicity}
        </li>
        <li>
          Officer Defined Ethnicity:{" "}
          {item.officer_defined_ethnicity === null
            ? "No ethnicity documented"
            : item.officer_defined_ethnicity}
        </li>
        <li>
          Reason For Search:{" "}
          {item.object_of_search === null
            ? "No data given"
            : item.object_of_search}
        </li>
        <li>Gender: {item.gender}</li>
        <li>Legislation: {item.legislation}</li>
        <li>Outcome: {item.outcome}</li>
      </ul>
    </li>
  ));


  

  return (
    <section style={{width:'50%', margin:'auto' }}>
      <div style={{width: '500px', margin:' auto'}}>
        <div style={{width: '500px', margin:' auto', textAlign:'center'}}>
        {calculateOutcomePercentage(data)}
        </div>
        <ul style={{listStyle:'none', paddingLeft:'0px'}}>
          {data.length === 0 ? (
            <p>No data to display, try another date or force</p>
          ) : (
            mainList
          )}
        </ul>
        <div style={{width:'100%'}}>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={data.length}
            currentPage={currentPage}
            paginate={paginate}
          />
        </div>
      </div>
    </section>
  );
}
import React, { useState } from "react";
import Link from "next/link";

//Component Imports
import calculateOutcomePercentage from "./CalcPercentagesEtc";
import Pagination from "./PaginationButtons";
import ListItems from "./ListItems";

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
      <div key={index} className="object-list-item">
        <h4>{item.type}: Click to see more</h4>
        <Link href={`/byforce/${item.id}`} target="_blank" style={{textDecoration:'none'}}>
        <ul className="list-items" >
          <ListItems label="Age" value={item.age_range} />
          <ListItems label="Ethnicity" value={item.self_defined_ethnicity} />
          <ListItems label="Officer Defined Ethnicity" value={item.officer_defined_ethnicity} />
          <ListItems label="Reason For Search" value={item.object_of_search} />
          <ListItems label="Gender" value={item.gender} />
          <ListItems label="Legislation" value={item.legislation} />
          <ListItems label="Outcome" value={item.outcome} />
        </ul>
        </Link>
      </div>
  ));

  return (
    <section >
      <div id="output-wrapper">
        <div className="stat-container">
            {calculateOutcomePercentage(data)}
        </div>
        <div className="object-list">
          {data.length === 0 ? (
            <p style={noDataStyle}>No data to display, try another date or force</p>
          ) : (
            mainList
          )}
        </div>
        <div className="pagination-container">
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

const noDataStyle = { textAlign:'center', color: "red" };
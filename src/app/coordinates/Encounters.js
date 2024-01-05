import React from 'react';

const Encounters = ({ data }) => {
  //const formatDate = (date) => date.split('-').reverse().join('-');

  const renderList = (list, label) => (
    <ul className="output-list">
      <label><strong>{label}:</strong></label>
      {list
        .filter(item => item.outcome)
        .map((item, index) => (
          <li key={index}>{item.outcome}: {item.count}</li>
        ))}
    </ul>
  );

  return (
    <div className='encounters'>
      {data && data.date && (
        <p style={centeredStyle}>
          {data.males} males and {data.females} females were stop and searched during the month {data.date === "2023-11" ? `${data.date} - defaulted to prevent error`: data.date}.
        </p>
      )}
      <div className='output-list-container'>
        {data && data.date && renderList(data.ethnicityCount, 'Ethnicity')}
        {data && data.date && renderList(data.searchObjectCount, 'Reason for Stops')}
        {data && data.date && renderList(data.outcomeWithCounts, 'Outcome of Stops')}
      </div>
    </div>
  );
};

const centeredStyle = { textAlign: 'center', margin: '10px 10px 10px 10px' };

export default Encounters;
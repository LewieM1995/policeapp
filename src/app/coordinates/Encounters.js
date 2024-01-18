
import LoadingSpinner from '../../../shared components/LoadingSpinner';

const Encounters = ({ data, date, loading }) => {
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
    <br/>
    <p style={{textAlign:'center'}}>{date === "2024-01" ? "Date may default to 2023-11 if the API hasn't updated current month" : null }</p>
      {!loading.searchObjectCount ? (
        <p style={centeredStyle}>
         {data.males} males and {data.females} females were stop and searched during the month {data.date}
        </p>
      ) : (null)}
      <div className='output-list-container'>
        {loading.searchObjectCount ? (
          <>
          <LoadingSpinner/>
          <h2 style={{loadingStyle}}>Loading...</h2>
          </>) : (renderList(data.searchObjectCount, 'Reason for Stops'))}
          {loading.outcomeWithCounts ? (<>
        <LoadingSpinner/>
        <h2>Loading...</h2>
      </>) : (renderList(data.outcomeWithCounts, 'Outcome of Stops'))}
        {loading.ethnicityCount ?(<>
        <LoadingSpinner/>
        <h2>Loading...</h2>
        </>) : (renderList(data.ethnicityCount, 'Ethnicity'))}
      </div>
    </div>
  );
};

const centeredStyle = { textAlign: 'center', margin: '10px 10px 10px 10px' };
const loadingStyle = { textAlign: 'center', paddingTop: '5px' };

export default Encounters;
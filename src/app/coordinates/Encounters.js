
import LoadingSpinner from '../../../shared components/LoadingSpinner';

const Encounters = ({ data, date, loading }) => {

  const renderList = (list, label) => {
    if (data.males >= 1) {
      return (
        <ul className="output-list">
          <label><strong>{label}</strong></label>
          {list
            .filter(item => item.outcome)
            .map((item, index) => (
              <li key={index}>{item.outcome}: {item.count}</li>
            ))}
        </ul>
      );
    } else {
      return null;
    }
  };

  return (
    <div className='encounters'>
      <br />
      {data.males >> 1 ? (
        <p style={centeredStyle}>
          {data.males} males and {data.females} females were stop and searched during the month {data.date}.
        </p>
      ) : null } 
        
      <div className='output-list-container'>
        {loading.searchObjectCount ? <LoadingSpinner/> : renderList(data.searchObjectCount, 'Reason for Stops')}
        {loading.outcomeWithCounts ? <LoadingSpinner/>: renderList(data.outcomeWithCounts, 'Outcome of Stops')}
        {loading.ethnicityCount ? <LoadingSpinner/> : renderList(data.ethnicityCount, 'Ethnicity')}
      </div>
    </div>
  );
};

const centeredStyle = { textAlign: 'center', margin: '10px 10px 10px 10px' };

export default Encounters;
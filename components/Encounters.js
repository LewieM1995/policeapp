import DataTable from './DataTable';
import { useState } from 'react';

function Encounters ({data}) {
    

    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
      };
    const pageSize = 5;
    const totalPagesMath = data && data.uniqueStreet ? Math.ceil(data.uniqueStreet.length / pageSize / 5) : 0;

  return (
    <div className='encounters'> 
        { data && (<p style={{textAlign: 'center', paddingTop: '1rem'}}> {data.males} males and {data.females} females were stop and searched during the month  {data.date.split('-').reverse().join('-')} </p>)}
        { data && (<DataTable currentPage={currentPage} items={data.uniqueStreet} onPageChange={handlePageChange} totalPages={totalPagesMath} />)}
        <div style={{display: 'flex', justifyContent: 'center'}}>{data && (
          <>
          <ul style={{width: '500px'}}>
          <label style={{ width: '500px', textAlign: 'center' }} >Reasons for Stops</label>
            {data.uniqueSearchObj
              .filter(item => item)
              .map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          </>
        )}
        {data && (
          <>
          <ul >
          <label style={{ width: '500px', textAlign: 'center' }} >Outcome of Stops</label>
            {data.outcomeWithCounts
              .filter(item => item.outcome)
              .map((item, index) => (
              <li key={index}>{item.outcome} ({item.count})</li>
            ))}
          </ul>
          </>
        )}
        </div>
    </div>
  )
}

export default Encounters
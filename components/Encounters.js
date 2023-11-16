
function Encounters ({data}) {

  return (
    <div className='encounters'> 
        { data && data.date && (<p style={{textAlign: 'center', paddingTop: '1rem'}}> {data.males} males and {data.females} females were stop and searched during the month  {data.date.split('-').reverse().join('-')} </p>)}
        <div style={{width: '1000px', margin:'auto', display: 'flex', justifyContent: 'center'}}>{data && data.date && (
          <>
          <ul className="ul-styles">
          <label><strong>Reason for Stops:</strong></label>
            {data.searchObjectCount
              .filter(item => item.outcome)
              .map((item, index) => (
              <li key={index}>{item.outcome}: {item.count}</li>
            ))}
          </ul>
          </>
        )}
        {data && data.date && (
          <>
          <ul className="ul-styles" >
          <label><strong>Outcome of Stops:</strong></label>
            {data.outcomeWithCounts
              .filter(item => item.outcome)
              .map((item, index) => (
              <li key={index}>{item.outcome}: {item.count}</li>
            ))}
          </ul>
          </>
        )}
        {data && data.date && (
          <>
          <ul className='ul-styles'>
          <label><strong>Ethnicity:</strong></label>
            {data.ethnicityCount
              .filter(item => item.outcome)
              .map((item, index) => (
              <li key={index}>{item.outcome}: {item.count}</li>
            ))}
          </ul>
          </>
        )}
        </div>
    </div>
  )
}

export default Encounters

export default function AppInfo() {
  return (
    <>
      <h2 style={{ textAlign: 'center', fontWeight: '500', padding: '20px' }}>
        Explore API Stats with Latitude and Longitude Pairs or Simply Choose a Date and Location
      </h2>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', padding: '20px' }}>
        Please note that due to API constraints, some dates may have slower loading times,
        and using two pairs simultaneously is not supported.
      </p>
      <p style={{ textAlign: 'center', padding: '20px'}}>
        For assistance with latitude and longitude, consider using these tools:
        {' '}
        <a href='https://www.keene.edu/campus/maps/tool/' target="_blank" rel="noopener noreferrer">Tool One</a>
        {' '}
        and
        {' '}
        <a href='https://gps-coordinates.org' target='_blank' rel="noopener noreferrer">Tool Two</a>.
        {' '}
        <em>(Disclaimer: I am not associated with these sites in any way.)</em>
      </p>
    </>
  )
}

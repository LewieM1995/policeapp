
export default function AppInfo() {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>
        Explore API Stats with Latitude and Longitude Pairs or Choose a Date and Location
      </h2>
      <p style={{ textAlign: 'center' }}>
        Please note that due to API constraints, some dates may have slower loading times,
        and using two pairs simultaneously might not be supported.
      </p>
      <p style={{ textAlign: 'center', fontSize: '1.5rem' }}>
        For assistance with latitude and longitude, consider using these helpful tools:
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

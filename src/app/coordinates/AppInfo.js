import './appinfo.css';

const AppInfo = () => {
  return (
    <div className='appinfo-container'>
      <h2 className='appinfo'>
        Explore api stats with latitude and longitude pairs or simply choose a date and location
      </h2>
      <p>
        Please note that due to API constraints, some dates may have slower loading times,
        and using two pairs simultaneously is not supported.
      </p>
      <p>
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
      <span>A 4th coordinate will be automatically generated to create a polygon/area</span>
    </div>
  )
};

export default AppInfo;
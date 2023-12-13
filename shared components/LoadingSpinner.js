import React from 'react';
import { RingLoader } from 'react-spinners';

const LoadingSpinner = () => (
  <div style={{width: '100%', margin:'10px 0px 10px 0px', display:'flex', justifyContent:'center' }}>
    <RingLoader color="black" loading={true} size={50} />
  </div>
);

export default LoadingSpinner;
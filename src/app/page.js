import Link from 'next/link';
import './global.css';

const Home = () => {
  

  return (
    <main id="page-wrapper" style={{textAlign:'center'}}>
      <p>This application is for demonstration purpose only</p>
      <p>The intention is to showcase knowledge of api's, react, node, mysql and dynamic rendering.</p>
      <br/>
      <div className='center-nav-container'>
        <Link className='center-nav' href="https://github.com/LewieM1995/policeapp" target='_blank'>GitHub - Frontend</Link>
        <Link className='center-nav' href="https://github.com/LewieM1995/policeappserver" target='_blank'>GitHub - Backend</Link>
        <Link className="center-nav" href='/byforce'>Try By Force page</Link>
        <Link className="center-nav" href='/coordinates'>Try Coordinates page</Link>
      </div>
    </main>
  );
};

export default Home;



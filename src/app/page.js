import Link from 'next/link';
import './global.css';

export default function Home() {
  

  return (
    <main id="page-wrapper" style={{textAlign:'center'}}>
      <h2>Lewie Marks - Web Developer </h2>
      <br/>
      <p>This application is for demonstration purpose only</p>
      <p>The intention is to showcase knowledge of api's, react, node, mysql and dynamic rendering.</p>
      <br/>
      <Link className='center-nav' href="https://github.com/LewieM1995/policeapp" target='_blank'>GitHub - Frontend</Link>
      <Link className='center-nav' href="https://github.com/LewieM1995/policeappserver" target='_blank'>GitHub - Backend</Link>
      <div className="center-nav-container">
          <Link className="center-nav" href='/byforce'>Try By Force page</Link>
          <Link className="center-nav" href='/coordinates'>Try Coordinates page</Link>
      </div>
    </main>
  )
}


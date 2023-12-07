'use client';

import { useState } from 'react';
import Link from 'next/link';
import './styles.css';

const Navbar = () => {
  const [isBurgerMenuOpen, setBurgerMenuOpen] = useState(false);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    background: '#3e363f',
    color: '#fff',
    marginBottom: '1rem',
  };

  const burgerMenuStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
  };

  const toggleBurgerMenu = () => {
    setBurgerMenuOpen(!isBurgerMenuOpen);
  };
  const closeBurgerMenu = () => {
    setBurgerMenuOpen(false);
  }

  return (
    <nav className="nav-styles" style={navStyle}>
      <div className='title-div'>
        <Link href='/'>
          <h2 onClick={closeBurgerMenu} >Police API Data</h2>
        </Link>
      </div>

      {/* Burger menu button */}
      <div className="burger-menu" onClick={toggleBurgerMenu}>
        <div className={`bar ${isBurgerMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isBurgerMenuOpen ? 'open' : ''}`} />
        <div className={`bar ${isBurgerMenuOpen ? 'open' : ''}`} />
      </div>

      {/* Navigation links */}
      <div style={isBurgerMenuOpen ? burgerMenuStyle : { display: 'flex', alignItems: 'center' }}>
        <ul className={`nav-ul ${isBurgerMenuOpen ? 'open' : ''}`}>
          <li className="nav-li">
            <Link href="/coordinates" onClick={closeBurgerMenu}>Coordinates</Link>
          </li>
          <li className="nav-li">
            <Link href="/byforce" onClick={closeBurgerMenu}>By Force</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

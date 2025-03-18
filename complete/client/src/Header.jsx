import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <nav style={{ padding: '10px', background: '#f0f0f0' }}>
      <Link to="/" style={{ marginRight: '15px' }}>Home</Link>
      <Link to="/data">Data</Link>
    </nav>
  );
}

export default Header;

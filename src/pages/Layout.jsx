import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({children}) => {
  return (
    <>
    <div className="header">
      <Link to="/"><img src="/logo.png" /></Link>
    </div>
    {children}
    </>
  )
}


export default Layout;

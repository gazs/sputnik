import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({children}) => {
  return (
    <>
    <div className="header">
      <Link to="/">home</Link>
    </div>
    {children}
    </>
  )
}


export default Layout;

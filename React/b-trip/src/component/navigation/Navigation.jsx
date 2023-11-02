import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <Link to="/">Home</Link> | 
      <Link to="/overview"> OVERVIEW</Link> |
      <Link to="/statics"> STATICS</Link> |
      <Link to="/analysis"> ANALYSIS</Link> |
      <Link to="/recommend"> RECOMMEND</Link>
    </div>
  );
};


export default Navigation;
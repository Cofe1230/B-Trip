import React from 'react';
import {Link} from 'react-router-dom';

const Navigation = () => {
  return (
    <div>
      <Link to="/">Home</Link> | 
      <Link to="/overview"> 개요</Link> |
      <Link to="/recommend"> 추천</Link>
    </div>
  );
};


export default Navigation;
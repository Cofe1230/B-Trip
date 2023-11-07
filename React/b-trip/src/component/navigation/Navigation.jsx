import { React, useState } from 'react';
// 수정 Link => NavLink
import {NavLink} from 'react-router-dom';
// 수정 끝
import '../styles/Navigation.css';

const Navigation = () => {
  
  //선택시 유지되는 함수
  return (
  <div className='header'>
    <a href='/'>home</a>
    <div className='nav'>
      {/* 수정 Link -> NavLink activeClassName  */}
      <NavLink activeClassName = "active" className="navtxt" to="/overview" >OVERVIEW</NavLink>
      <NavLink activeClassName = "active" className="navtxt" to="/statics">STATICS</NavLink> 
      <NavLink activeClassName = "active" className="navtxt" to="/analysis">ANALYSIS</NavLink>
      <NavLink activeClassName = "active" className="navtxt" to="/recommend">RECOMMEND</NavLink>
      {/* 수정 끝 */}
      </div>
  </div>
  );
};

export default Navigation;
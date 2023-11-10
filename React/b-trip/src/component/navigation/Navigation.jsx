import { React } from 'react';
import {NavLink} from 'react-router-dom';
import '../styles/Navigation.css';
import logo from '../ui/logo.png';

const Navigation = () => {
  
  return (
    <div className='header'>
      <a href='/'><img src={logo} className='logo' alt='logo'/></a>
      <div className='nav'>
        <NavLink activeClassName='active' to="/overview" >OVERVIEW</NavLink>
        <NavLink activeClassName='active' to="/statics" >STATICS</NavLink> 
        <NavLink activeClassName='active' to="/analysis" >ANALYSIS</NavLink>
        <NavLink activeClassName='active' to="/recommend" >RECOMMEND</NavLink>
      </div>
    </div>
  );
};

export default Navigation;
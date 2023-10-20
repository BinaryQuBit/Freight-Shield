import './Sidebar.css';
import React, { useEffect } from 'react';
import homeImage from './assets/home.png';
import logo from './assets/logo.jpeg';

function Sidebar() {
    useEffect(() => {
        const body = document.querySelector('body');
        const sidebar = body.querySelector('nav');
        const toggle = body.querySelector('.toggle');
        const searchBtn = body.querySelector('.search-box');
        const modeSwitch = body.querySelector('.toggle-switch');
        const modeText = body.querySelector('.mode-text');
    
        const handleToggleClick = () => {
          sidebar.classList.toggle('close');
        };
    
        const handleSearchClick = () => {
          sidebar.classList.remove('close');
        };
    
        const handleModeSwitchClick = () => {
          body.classList.toggle('dark');
          if (body.classList.contains('dark')) {
            modeText.innerText = 'Light mode';
          } else {
            modeText.innerText = 'Dark mode';
          }
        };
    
        toggle.addEventListener('click', handleToggleClick);
        searchBtn.addEventListener('click', handleSearchClick);
        modeSwitch.addEventListener('click', handleModeSwitchClick);
    
        // Clean up event listeners when the component unmounts
        return () => {
          toggle.removeEventListener('click', handleToggleClick);
          searchBtn.removeEventListener('click', handleSearchClick);
          modeSwitch.removeEventListener('click', handleModeSwitchClick);
        };
      }, []);

  return (
    <>
    
    <nav class="sidebar open">
    <header>
      <div class="image-text">
        <span class="image">
          
        </span>

        <div class="text logo-text">
        <img src={logo} alt="logo" height='80' width='80'/>
        </div>
      </div>

      <i class='bx bx-chevron-right toggle'></i>
    </header>

    <div class="menu-bar">
      <div class="menu">

        <ul class="menu-links">
          <li class="nav-link">
            <a href="#">
            {/* <img src={homeImage} alt="Home" height='40' width='40'/> */}
              <i class=' icon'></i>
              
              <span margin-left='20' class="text nav-text">Dashboard</span>
             
            </a>
          </li>

          <li class="nav-link">
            <a href="#">
              <i class='bx bx-bar-chart-alt-2 icon'></i>
              <span class="text nav-text">Post Load</span>
            </a>
          </li>

          <li class="nav-link">
            <a href="#">
              <i class='bx bx-bell icon'></i>
              <span class="text nav-text">Book Load</span>
            </a>
          </li>

          <li class="nav-link">
            <a href="#">
              <i class='bx bx-pie-chart-alt icon'></i>
              <span class="text nav-text">Analytics</span>
            </a>
          </li>

          <li class="nav-link">
            <a href="#">
              <i class='bx bx-heart icon'></i>
              <span class="text nav-text">Notification</span>
            </a>
          </li>

          <li class="nav-link">
            <a href="#">
              <i class='bx bx-wallet icon'></i>
              <span class="text nav-text"> Calender</span>
            </a>
          </li>

        </ul>
      </div>

      <div class="bottom-content">
        <li class="">
          <a href="#">
            <i class='bx bx-log-out icon'></i>
            <span class="text nav-text"> Settings</span>
          </a>
        </li>

        <li class="mode">
          <div class="sun-moon">
            <i class='bx bx-moon icon moon'></i>
            <i class='bx bx-sun icon sun'></i>
          </div>
          <span class="mode-text text">Dark mode</span>

          <div class="toggle-switch">
            <span class="switch"></span>
          </div>
        </li>

      </div>
    </div>

  </nav>

  <section class="home">
    <div class="text">Welcome to Shield</div>
  </section>
  <li class="search-box">
          <i class='bx bx-search icon'></i>
          
        </li>
    </>
  );
}

export default Sidebar;


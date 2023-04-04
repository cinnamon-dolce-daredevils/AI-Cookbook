import style from '../styles/animatedMenu.module.css';
import React, { useState } from 'react';
// this code is the separated code that originally made the burger animation
// there was an issue w using this component b/c there was an overlap
// in event listeners. I've moved this to AccountSettings.js
// use the code below to get the burger animation on other projects
const MenuIcon1 = () => {
  let [menuOpen, setMenuOpen] = useState(false);
  let handleClick = () => {
    setMenuOpen(!menuOpen);
    console.log(menuOpen);
  }
  return (
    <>
      <div className={style.Body}>
        <div  onClick={handleClick} className={`${style.menuBtn} ${menuOpen ? {menuOpen}: null}`}>
          <div className={style.menuBtnBurger}></div>
        </div>
      </div>
    </>
  );
};

export default MenuIcon1;

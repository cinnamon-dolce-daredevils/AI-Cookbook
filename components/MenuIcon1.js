import style from '../styles/animatedMenu.module.css';
import React, { useState } from 'react';

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

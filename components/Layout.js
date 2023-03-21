import Header from './Header';
import styles from '../styles/layout.module.css';
import React from 'react';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.mainBody}>{children}</main>
    </>
  );
};

export default Layout;

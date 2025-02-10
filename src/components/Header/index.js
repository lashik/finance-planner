import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';
import { globalVar } from 'db';
function Header(props) {
  return (
    <div className={styles.searchToolbox}>
      {/* Search and quick tools */}

      <div className={styles.row5}>
        <img
          className={styles.image2}
          src={'/assets/horizontal_logo.png'}
          alt="alt text"
        />

        <button className={styles.block4}>
          {/* TODO */}
          <img
            className={styles.searchIcon}
            src={'/assets/search_icon.svg'}
            alt="alt text"
          />
          <button className={styles.searchBtn}>Search</button>
        </button>
        <img
              className={styles.settingsIcon1}
              src={'/assets/42c00a9355f73928c69d06a8a8bc775c.svg'}
              alt="alt text"
            />
        <img
          className={styles.notificationIcon}
          src={'/assets/5c3de22dde775d9719fce3167251562b.svg'}
          alt="alt text"
        />
        <div className={styles.userIcon}>{globalVar.charAt(0).toUpperCase()}</div>
      </div>
    </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;

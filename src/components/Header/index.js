import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import styles from './index.module.scss';

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
            </div>
          </div>
  );
}

Header.propTypes = {
  className: PropTypes.string
};

export default Header;

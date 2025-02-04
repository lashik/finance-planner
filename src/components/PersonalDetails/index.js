import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Select,Option } from '@mui/joy';
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
function PersonalDetails(props) {
  return (
    <div className={cn(styles.mainContainer, props.className, 'creatio-form')}>
      <div className={styles.row}>
        <Sidebar/>

        <div className={styles.portfolioSection}>
          {/* Portfolio Section: Displays user's portfolios and search functionality */}

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

          <p className={styles.portfolioTitle}>Personal Details</p>

          <div className={styles.profileGrid}>
            {/* Grid of user profiles with personal details */}

            <div className={styles.block5}>
              <div className={styles.row6}>
                <p className={styles.detailsTitle}>Personal Details</p>

                <div className={styles.row7}>
                  <p className={styles.occupationLabel}>Occupation</p>
                  <Select className={`${styles.dropdown} ${styles.select}`} placeholder="Select an Option" size='sm'>
                    
                    <Option value="Service" className={styles.dropdown_item}>Service</Option>
                    <Option value="Business" className={styles.dropdown_item}>Business</Option>
                    <Option value="Student" className={styles.dropdown_item}>Student</Option>
                    <Option value="Retired" className={styles.dropdown_item}>Retired</Option>
                    <Option value="House maker" className={styles.dropdown_item}>House maker</Option>
                    <Option value="Professional" className={styles.dropdown_item}>Professional</Option>
                  </Select>
                </div>

                <div className={styles.row8}>
                  <p className={styles.maritalStatusLabel}>Marital Status</p>
                  <Select className={`${styles.dropdown} ${styles.select}`} placeholder="Select an Option" size='sm'>
                    
                    <Option value="Single" className={styles.dropdown_item}>Single</Option>
                    <Option value="Married" className={styles.dropdown_item}>Married</Option>
                    <Option value="Divorcee" className={styles.dropdown_item}>Divorcee</Option>
                    <Option value="Separated" className={styles.dropdown_item}>Separated</Option>
                    <Option value="Widower" className={styles.dropdown_item}>Widower</Option>
                  </Select>
                </div>

                <div className={styles.row8}>
                  <p className={styles.genderLabel}>Gender</p>
                  <Select className={`${styles.dropdown} ${styles.select}`} placeholder="Select an Option" size='sm'>
                    
                    <Option value="Male" className={styles.dropdown_item}>Male</Option>
                    <Option value="Female" className={styles.dropdown_item}>Female</Option>
                    <Option value="Choose" not to Say className={styles.dropdown_item}>Choose not to Say</Option>
                  </Select>
                </div>

                <div className={styles.row8}>
                  <p className={styles.dependantsLabel}>Dependants</p>
                  <Select className={`${styles.dropdown} ${styles.select}`} placeholder="Select an Option" size='sm'>
                    
                    <Option value="0" className={styles.dropdown_item}>0</Option>
                    <Option value="1" className={styles.dropdown_item}>1</Option>
                    <Option value="2" className={styles.dropdown_item}>2</Option>
                    <Option value="3" className={styles.dropdown_item}>3</Option>
                    <Option value="4+" className={styles.dropdown_item}>4+</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className={styles.block5} >
              <div className={styles.row6}>
                <div className={styles.info6} >Income</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Professional Income after Taxes</div>
                  <input type="text" className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Other income after taxes</div>
                  <input type="text" className={styles.color11} />
                </div>
                <div className={styles.info6} >General Expenses</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Insurance Premium</div>
                  <input type="text" className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Current Ongoing Savings</div>
                  <input type="text" className={styles.color11} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info7}>Loan</div>
                  <input type="text" className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>House Rent / Maintenance</div>
                  <input type="text" className={styles.color1} />
                </div>
                <div className={styles.info6} >Living Expenses</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Electricity bills</div>
                  <input type="text" className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Telephone Bills / Wifi</div>
                  <input type="text" className={styles.color11} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info7}>Ration, Grocery and LPG</div>
                  <input type="text" className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Medicine</div>
                  <input type="text" className={styles.color1} />
                </div>
                <div className={styles.info6}>Other Expenses</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Education / Tuition fees</div>
                  <input type="text" className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>House help</div>
                  <input type="text" className={styles.color11} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info7}>Religious{"\n"}/social cause</div>
                  <input type="text" className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Entertainment / Leisure <br />(Food, Shopping etc.)</div>
                  <input type="text" className={styles.color1} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

PersonalDetails.propTypes = {
  className: PropTypes.string
};

export default PersonalDetails;

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Select, Option} from '@mui/joy';
import {RadioGroup, Radio} from "@heroui/react";
import styles from './index.module.scss';
import { Link } from 'react-router-dom';
function Portfolio(props) {
  return (
    <div className={cn(styles.mainContainer, props.className, 'creatio-form')}>
      <div className={styles.row}>
        <div className={styles.block}>
          <div className={styles.topSection}>
            {/* Top section contains main buttons and status info */}

            <div className={styles.brandingSection}>
              {/* Branding: Contains company logo and name */}

              <div className={styles.brandingRow}>
                <img
                  className={styles.logoImage}
                  src={'/assets/power_icon.png'}
                  alt="alt text"
                />
                <figcaption className={styles.companyName}>
                  FinanceGenius
                </figcaption>
                <img
                  className={styles.secondaryIcon}
                  src={'/assets/32788402074d79ea96d7cd533f8da95e.svg'}
                  alt="alt text"
                />
              </div>
            </div>

            <nav className={styles.navigationSection}>
              {/* Main Navigation: Contains main sections like Schedules, Portfolios */}
              <p className={styles.currentSection}>Main</p>

              <div className={styles.navItemRow}>
                <img
                  className={styles.sectionIcon}
                  src={'/assets/calendar_icon.svg'}
                  alt="alt text"
                />
                <Link className={styles.sectionTitle} to={'/Dashboard'}>Dashboard</Link>
              </div>

              <div className={styles.navItemRow1}>
                <img
                  className={styles.image}
                  src={'/assets/calendar_icon.svg'}
                  alt="alt text"
                />
                <Link className={styles.sectionTitle} to={'/Portfolio'}>Portfolios</Link>
              </div>

              {/* <div className={styles.subNavSection}>
                <div className={styles.row1}>
                  <img
                    className={styles.image}
                    src={'/assets/chart_icon.svg'}
                    alt="alt text"
                  />
                  <figcaption className={styles.incomeTitle}>Income</figcaption>
                  <img
                    className={styles.incomeIcon}
                    src={'/assets/up_arrow.svg'}
                    alt="alt text"
                  />
                </div>
              </div>

              <div className={styles.statusRow}>
                {/* Statuses: Display earnings, declines, payouts 
                <div className={styles.color} />

                <div className={styles.row2}>
                  <p className={styles.earningsLabel}>Earnings</p>
                  <p className={styles.refundsInfo}>
                    {/* TODO *
                    Refunds
                  </p>
                  <p className={styles.declinesLabel}>Declines</p>
                  <p className={styles.payoutsLabel}>Payouts</p>
                </div>
              </div> */}

              <div className={styles.info1}>Settings</div>

              <div className={styles.row3}>
                <img
                  className={styles.image}
                  src={'/assets/bell_icon.svg'}
                  alt="alt text"
                />
                <div className={styles.info2}>Notification</div>
              </div>

              <div className={styles.row4}>
                <img
                  className={styles.settingsIcon}
                  src={'/assets/settings_icon.svg'}
                  alt="alt text"
                />
                <figcaption className={styles.settingsTitle}>
                  Settings
                </figcaption>
                <img
                  className={styles.image1}
                  src={'/assets/down_arrow.svg'}
                  alt="alt text"
                />
              </div>
            </nav>
          </div>
        </div>

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

          <p className={styles.portfolioTitle}>My Portfolio</p>

          <div className={styles.profileGrid}>
            {/* Grid of user profiles with personal details */}

            <div className={styles.block5} >
              <div className={styles.row6}>
                <div className={styles.info6} >Asset 1</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Field 1</div>
                  <input className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Field 2</div>
                  <input type="text" className={styles.color11} />
                </div>
                <div className={styles.row8}>
                  <div className={styles.info71}>Field 3</div>


                  <RadioGroup  orientation="horizontal">
                    <Radio value="buenos-aires">Answer 1</Radio>
                    <Radio value="sydney">Answer 1</Radio>
                  </RadioGroup>
  


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
                <div className={styles.info6} >Asset 2</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Field 1</div>
                  <input className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Field 2</div>
                  <input type="text" className={styles.color11} />
                </div>
                <div className={styles.row8}>
                  <div className={styles.info71}>Field 3</div>


                  <RadioGroup  orientation="horizontal">
                    <Radio value="buenos-aires">Answer 1</Radio>
                    <Radio value="sydney">Answer 1</Radio>
                  </RadioGroup>
  


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
                <div className={styles.info6} >Asset 3</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Field 1</div>
                  <input className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Field 2</div>
                  <input type="text" className={styles.color11} />
                </div>
                <div className={styles.row8}>
                  <div className={styles.info71}>Field 3</div>


                  <RadioGroup  orientation="horizontal">
                    <Radio value="buenos-aires">Answer 1</Radio>
                    <Radio value="sydney">Answer 1</Radio>
                  </RadioGroup>
  


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
                <div className={styles.info6} >Asset 4</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Field 1</div>
                  <input className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Field 2</div>
                  <input type="text" className={styles.color11} />
                </div>
                <div className={styles.row8}>
                  <div className={styles.info71}>Field 3</div>


                  <RadioGroup  orientation="horizontal">
                    <Radio value="buenos-aires">Answer 1</Radio>
                    <Radio value="sydney">Answer 1</Radio>
                  </RadioGroup>
  


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
                <div className={styles.info6} >Asset 5</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Field 1</div>
                  <input className={styles.color1} />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Field 2</div>
                  <input type="text" className={styles.color11} />
                </div>
                <div className={styles.row8}>
                  <div className={styles.info71}>Field 3</div>


                  <RadioGroup  orientation="horizontal">
                    <Radio value="buenos-aires">Answer 1</Radio>
                    <Radio value="sydney">Answer 1</Radio>
                  </RadioGroup>
  


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

          </div>
        </div>
      </div>
    </div>
  );
}

Portfolio.propTypes = {
  className: PropTypes.string
};

export default Portfolio;

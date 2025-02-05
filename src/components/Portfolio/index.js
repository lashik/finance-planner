import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Select, Option} from '@mui/joy';
import {RadioGroup, Radio} from "@heroui/react";
import styles from './index.module.scss';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
function Portfolio(props) {
  return (
    <div className={cn(styles.mainContainer, props.className, 'creatio-form')}>
      <div className={styles.row}>
        <Sidebar/>

        <div className={styles.portfolioSection}>
          {/* Portfolio Section: Displays user's portfolios and search functionality */}

          <Header/>

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

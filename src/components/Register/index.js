import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import { useState } from 'react';
import styles from './index.module.scss';
import { Link } from "react-router-dom";

function Register(props) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    country: '',
    email: '',
    number: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
    const handleSubmit = () => {
      // Generate a unique 5-digit ID
      const uniqueId = Math.floor(10000 + Math.random() * 90000);
      
      const dataToSave = {
        id: uniqueId,
        ...formData
      };
  
      // Write data to a JSON file (simulated here with localStorage)
      localStorage.setItem(uniqueId, JSON.stringify(dataToSave));
      console.log(dataToSave)
      // Create an object to store the data
      

      

      // Route to the Forms page
     
    };
  return (
    <section
      className={cn(styles['finance-section'], props.className, 'register')}>
      {/* Main finance section */}

      <div className={styles['welcome-row']}>
        <div className={styles['welcome-message']}>
          <div className={styles['title-box-box']}>
            <span className={styles['title-box']}>
              <span className={styles['title-box-span0']}>Welcome to </span>
              <span className={styles['title-box-span1']}>Finance</span>
              <span className={styles['title-box-span2']}> </span>
              <span className={styles['title-box-span3']}>Genius</span>
            </span>
          </div>
          <div className={styles.info}>
            <span className={styles.info_span0}> let’s get started</span>
          </div>
        </div>

        <div className={styles['info-row']}>
        <div className={styles['login-art']}>
                    <div className={styles['frame-31']}>
                        <div className={styles['frame-30']}>
                            <img src={'/assets/login-art.svg'} className={styles['image-1']}></img>
                            <div className={styles['text-login']}>Finance Genius</div>
                        </div>
                    </div>
                </div>
          {/* Introductory image */}

          <div className={styles['detail-cards']}>
            {/* Detailed info cards */}

            <div className={styles['info-card']}>
              <div className={styles['name-section']}>
                <span className={styles['label-name']}>Name:</span>
                <input type="text" className={styles['input-name']} value={formData.name} onChange={handleChange} />
              </div>

              <div className={styles['dob-country-section']}>
                <span className={styles['label-dob']}>DOB:</span>
                <input type="date" className={styles['input-dob']}value={formData.dob} onChange={handleChange} ></input>
                <span className={styles['label-country']}>Country:</span>
                <input type="text" className={styles['input-country']}value={formData.country} onChange={handleChange} ></input>
              </div>

              <div className={styles['email-section']}>
                <span className={styles['label-email']}>Email- ID</span>
                <input type="text" className={styles['input-email']}value={formData.email} onChange={handleChange} ></input>
              </div>

              <div className={styles['number-section']}>
                <span className={styles['label-number']}>Number:</span>
                <input type="text" className={styles['input-number']}value={formData.number} onChange={handleChange} ></input>
              </div>
              <Link to="/Forms"><button className={styles['submit-button']} onClick={handleSubmit()}>Submit</button></Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

Register.propTypes = {
  className: PropTypes.string
};

export default Register;

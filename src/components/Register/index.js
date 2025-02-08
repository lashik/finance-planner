import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import axios from 'axios';
import { get,set } from '@vercel/edge-config';
function Register(props) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    country: '',
    email: '',
    number: ''
  });
  useEffect(() => {
    get('users')
      .then(response => setUsers(response.data))
      .catch(error => console.error(error));
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = () => {
    const uniqueId = Math.floor(10000 + Math.random() * 90000);
    if (isRegister) {
      const uniqueId = Math.floor(10000 + Math.random() * 90000);
      const dataToSave = {
        id: uniqueId,
        ...formData
      };
      const updatedUsers = [...users, dataToSave];
      set('users', updatedUsers)
        .then(() => {
          setUsers(updatedUsers);
          navigate("/Dashboard");
        })
        .catch(error => console.error(error));
    } else {
      // Login logic
      const user = users.find(user => user.userId === formData.userId && user.password === formData.password);
      if (user) {
        navigate("/Dashboard");
      } else {
        alert("Invalid user ID or password");
      }
    }

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
                <img src={'/assets/login-art.svg'} className={styles['image-1']} alt='asdasd'></img>
                <div className={styles['text-login']}>Finance Genius</div>
              </div>
            </div>
          </div>
          {/* Introductory image */}

          <div className={styles['detail-cards']}>
            {/* Detailed info cards */}

            {isRegister ? (
              <div className={styles['info-card']}>
                <div className={styles['name-section']}>
                  <span className={styles['label-name']}>Name:</span>
                  <input type="text" name='name' className={styles['input-name']} value={formData.name} onChange={handleChange} />
                </div>

                <div className={styles['dob-country-section']}>
                  <span className={styles['label-dob']}>DOB:</span>
                  <input type="date" name='dob' className={styles['input-dob']} value={formData.dob} onChange={handleChange} placeholder=" " />
                  <span className={styles['label-country']}>Country:</span>
                  <input type="text" name='country' className={styles['input-country']} value={formData.country} onChange={handleChange} />
                </div>

                <div className={styles['email-section']}>
                  <span className={styles['label-email']}>Email- ID</span>
                  <input type="email" name='email' className={styles['input-email']} value={formData.email} onChange={handleChange} />
                </div>

                <div className={styles['number-section']}>
                  <span className={styles['label-number']}>Number:</span>
                  <input type="tel" name='number' className={styles['input-number']} value={formData.number} onChange={handleChange} />
                </div>
              </div>
            ) : (
              <div className={styles['info-card']}>
                <div className={styles['name-section']}>
                  <span className={styles['label-name']}>User ID:</span>
                  <input type="text" name='userId' className={styles['input-name']} value={formData.userId} onChange={handleChange} />
                </div>

                <div className={styles['number-section']}>
                  <span className={styles['label-number']}>Password:</span>
                  <input type="password" name='password' className={styles['input-number']} value={formData.password} onChange={handleChange} />
                </div>
              </div>
            )}
            <div className={styles['button-section']}>
              <button className={styles['submit-button']} onClick={handleSubmit}>Submit</button>
              <button className={styles['submit-button']} onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already a User?' : 'New User?'}
              </button>
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

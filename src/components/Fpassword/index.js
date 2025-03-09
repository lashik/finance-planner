import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useNavigate } from "react-router-dom";
import {  useState } from 'react';
import styles from './index.module.scss';

import { supabase } from 'supabaseClient';
import { globalVar } from 'db';
function Fpassword(props) {
  const navigate = useNavigate();

  const [otpCorrect, setotpCorrect] = useState(false);
  
  const [formData, setFormData] = useState({
    otp: '',
    password: '',
    passwF: '',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleOtp = async () => {
    const data = await supabase.from('users').select('*').eq('email', globalVar).single();
    
    if (data.data.otp === formData.otp) {
      setotpCorrect(true);
    }
    else {
      setotpCorrect(false);
      alert("Error: Incorrect OTP1");
      return;
    }
  }
  const handleSubmit = async () => {
    

    const { error } = await supabase.from("users").update(
      {
        password: formData.password,
        otp: null,
      }
    ).eq("otp", formData.otp);

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Password reset successful!");
      navigate("/Dashboard");
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

            {!otpCorrect ? (
              <div className={styles['info-card']} >
                <div className={styles['name-section']}>
                  <span className={styles['label-name']}>OTP:</span>
                  <input type="text" name='otp' className={styles['input-name']} value={formData.otp} onChange={handleChange} />
                </div>
              </div>
            ) : (
              <div className={styles['info-card']} >
                <div className={styles['name-section']}>
                  <span className={styles['label-name']}>New Password:</span>
                  <input type="password" name='password' className={styles['input-name']} value={formData.password} onChange={handleChange} />
                </div>
                <div className={styles['email-section']}>
                  <span className={styles['label-email']}>Confirm Password:</span>
                  <input type="password" name='passwF' className={styles['input-email']} value={formData.passwF} onChange={handleChange} />
                </div>
              </div>
            )};

            <div className={styles['button-section']}>
              <button className={styles['submit-button']} onClick={otpCorrect?(handleSubmit):(handleOtp)}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}

Fpassword.propTypes = {
  className: PropTypes.string
};

export default Fpassword;

import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import styles from './index.module.scss';
import emailjs from '@emailjs/browser';
import { supabase } from 'supabaseClient';
import { setGlobalVar } from 'db';
function Register(props) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(true);
  const [passwordSet, setPasswordSet] = useState(false);
  emailjs.init({
    publicKey:'seycVOycaTBuJBPz_',
    privateKey:'Qjn19vl8g0WrM7ImytMXf',
  });
  const [fpassword, setfPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    country: '',
    email: '',
    number: '',
    password: '',
    passwF: '',
    pdfilled: 'false' // Ensure password is included if needed
  });

  // Fetch users from Supabase


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle registration or login
  const handleSubmit = async () => {
    if (fpassword) {
      console.log("in the reset function "+formData.userId);
      const { error } = await supabase
        .from("users")
        .select("*")
        .eq("email", formData.userId)
        
      if (error) {
        alert("Error: No such user registered" + error.message);
        return;
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const { error1 } = await supabase
        .from("users")
        .update({"otp": otp})
        .eq("email", formData.userId)
        .single();
      if(error1){
        alert("Error: " + error1.message);
        return;
      }
      setGlobalVar(formData.userId);

      emailjs.send('service_fkfd0vm', 'template_l0a4w86', {
        to_name: formData.name,
        message: "The otp is "+otp,
        reply_to: formData.userId,
        })
      .then((result) => {
        alert('Email sent successfully!');
        console.log(otp);
      }, (error) => {
        alert('Failed to send email, please try again.'+JSON.stringify(error, null, 2));
      });
      navigate("/Fpassword");
    } else {
      if (isRegister) {
        if (!passwordSet) {
          setPasswordSet(true);
          return
        } else if (formData.password !== formData.passwF) {
          alert("Passwords do not match");
          return;
        }
        else {
          const { error } = await supabase.from("users").insert([
            {
              name: formData.name,
              dob: formData.dob,
              country: formData.country,
              email: formData.email,
              number: formData.number,
              password: formData.password,
              pdfilled: formData.pdfilled,
              //createdAt: new Date().toISOString()
            }
          ]);

          if (error) {
            alert("Error: " + error.message);
          } else {

            setGlobalVar(formData.email);
            navigate("/Dashboard");
          }
        }
      } else {
        // **Login: Check user credentials**
        const { data, error } = await supabase
          .from("users")
          .select("*")
          .eq("email", formData.userId)
          .eq("password", formData.password);

        if (error) {
          alert("Error: " + error.message);
        } else if (data.length > 0) {
          setGlobalVar(formData.userId);
          navigate("/Dashboard");
        } else {
          alert("Invalid credentials");
        }
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

              (!passwordSet ? (
                <div className={styles['info-card']} >
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
              ))
            ) : (
              (!fpassword ? (
                <div className={styles['info-card']}>
                  <div className={styles['name-section']}>
                    <span className={styles['label-name']}>User ID:</span>
                    <input type="text" name='userId' className={styles['input-name']} value={formData.userId} onChange={handleChange} />
                  </div>

                  <div className={styles['number-section']}>
                    <span className={styles['label-number']}>Password:</span>
                    <input type="password" name='password' className={styles['input-number']} value={formData.password} onChange={handleChange} />
                  </div>
                  <div className={styles['number-section']}>
                    <button className={styles['label-number']} onClick={() => { setfPassword(true) }}>Forgot Password </button>
                  </div>
                </div>
              ) : (
                <div className={styles['info-card']}>
                  <div className={styles['name-section']} style={{ flexDirection: 'column' }}>
                    <span className={styles['label-name']} style={{ width: 'auto', marginBottom: '20px', fontSize: '14px' }}>Enter the email you have registered your account with </span>
                    <input type="text" name='userId' className={styles['input-name']} value={formData.userId} onChange={handleChange} />
                  </div>

                </div>
              ))
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
    </section >
  );
}

Register.propTypes = {
  className: PropTypes.string
};

export default Register;

import React,{useEffect,useState} from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Select,Option } from '@mui/joy';
import styles from './index.module.scss';

import axios from 'axios';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import { useNavigate } from 'react-router-dom';
import { extendTheme,CssVarsProvider } from '@mui/joy/styles';
function PersonalDetails(props) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    country: '',
    email: '',
    number: '',
    occupation: '',
    maritalStatus: '',
    gender: '',
    dependants: '',
    professionalIncome: '',
    otherIncome: '',
    insurancePremium: '',
    ongoingSavings: '',
    loan: '',
    houseRent: '',
    electricityBills: '',
    telephoneBills: '',
    grocery: '',
    medicine: '',
    educationFees: '',
    houseHelp: '',
    socialCause: '',
    entertainment: ''
  });
  
  useEffect(() => {
    axios.get('http://localhost:3001/users')
      .then(response => {
        setUsers(response.data);
        if (response.data.length > 0) {
          // Get the last user created
          const lastUser = response.data[response.data.length - 1];
          setFormData(lastUser);
        }
      })
      .catch(error => console.error(error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const uniqueId = Math.floor(10000 + Math.random() * 90000);
    const dataToSave = {
      id: uniqueId,
      ...formData
    };
    localStorage.setItem(uniqueId, JSON.stringify(dataToSave));
    axios.post('http://localhost:3001/users', formData)
      .then(response => setUsers([...users, response.data]))
      .catch(error => console.error(error));
    console.log(dataToSave);
    navigate("/Dashboard");
  };
  return (
    <div className={cn(styles.mainContainer, props.className, 'creatio-form')}>
      <div className={styles.row}>
        <Sidebar/>

        <div className={styles.portfolioSection}>
          {/* Portfolio Section: Displays user's portfolios and search functionality */}
          <Header/>
          

          <p className={styles.portfolioTitle}>Personal Details</p>

          <div className={styles.profileGrid}>
            {/* Grid of user profiles with personal details */}

            <div className={styles.block5}>
              <div className={styles.row6}>
                <p className={styles.detailsTitle}>Personal Details</p>

                <div className={styles.row7}>
                  <p className={styles.occupationLabel}>Occupation</p>
                  
                  <Select 
                  className={`${styles.dropdown} ${styles.select}`} 
                  placeholder="Select an Option" 
                  size='sm'
                  value={formData.occupation}
                  onChange={(e, value) => setFormData({ ...formData, occupation: value  })} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>
                    
                    <Option value="Service" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Service</Option>
                    <Option value="Business" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Business</Option>
                    <Option value="Student" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Student</Option>
                    <Option value="Retired" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Retired</Option>
                    <Option value="House maker" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>House maker</Option>
                    <Option value="Professional" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Professional</Option>
                  </Select>
                  
                </div>

                <div className={styles.row8}>
                  <p className={styles.maritalStatusLabel}>Marital Status</p>
                  <Select className={`${styles.dropdown} ${styles.select}`}
                    placeholder="Select an Option"
                    size='sm'
                    value={formData.maritalStatus}
                    onChange={(e, value) => setFormData({ ...formData, maritalStatus: value  })} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>
                    
                    <Option value="Single" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Single</Option>
                    <Option value="Married" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Married</Option>
                    <Option value="Divorcee" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Divorcee</Option>
                    <Option value="Separated" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Separated</Option>
                    <Option value="Widower" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Widower</Option>
                  </Select>
                </div>

                <div className={styles.row8}>
                  <p className={styles.genderLabel}>Gender</p>
                  <Select className={`${styles.dropdown} ${styles.select}`}
                    placeholder="Select an Option"
                    size='sm'
                    value={formData.gender}
                    onChange={(e, value) => setFormData({ ...formData, gender: value  })} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>
                    
                    <Option value="Male" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Male</Option>
                    <Option value="Female" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Female</Option>
                    <Option value="Choose" not to Say className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>Choose not to Say</Option>
                  </Select>
                </div>

                <div className={styles.row8}>
                  <p className={styles.dependantsLabel}>Dependants</p>
                  <Select  className={`${styles.dropdown} ${styles.select}`}
                    placeholder="Select an Option"
                    size='sm'
                    value={formData.dependants}
                    onChange={(e, value) => setFormData({ ...formData, dependants: value  })} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>
                    
                    <Option value="0" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>0</Option>
                    <Option value="1" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>1</Option>
                    <Option value="2" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>2</Option>
                    <Option value="3" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>3</Option>
                    <Option value="4+" className={styles.dropdown_item} sx={{
                    fontFamily: "Inter",
                    fontStyle: "normal",
                    fontWeight: 600,
                    fontSize: "12.4px",
                    lineHeight: "15px",
                  }}>4+</Option>
                  </Select>
                </div>
              </div>
            </div>
            <div className={styles.block5} >
              <div className={styles.row6}>
                <div className={styles.info6} >Income</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Professional Income after Taxes</div>
                  <input
                    type="number"
                    name="professionalIncome"
                    className={styles.color1}
                    value={formData.professionalIncome}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Other income after taxes</div>
                  <input
                    type="number"
                    name="otherIncome"
                    className={styles.color11}
                    value={formData.otherIncome}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.info6}>General Expenses</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Insurance Premium</div>
                  <input
                    type="number"
                    name="insurancePremium"
                    className={styles.color1}
                    value={formData.insurancePremium}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Current Ongoing Savings</div>
                  <input
                    type="number"
                    name="ongoingSavings"
                    className={styles.color11}
                    value={formData.ongoingSavings}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info7}>Loan</div>
                  <input
                    type="number"
                    name="loan"
                    className={styles.color1}
                    value={formData.loan}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>House Rent / Maintenance</div>
                  <input
                    type="number"
                    name="houseRent"
                    className={styles.color1}
                    value={formData.houseRent}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.info6}>Living Expenses</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Electricity bills</div>
                  <input
                    type="number"
                    name="electricityBills"
                    className={styles.color1}
                    value={formData.electricityBills}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Telephone Bills / Wifi</div>
                  <input
                    type="number"
                    name="telephoneBills"
                    className={styles.color11}
                    value={formData.telephoneBills}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info7}>Ration, Grocery and LPG</div>
                  <input
                    type="number"
                    name="grocery"
                    className={styles.color1}
                    value={formData.grocery}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Medicine</div>
                  <input
                    type="number"
                    name="medicine"
                    className={styles.color1}
                    value={formData.medicine}
                    onChange={handleChange}
                  />
                </div>
                <div className={styles.info6}>Other Expenses</div>

                <div className={styles.row7}>
                  <div className={styles.info7}>Education / Tuition fees</div>
                  <input
                    type="number"
                    name="educationFees"
                    className={styles.color1}
                    value={formData.educationFees}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>House help</div>
                  <input
                    type="number"
                    name="houseHelp"
                    className={styles.color11}
                    value={formData.houseHelp}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info7}>Religious/social cause</div>
                  <input
                    type="number"
                    name="socialCause"
                    className={styles.color1}
                    value={formData.socialCause}
                    onChange={handleChange}
                  />
                </div>

                <div className={styles.row8}>
                  <div className={styles.info71}>Entertainment / Leisure (Food, Shopping etc.)</div>
                  <input
                    type="number"
                    name="entertainment"
                    className={styles.color1}
                    value={formData.entertainment}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <button className={styles.addButton} onClick={handleSubmit}>Save</button>
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

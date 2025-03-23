import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";

const InputField = ({ label, name, type, value, onChange, placeholder }) => {
  return (
    <div className={styles.inputFieldContainer}>
      <label htmlFor={name}>{label}:</label>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={styles.inputField}
        required
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default InputField;
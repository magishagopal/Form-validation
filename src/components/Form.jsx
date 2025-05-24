import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', username: '', email: '', password: '',
    phone: '', country: '', city: '', pan: '', aadhar: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.firstName) errs.firstName = 'Required';
    if (!formData.lastName) errs.lastName = 'Required';
    if (!formData.username) errs.username = 'Required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) errs.email = 'Invalid Email';
    if (!formData.password) errs.password = 'Required';
    if (!/^\+\d{1,3}\s\d{10}$/.test(formData.phone)) errs.phone = 'Format: +91 9876543210';
    if (!formData.country) errs.country = 'Select a country';
    if (!formData.city) errs.city = 'Select a city';
    if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.pan)) errs.pan = 'Invalid PAN';
    if (!/^\d{12}$/.test(formData.aadhar)) errs.aadhar = 'Must be 12 digits';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) navigate('/success', { state: { formData } });
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        {['firstName', 'lastName', 'username', 'email', 'phone', 'pan', 'aadhar'].map(field => (
          <div className="form-group" key={field}>
            <label>{field.toUpperCase()}</label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              value={formData[field]}
              onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
            />
            {errors[field] && <span className="error">{errors[field]}</span>}
          </div>
        ))}
        <div className="form-group">
          <label>PASSWORD</label>
          <div className="password-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {errors.password && <span className="error">{errors.password}</span>}
        </div>
        <div className="form-group">
          <label>COUNTRY</label>
          <select value={formData.country} onChange={(e) => setFormData({ ...formData, country: e.target.value })}>
            <option value="">-- Select --</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>
        <div className="form-group">
          <label>CITY</label>
          <select value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}>
            <option value="">-- Select --</option>
            {formData.country === 'India' && (
              <>
                <option value="Chennai">Chennai</option>
                <option value="Mumbai">Mumbai</option>
              </>
            )}
            {formData.country === 'USA' && (
              <>
                <option value="New York">New York</option>
                <option value="Chicago">Chicago</option>
              </>
            )}
          </select>
          {errors.city && <span className="error">{errors.city}</span>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.css';

const Success = () => {
  const { state } = useLocation();
  const data = state?.formData;
  const navigate = useNavigate();

  const capitalize = (str) =>
    str.charAt(0).toUpperCase() + str.slice(1).replace(/_/g, ' ');

  return (
    <div className="form-container success-container">
      <h2>Submitted Details</h2>
      {data ? (
        <div className="success-details">
          {Object.entries(data).map(([key, value]) => (
            <div className="detail-row" key={key}>
              <span className="detail-key">{capitalize(key)}</span>
              <span className="detail-value">{value || 'N/A'}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No data found</p>
      )}
      <button className="back-btn" onClick={() => navigate(-1)}>Back to Form</button>
    </div>
  );
};

export default Success;

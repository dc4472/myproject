import React from 'react';

const Confirmation = ({ formData, onEdit }) => (
  <div>
    <h2>Summary</h2>
    <p><strong>Patient Name:</strong> {formData.name}</p>
    <p><strong>Patient Address:</strong> {formData.address}</p>
    <p><strong>Hospital Name:</strong> {formData.hospital}</p>
    <p><strong>Date of Service:</strong> {formData.dos}</p>
    <p><strong>Bill Amount:</strong> {formData.amount}</p>
    <img src={formData.image} alt="Bill" />

    <button onClick={onEdit}>Edit Information</button>
  </div>
);

export default Confirmation
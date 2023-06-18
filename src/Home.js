import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = props => {

      // Retrieve the bill data from localStorage
  const navigate = useNavigate()

  const getBillsFromLocalStorage = () => {
    const bills = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('bill-')) {
        const billData = JSON.parse(localStorage.getItem(key));
        bills.push(billData);
      }
    }

    return bills;
  };

  const bills = getBillsFromLocalStorage();

  // <h2>Bill ID: {bill.id}</h2> This is just for later in case I still need it
  return (
    <div>
      <h1>Uploaded Bills</h1>
      {bills.map((bill) => (
        <div key={bill.id}>
          {/* Display bill information */}
          <p>Patient Name: {bill.name}</p>
          <p>Patient Address: {bill.address}</p>
          <p>Date of Service: {bill.dos}</p>
          <p>Hospital Name: {bill.hospital}</p>
          <p>Amount due: {bill.amount}</p>
        </div>
      ))}
        <button onClick={() => navigate('/form')}>Add Bill</button>
    </div>
  );





}

export default Home
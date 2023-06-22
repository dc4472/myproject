import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import { db } from './firebase-config';
import './Home.css'

const Home = props => {

      // Retrieve the bill data from localStorage
  const [bills, setBills] = useState([]);
  const navigate = useNavigate()

  const getBillsFromFirestore = async (userId) => {
    const bills = [];
  
    try {
      const snapshot = await db.collection('users').doc(userId).collection('bills').get();
  
      snapshot.forEach((doc) => {
        const billData = doc.data();
        bills.push(billData);
      });
    } catch (error) {
      console.log('Error retrieving bills:', error);
    }
  
    return bills;
  };

  useEffect(() => {
    const fetchBills = async () => {
      try {
        // Get the current user's ID
        const user = firebase.auth().currentUser
        const userId = user.uid; // You need to replace this with the actual user ID

        // Retrieve bills from Firestore
        const bills = await getBillsFromFirestore(userId);

        // Set the bills in the component state
        setBills(bills);
      } catch (error) {
        console.log('Error retrieving bills:', error);
      }
    };

    fetchBills();
  }, []);


  // <h2>Bill ID: {bill.id}</h2> This is just for later in case I still need it
  // <p>Patient Name: {bill.name}</p>
  return (
    <div className="container">
      <h1>Uploaded Bills</h1>
      <div className="bill-list">
        {bills.map((bill) => (
          <div className='bill-item' key={bill.id} >
            <div className="bill-item-content">
              {/* Display bill information */}
              <p className="patient-name" onClick={() => navigate(`/edit/${bill.id}`)}>Patient Name: {bill.name}</p>
              <p>Patient Address: {bill.address}</p>
              <p>Date of Service: {bill.dos}</p>
              <p>Hospital Name: {bill.hospital}</p>
              <p>Amount due: {bill.amount}</p>
            </div>
          </div>
        ))}
      </div>
        <button onClick={() => navigate('/form')}>Add Bill</button>
    </div>
  );





}

export default Home
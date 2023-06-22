import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import './Home.css'

const Home = props => {

      // Retrieve the bill data from localStorage
  const navigate = useNavigate()
  const [userBills, setUserBills] = useState([]);


  useEffect(() => {
    const userIdentifier = firebase.auth().currentUser.uid;
    const billsCollection = firebase.firestore().collection('bills');

    const unsubscribe = billsCollection
      .where('userId', '==', userIdentifier)
      .onSnapshot((querySnapshot) => {
        const bills = [];
        querySnapshot.forEach((doc) => {
          const billData = doc.data();
          bills.push(billData);
        });
        setUserBills(bills);
      });

    return () => unsubscribe();
  }, []);

 

  // <h2>Bill ID: {bill.id}</h2> This is just for later in case I still need it
  // <p>Patient Name: {bill.name}</p>
  return (
    <div className="container">
      <h1>Uploaded Bills</h1>
      <div className="bill-list">
        {userBills.map((bill) => (
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
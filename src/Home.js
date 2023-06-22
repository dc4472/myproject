import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import firebase from './firebasecon'
import './Home.css'

const Home = props => {

  const [bills, setBills] = useState([]);
      // Retrieve the bill data from localStorage
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get the currently authenticated user
        const user = firebase.auth().currentUser;

        if (user) {
          // Get a reference to the user's bills collection
          const billsCollection = firebase.firestore().collection('users').doc(user.uid).collection('bills');

          // Fetch the bills documents from the collection
          const snapshot = await billsCollection.get();

          // Map the snapshot documents to an array of bill objects
          const billsData = snapshot.docs.map((doc) => doc.data());

          // Set the bills state with the retrieved data
          setBills(billsData);
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
      console.log('User logged out')
      navigate('/')
      // Additional actions after successful logout
    } catch (error) {
      // Handle logout error
      console.error('Error logging out:', error);
    }
  };



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
        <br />
        <br />
        <button onClick={handleLogout}>Logout</button>
    </div>
  );





}

export default Home
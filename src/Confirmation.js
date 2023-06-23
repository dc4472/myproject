import React, { useState , useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
import { useParams , useNavigate } from 'react-router-dom'
import firebase from './firebasecon'
import './BillForm.css'

const Confirmation = () =>{

  const { billId } = useParams()
  const [billData, setBillData] = useState(null);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        // Get the currently authenticated user
        const user = firebase.auth().currentUser;

        if (user) {
          // Get a reference to the user's bill document
          const billDocRef = firebase
            .firestore()
            .collection('users')
            .doc(user.uid)
            .collection('bills')
            .doc(billId.toString());

          // Fetch the bill document data
          const billSnapshot = await billDocRef.get();

          if (billSnapshot.exists) {
            // Set the bill data state with the retrieved data
            setBillData(billSnapshot.data());
          } else {
            // Document doesn't exist
            console.log('Bill document not found');
          }
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    };

    fetchBillData();
  }, [billId]);

  const handleHomeNav = () => {

    navigate('/home')

  }

  const handleEditNav = () => {

    navigate(`/edit/${billData.id}`)

  }
 

  

  if (!billData) {
    return <div>No data available</div>;
  }

  return (
    <div className="centered-form">
      <h2>Summary</h2>
      <p>Name: {billData.name}</p>
      <p>Address: {billData.address}</p>
      <p>Hospital: {billData.hospital}</p>
      <p>Date of Service: {billData.dos}</p>
      <p>Amount: {billData.amount}</p>
      <button onClick={handleHomeNav}>Go to Homepage</button>
      < br />
      <br />
      <button onClick={handleEditNav}>Edit Everything</button>
    </div>
  );

}

export default Confirmation
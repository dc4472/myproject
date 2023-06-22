import React, { useState , useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
import { useParams , Link } from 'react-router-dom'
import firebase from './firebasecon'

const Confirmation = () =>{

  const { billId } = useParams()
  const [billData, setBillData] = useState(null);

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
 

  

  if (!billData) {
    return <div>No data available</div>;
  }

  return (
    <div>
      <h2>Summary</h2>
      <p>Name: {billData.name}</p>
      <p>Address: {billData.address}</p>
      <p>Hospital: {billData.hospital}</p>
      <p>Date of Service: {billData.dos}</p>
      <p>Amount: {billData.amount}</p>
      <Link to="/home">Go to Homepage</Link>
      < br />
      <br />
      <Link to={`/edit/${billData.id}`}>Edit Everything</Link>
    </div>
  );

}

export default Confirmation
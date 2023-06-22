import React, { useState , useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
import { useParams , Link } from 'react-router-dom'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

const Confirmation = () =>{

  const { billId } = useParams()

  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = firebase.auth().currentUser;
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Retrieve the bill data from localStorage
        const storedBillData = JSON.parse(localStorage.getItem(`bill-${billId}`));

        // Check if the bill data exists and if it belongs to the current user
        if (!storedBillData || storedBillData.userId !== user.uid) {
          throw new Error('No data available or you are not authorized to view this bill.');
        }

        setBillData(storedBillData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [billId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }


  return (
    <div>
      <h2>Summary</h2>
      <p>Name: {billData.name}</p>
      <p>Address: {billData.address}</p>
      <p>Hospital: {billData.hospital}</p>
      <p>Date of Service: {billData.dos}</p>
      <p>Amount: {billData.amount}</p>
      {/* Additional fields can be displayed as needed */}
      <Link to="/home">Go to Homepage</Link>
      <br />
      <br />
      <Link to={`/edit/${billData.id}`}>Edit Everything</Link>
    </div>
  );

}

export default Confirmation
import React, { useState , useEffect } from "react";
// import { useNavigate } from 'react-router-dom'
import { useParams , Link } from 'react-router-dom'

const Confirmation = () =>{

  const { billId } = useParams()
  // const [bills, setBills]=useState([])
  
  // const [billData, setBillData] = useState(null);
  const billData = JSON.parse(localStorage.getItem(`bill-${billId}`))
  // setBillData(billData)

  useEffect(() => {
    // Retrieve the most recent input from localStorage
    /*
    const keys = Object.keys(localStorage);
    if (keys.length > 0) {
      const lastKey = keys[keys.length - 1];
      const lastBillData = JSON.parse(localStorage.getItem(lastKey));
      setBillData(lastBillData);
    }
    */

    // const lastBillData = JSON.parse(localStorage.getItem(billId));
    // setBillData(lastBillData)


  }, [])

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
      {/* Additional fields can be displayed as needed */}
      <Link to="/">Go to Homepage</Link>
      
      <Link to={`/edit/${billData.id}`}>Edit Everything</Link>
    </div>
  );

}

export default Confirmation
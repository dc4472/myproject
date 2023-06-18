import React, {  useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
// import axios from 'axios'

const BillForm = props =>{

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [dos, setDos] = useState('')
    const [hospital, setHospital] = useState('')
    const [amount, setAmount] = useState('')
    const [image, setImage] = useState(null);
    const [error, setError] = useState(undefined)

    const navigate = useNavigate()

    const handleSubmit = (event) => {
      event.preventDefault();
      
      // Generate a unique identifier for the bill (e.g., timestamp)
      const billId = Date.now();
    
      // Create an object with the form data
      const billData = {
        id: billId,
        name: name,
        address: address,
        dos: dos,
        hospital: hospital,
        amount: amount,
        image: image,
      };
    
      // Save the bill data to localStorage
      localStorage.setItem(`bill-${billId}`, JSON.stringify(billData));
    
      // Reset the form inputs
      setName('');
      setAddress('');
      setDos('');
      setHospital('');
      setAmount('');
      setImage(null);
    
      // Redirect to the home page
      navigate('/');
    }
    

    
    return (

        <>
        <form onSubmit={event => handleSubmit(event)}>
        <label>
          Patient Name:
          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <br />
        <label>
          Patient Address:
          <input
            type="text"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </label>
        <br />
        <label>
          Hospital Name:
          <input
            type="text"
            value={hospital}
            onChange={(event) => setHospital(event.target.value)}
          />
        </label>
        <br />
        <label>
          Date of Service:
          <input
            type="date"
            value={dos}
            onChange={(event) => setDos(event.target.value)}
          />
        </label>
        <br />
        <label>
          Bill Amount:
          <input
            type="float"
            value={amount}
            onChange={(event) => setAmount(event.target.value)}
          />
        </label>
        <br />
        <label>
        Bill Image:
        <input
          type="file"
          accept="image/*"
          onChange={(event) => setImage(event.target.files[0])}
        />
      </label>
      <br />

        <br />
        <button type="submit">Submit</button>
      </form>

      </>

    )


}
export default BillForm
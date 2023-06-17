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
    // const [error, setError] = useState(undefined)

    const navigate = useNavigate()

    const handleSubmit = async (event) => {
        event.preventDefault();
      
        const formData = new FormData();
        formData.append('patientName', name);
        formData.append('patientAddress', address);
        formData.append('hospitalName', hospital);
        formData.append('dateOfService', dos);
        formData.append('billAmount', amount);
        formData.append('billImage', image);
        
      
        try {
          const response = await axios.post('/api/submit-medical-bill', formData);
          // Handle the response or perform any necessary actions
          console.log(response.data);
          // Reset the form fields
          setName('');
          setAddress('');
          setHospital('');
          setDos('');
          setAmount('');
          setImage(null);
          
        } catch (error) {
          // Handle any errors that occur during the request
          console.error(error);
        }
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
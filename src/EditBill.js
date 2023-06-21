import React, { useState , useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const EditBill = () => {

    const { billId } = useParams()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [dos, setDos] = useState('')
    const [hospital, setHospital] = useState('')
    const [amount, setAmount] = useState('')
    const [image, setImage] = useState(null);

    const navigate = useNavigate()

    const billData = JSON.parse(localStorage.getItem(`bill-${billId}`))

    
    useState(() => {

        setName(billData.name)
        setAddress(billData.address)
        setDos(billData.dos)
        setHospital(billData.hospital)
        setAmount(billData.amount)
        setImage(billData.image)

    },[])
    

    /*
    useEffect(() => {
      const billData = JSON.parse(localStorage.getItem(`bill-${billId}`));
  
      if (billData) {
        setName(billData.name);
        setAddress(billData.address);
        setDos(billData.dos);
        setHospital(billData.hospital);
        setAmount(billData.amount);
        setImage(billData.image);
      }
    }, [billId]);
    */

    const handleSubmit = (e) =>{

        e.preventDefault()

        const UpdatedBill ={

            id: billId,
            name: name,
            address: address,
            dos: dos,
            hospital: hospital,
            amount: amount,
            image: image,

        }


        localStorage.setItem(`bill-${billId}`, JSON.stringify(UpdatedBill))
        navigate(`/confirmation/${billId}`)
    }

    const handleDelete = () => {
      localStorage.removeItem(`bill-${billId}`);
      // Navigate to a different page or perform other actions as needed
      navigate('/')
    }

    return (

        <>
        <h2>Edit Bill</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Patient Name:
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <br />
          <label>
            Patient Address:
            <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
          </label>
          <br />
          <label>
            Hospital Name:
            <input type="text" value={hospital} onChange={(e) => setHospital(e.target.value)} />
          </label>
          <br />
          <label>
            Date of Service:
            <input type="date" value={dos} onChange={(e) => setDos(e.target.value)} />
          </label>
          <br />
          <label>
            Bill Amount:
            <input type="float" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </label>
          <br />
          <button type="submit">Save Changes</button>
          <br />
          <button type="button" onClick={handleDelete}>Delete Bill</button>
        </form>
      </>




    )








}

export default EditBill

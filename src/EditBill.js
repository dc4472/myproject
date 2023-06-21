import React, { useState , useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
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

    const initialValues = {

      name: billData.name,
      address: billData.address,
      dos: billData.dos,
      hospital: billData.hospital,
      amount: billData.amount,
      image: null,

    }

    
    useState(() => {

        setName(billData.name)
        setAddress(billData.address)
        setDos(billData.dos)
        setHospital(billData.hospital)
        setAmount(billData.amount)
        setImage(billData.image)

    },[])

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      dos: Yup.string().required('Date of Service is required'),
      hospital: Yup.string().required('Hospital Name is required'),
      amount: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required'),
    })
    

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

     */

    const handleSubmit = (values, { resetForm }) => {

      /*
      // Generate a unique identifier for the bill (e.g., timestamp)
      const billId = Date.now();
  
      // Create an object with the form data
      const billData = {
        id: billId,
        name: values.name,
        address: values.address,
        dos: values.dos,
        hospital: values.hospital,
        amount: values.amount,
        image: values.image,
      };
  
      // Save the bill data to localStorage
      localStorage.setItem(`bill-${billId}`, JSON.stringify(billData));
  
      // Reset the form inputs
      resetForm();

      navigate(`/confirmation/${billData.id}`);
      */

      const billData = JSON.parse(localStorage.getItem(`bill-${billId}`));

      if (billData) {
        // Update the existing bill data with the form values
        const updatedBillData = {
          ...billData,
          name: values.name,
          address: values.address,
          dos: values.dos,
          hospital: values.hospital,
          amount: values.amount,
          image: values.image,
        };
    
        // Save the updated bill data to localStorage
        localStorage.setItem(`bill-${billId}`, JSON.stringify(updatedBillData));
    
        // Reset the form inputs
        resetForm();
    
        navigate(`/confirmation/${billId}`);
      }


  
    }


    const handleDelete = () => {
      localStorage.removeItem(`bill-${billId}`);
      // Navigate to a different page or perform other actions as needed
      navigate('/')
    }

    return (

      <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
   >

<Form>
<label>
  Patient Name:
  <Field type="text" name="name" />
  <ErrorMessage name="name" component="div" className="error" />
</label>
<br />
<label>
  Patient Address:
  <Field type="text" name="address" />
  <ErrorMessage name="address" component="div" className="error" />
</label>
<br />
<label>
  Hospital Name:
  <Field type="text" name="hospital" />
  <ErrorMessage name="hospital" component="div" className="error" />
</label>
<br />
<label>
  Date of Service:
  <Field type="date" name="dos" />
  <ErrorMessage name="dos" component="div" className="error" />
</label>
<br />
<label>
  Bill Amount:
  <Field type="number" name="amount" />
  <ErrorMessage name="amount" component="div" className="error" />
</label>
<br />
<label>
  Bill Image:
  <Field type="file" name="image" />
  <ErrorMessage name="image" component="div" className="error" />
</label>
<br />

<br />
<button type="submit">Submit</button>
<br />
<button type="button" onClick={handleDelete}>Delete Bill</button>
</Form>
</Formik>


       



    )








}

export default EditBill

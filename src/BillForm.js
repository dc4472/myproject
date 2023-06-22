import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import firebase from './firebasecon'

const BillForm = props =>{

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [dos, setDos] = useState('')
    const [hospital, setHospital] = useState('')
    const [amount, setAmount] = useState('')
    const [image, setImage] = useState(null);
    const [error, setError] = useState(undefined)
  

    const navigate = useNavigate()

    const initialValues = {
      name: '',
      address: '',
      dos: '',
      hospital: '',
      amount: '',
      image: null
    }

    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      dos: Yup.string().required('Date of Service is required'),
      hospital: Yup.string().required('Hospital Name is required'),
      amount: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required'),
    });



    const handleSubmit = (values, { resetForm }) => {
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
  
    }



    /*
    <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
         ></Formik>

    */
    

    
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
    </Form>
    </Formik>

      
    )


}
export default BillForm
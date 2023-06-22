import React, { useState , useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'

const EditBill = () => {

    const { billId } = useParams()
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [dos, setDos] = useState('')
    const [hospital, setHospital] = useState('')
    const [amount, setAmount] = useState('')
    const [image, setImage] = useState(null);

    const navigate = useNavigate()
    const [error, setError] = useState(undefined)


    const billData = JSON.parse(localStorage.getItem(`bill-${billId}`))

    
    const isOwner = () => {

      const user = firebase.auth().currentUser
      return user && billData && billData.userId === user.uid

    }

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
    



    const handleSubmit = (values, { resetForm }) => {

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
      const billData = JSON.parse(localStorage.getItem(`bill-${billId}`));

      if (isOwner()) {
        localStorage.removeItem(`bill-${billId}`);
        navigate('/home');
      } else {
        setError('You are not authorized to delete this bill.');
      }
    }

    if (!isOwner()) {
      return <div>You are not authorized to edit or delete this bill.</div>;
    }

    return (

      <div>
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
        {error && <div>{error}</div>}
      </div>

    )

}

export default EditBill

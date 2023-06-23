import React, { useState , useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useNavigate, useParams } from 'react-router-dom'
import firebase from './firebasecon'
import './BillForm.css'

const EditBill = () => {

    const { billId } = useParams()
    const navigate = useNavigate()
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
              const billData=billSnapshot.data()
              setBillData(billData);

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


    const validationSchema = Yup.object().shape({
      name: Yup.string().required('Name is required'),
      address: Yup.string().required('Address is required'),
      dos: Yup.string().required('Date of Service is required'),
      hospital: Yup.string().required('Hospital Name is required'),
      amount: Yup.number()
        .typeError('Amount must be a number')
        .required('Amount is required'),
      image:  Yup.mixed().test('image', 'Image is required', function (value) {
        if (!value) {
          return this.createError({
            path: 'image',
            message: 'Please upload an image',
          });
        }
        return true;
      })
    
    })
    

    const handleSubmit = async (values) => {

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
    
          // Update the bill document with the form values
          await billDocRef.update({
            name: values.name,
            address: values.address,
            dos: values.dos,
            hospital: values.hospital,
            amount: values.amount,
            image: values.image
          });
          navigate(`/confirmation/${billId}`);
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }
    }


    const handleDelete = async () => {
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
  
          // Delete the bill document
          await billDocRef.delete();
  
          navigate('/home');
        }
      } catch (error) {
        // Handle the error
        console.error(error);
      }

    
    }

    if (!billData) {
      return <div>Loading...</div>;
    }

    return (

      <Formik
      initialValues={{

      
        name: billData?.name|| '',
        address: billData?.address || '',
        dos: billData?.dos || '',
        hospital: billData?.hospital || '',
        amount: billData?.amount || '',
        image: null,
        
  
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >

      <Form className='centered-form'>
      <h1>Bill</h1>
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
          <Field type="file" name="image" accept="image/*"/>
          <ErrorMessage name="image" component="div" className="error" />
      </label>
      <br />
        {billData.image && (
          <div>
            <label>Previously Given Image:</label>
            <br />
            <img
              src={billData.image}
              alt="Previously Given Bill"
              className="previous-image"
            />
          </div>
        )}
      <br />

      <br />
      <button type="submit">Submit</button>
      <br />

      <br />
      <button type="button" onClick={handleDelete}>Delete Bill</button>
      <br />
      </Form>
    </Formik>

    )

}

export default EditBill

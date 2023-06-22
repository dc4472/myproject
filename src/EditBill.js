import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from './firebase-config';

const EditBill = () => {
  const { billId } = useParams();
  const navigate = useNavigate();

  const [initialValues, setInitialValues] = useState({
    name: '',
    address: '',
    dos: '',
    hospital: '',
    amount: '',
    image: null,
  });

  useEffect(() => {
    const fetchBillData = async () => {
      try {
        const docRef = await db.collection('bills').doc(billId).get();

        if (docRef.exists) {
          const billData = docRef.data();
          setInitialValues(billData);
        } else {
          console.log('No bill found');
        }
      } catch (error) {
        console.log('Error retrieving bill:', error);
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
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      // Update the bill data in Firestore
      await db.collection('bills').doc(billId).update(values);

      // Reset the form inputs
      resetForm();

      navigate(`/confirmation/${billId}`);
    } catch (error) {
      console.log('Error updating bill:', error);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete the bill document from Firestore
      await db.collection('bills').doc(billId).delete();

      // Navigate to a different page or perform other actions as needed
      navigate('/home');
    } catch (error) {
      console.log('Error deleting bill:', error);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
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
        <button type="button" onClick={handleDelete}>
          Delete Bill
        </button>
      </Form>
    </Formik>
  );
};

export default EditBill;

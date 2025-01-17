import React from 'react'
import Modal from "./Modal.jsx";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/Firebase.js';
import { toast } from 'react-toastify';
import * as Yup from 'yup'

const contactSchemaValidation = Yup.object().shape({
    contacts:Yup.string().required("Name is Required"),
    email:Yup.string().email("Invalid Email").required("Email is Required")
})
const AddandUpdate = ({ contact,isUpdate,isOpen, onClose }) => {
    const addContact = async (contact) => {
        try {
            const contactRef = collection(db, "contacts");
            await addDoc(contactRef, contact)
            toast.success("Added Successfully")
            onClose();
        }
        catch (error) {
            console.log(error)

        }

    }
    const updateContact = async (contact,id) => {
        try {
            const contactRef = doc (db, "contacts",id);
            await updateDoc(contactRef, contact)
            toast.success("Updated Successfully")
            onClose();
        }
        catch (error) {
            console.log(error)

        }

    }
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <Formik validationSchema={contactSchemaValidation}
                    initialValues={isUpdate?{
                        contacts: contact.contacts,
                        email: contact.email

                    }:
                    { 
                        contacts: "",
                        email: ""
                    }}
                    onSubmit={(values) => {
                        isUpdate? updateContact(values,contact.id):
                        addContact({
                            contacts: values.contacts,
                            email: values.email
                        })

                    }}
                >
                    <Form className='flex flex-col '>
                        <div className='flex flex-col gap-1.5'>

                            <label className='font-bold' htmlFor='contacts'>Name</label>
                            <Field autocomplete="off" className="bg-transparent border-2 border-black max-w-[400px] text-black" name="contacts" />
                            <div className='text-red-500 text-xs font-bold'>
                                <ErrorMessage name="contacts"/>
                            </div>
                        </div>
                        <div className='flex flex-col gap-1.5'>

                            <label className='font-bold' htmlFor='email'>Email</label>
                            <Field autocomplete="off" className="bg-transparent border-2 border-black max-w-[400px] text-black" name="email" />
                            <div className='text-red-500 text-xs font-bold'>
                                <ErrorMessage name="email"/>
                            </div>
                        </div>
                        <button type='submit' className='bg-[#ffd471] border-0 absolute bottom-2 self-end rounded-xl m-2 py-2 px-4'>{isUpdate?"Update" : "Add Email"}</button>
                    </Form>
                </Formik>
            </Modal>
        </div>
    )
}

export default AddandUpdate

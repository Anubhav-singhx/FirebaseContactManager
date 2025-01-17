import React from 'react'
import { FaRegTrashCan } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { FaRegEdit } from "react-icons/fa";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/Firebase';
import AddandUpdate from './AddandUpdate';
import useDisclose from '../hooks/useDisclose';
import { toast } from 'react-toastify';
const ContactCard = ({ contact }) => {
    const { isOpen, onClose, onOpen } = useDisclose()
    const deleteContact = async (id) => {
        try {
            await deleteDoc(doc(db, "contacts", id));
            toast.success("Email Removed Successfully")

        }
        catch (error) {
            console.log(error)

        }
    }
    return (
        <>

            <div key={contact.id} className="my-2.5 flex justify-around items-center bg-[#f3f1c4] border border-[#f3f1c4] rounded-lg p-3">
                <div className="flex items-center gap-6">
                    <CgProfile className="text-3xl" />
                    <div>
                        <h2>{contact.contacts}</h2>
                        <p className="text-[#787575] text-sm">{contact.email}</p>
                    </div>
                </div>
                <div className="flex justify-center items-center flex-col gap-3">
                    <FaRegEdit onClick={onOpen} className="cursor-pointer text-xl hover:text-[#28832e]" />
                    <FaRegTrashCan onClick={() => deleteContact(contact.id)} className="cursor-pointer text-xl hover:text-[#d53232]" />
                </div>
            </div>
            <AddandUpdate contact={contact} isUpdate isOpen={isOpen} onClose={onClose} />
        </>
    )
}

export default ContactCard

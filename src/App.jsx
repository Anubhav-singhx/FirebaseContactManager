import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { CiSearch } from "react-icons/ci";
import { IoIosAddCircleOutline } from "react-icons/io";
import { collection, getDocs, onSnapshot } from "firebase/firestore"
import { db } from "./config/Firebase.js"
import { ToastContainer, toast } from 'react-toastify';

import ContactCard from "./components/ContactCard.jsx";
import AddandUpdate from "./components/AddandUpdate.jsx";
import useDisclose from "./hooks/useDisclose.js";
import NotFound from "./components/NotFound.jsx";
export default function App() {
  const filterContact = (e) =>{
    const value = e.target.value;
    const contactsRef = collection(db, "contacts")
        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          const filteredContact = contactList.filter(contact=> contact.contacts.toLowerCase().includes(value.toLowerCase()))
          setContacts(filteredContact)

          return filteredContact

        })
  }

  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclose()
  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts")
        onSnapshot(contactsRef, (snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            }
          })
          setContacts(contactList)
          return contactList

        })

      }
      catch (error) {
        console.log(error)

      }

    }
    getContacts();
  }, [])


  return (
    <>

      <div className="max-w-[360px] m-auto">
        <Navbar />
        <div className="flex items-center">
          <div className="relative flex-grow flex m-3">
            <input onChange={filterContact} placeholder="Search" className="w-full pl-10 p-3 border-2 rounded-lg border-black h-11 bg-transparent" type="text" />
            <CiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          </div>
          <IoIosAddCircleOutline onClick={onOpen} className="text-3xl flex-grow cursor-pointer hover:text-[#235283]" />
        </div>
        <div>
          {contacts.length <= 0? <NotFound/> : contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          )
          )
          }
        </div>
      </div>
      <AddandUpdate isOpen={isOpen} onClose={onClose} />
      <ToastContainer position="bottom-center"/>
    </>
  )
}


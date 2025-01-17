import React from 'react'
import Firebaselogo from "/images/Firebase-Logo.png"
import { CiSearch } from "react-icons/ci";
const Navbar = () => {
    return (
        <div>

        <div className="mx-auto my-2 flex justify-evenly gap-12 p-3 border rounded-xl bg-[#d6d2a9]">
            <img className='w-[40px]'  src={Firebaselogo} alt="Firebase Logo" />
            <div>
            <h1 className='font-bold'>Email Manager</h1>
            <p>Using FireBase</p>
            </div>
        </div>
        </div>
    )
}

export default Navbar

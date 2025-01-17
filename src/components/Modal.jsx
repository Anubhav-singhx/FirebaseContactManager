import { createPortal } from "react-dom";
import { IoCloseSharp } from "react-icons/io5";
const Modal = ({isOpen , onClose, children}) => {
  return createPortal(
    <div>
      {isOpen && 
      <>
      <div className='m-auto relative z-50 bg-[#feffc1] max-w-[70%] border rounded-3xl lg:max-w-[35%] p-3 h-[250px]'>
      <div className="flex justify-end">

      <IoCloseSharp onClick={onClose} className="text-2xl cursor-pointer"/>
      </div>
      {children}
      </div>
      <div onClick={onClose} className="backdrop-blur h-screen w-screen absolute top-0 z-40"/>
      </>
      }
    </div>
  , document.getElementById("modal-root"))
}

export default Modal

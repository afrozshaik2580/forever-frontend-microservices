import { useNavigate } from "react-router-dom"

function Modal({success, isOpen, onClose, message}) {

    const navigate= useNavigate();

    function handleCloseModal(){
        onClose(!isOpen);
        document.body.style.overflow = 'auto';
        navigate("/admin/list");
    }

  return (
    <>
        <div tabIndex="-1" className={`${isOpen?"":"hidden"} overflow-y-auto overflow-x-hidden fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-black bg-opacity-50`}>
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow ">
                    <button onClick={handleCloseModal} type="button" className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-4 md:p-5 text-center">
                        {
                        success? 
                        <svg className="mx-auto mb-4 text-green-400 w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5"></path>
                        </svg>:
                        <svg className="mx-auto mb-4 w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"></path>
                        </svg>
                         }
                        <h3 className="mb-5 text-lg font-normal text-gray-500">{message}</h3>
                        <button onClick={handleCloseModal} type="button" className={`text-white ${success?"bg-green-600 hover:bg-green-800":"bg-red-600 hover:bg-red-800"} focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center`}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Modal
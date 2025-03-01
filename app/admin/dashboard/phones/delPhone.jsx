"use client"
import { db } from "@/Firebase/config"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { deleteDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

export const DelPhone = ({ phoneId, setDelPhone, setFetchData,setViewPhone }) => {

    const [confirmDel, setConfirmDel] = useState(false)

    const [loading, setLoading] = useState(false)

    useEffect(() => {

        const del = async () => {

            try {
                setLoading(true)
                // Reference to the specific document
                const docRef = doc(db, `raloc/logistics/phones/${phoneId}`);

                // Delete the document
                await deleteDoc(docRef);

                toast.success("Phone deleted successfully!")
                setFetchData(true)
                setDelPhone(false)
                setViewPhone(false)
            } catch (e) {
                console.log(e)
                toast.error("Internal server error!")
            } finally {
                setLoading(false)

            }
        }

        if (confirmDel) {
            del()
            setConfirmDel(false)
        }

    }, [confirmDel])

    return (
        <div className="fixed top-0 left-0 w-full h-svh bg-white/30 backdrop-blur-[1px] flex items-center justify-center">
            <div className="shadow-md bg-black text-white rounded-md max-w-xl w-full mx-auto p-6 border border-red-600">
                <h3>
                    Are you sure you want to delete this phone?
                </h3>

                <div className="flex justify-between mt-5">
                    <button onClick={() => setConfirmDel(true)} type="button" className="border border-lime-600 hover:bg-lime-600 transition duration-500 p-2 rounded-md hover:text-white">
                        {loading ? <FontAwesomeIcon icon={faSpinner} spin width={20} height={20} className="text-sm" /> : 'Yes'}
                    </button>

                    <button onClick={() => setDelPhone(false)} type="button" className="border border-red-600 hover:bg-red-600 transition duration-500 p-2 rounded-md hover:text-white">
                        No
                    </button>
                </div>
            </div>
        </div>
    )
}
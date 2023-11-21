import PrimaryButton from "@/Components/PrimaryButton"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, router } from "@inertiajs/react"
import { motion } from "framer-motion"
import { FaArrowLeft } from "react-icons/fa"

const TransactionRefund = ({auth, refund, transaction}: any) => {
  return (
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`ID: ${refund['id']}`}</h2>}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-5 bg-white overflow-hidden p-8 shadow-sm sm:rounded-lg">
          <div className="flex flex-row justify-between items-center">
            {refund['status'] !== "succeeded" ?  
            <span className="text-md font-black bg-[#ffca3a] p-2 rounded-xl">Refunded</span>
            : 
            <span className="text-md font-black bg-[#8ac926] p-2 rounded-xl">Refunded</span>
            }
            <motion.div whileHover={{scale: 1.08}} className='flex flex-row space-x-4 text-red-700 font-black select-none' onClick={() => {router.get(route('dashboard'))}}>
              <FaArrowLeft className="text-xl"/>
              <span>Return to dashboard</span>
            </motion.div>
          </div>
          <div className="flex flex-col space-y-3">
            <div>
              <h2>Amount</h2>
              <span>{`P ${refund['amount']}`}</span>
            </div>
            <div>
              <h2>Reason</h2>
              <span>{`${refund['reason']}`}</span>
            </div>
            <div>
              <h2>Status</h2>
              <span>{`${refund['status']}`}</span>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default TransactionRefund
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm } from '@inertiajs/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";
import ChangeCustomerInfo from './TransactionViewPartials/ChangeCustomerInfo'
import { debug } from 'console'
import { convertToMoney, dataChecker } from '@/Helper/dataHelper'
import ChangeVenueInfo from './TransactionViewPartials/ChangeVenueInfo'
import { useToast } from '@chakra-ui/react'




const TransactionView= ({transaction, allTransaction, customer, paymentDetails, auth, venue, allVenue}: any) => {

return (
  <AuthenticatedLayout user={auth.user} 
  header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Edit > ${transaction['id']}`}</h2>}>
    <Head title="Dashboard" />
    <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-6">
      <div className='bg-white p-6 shadow-lg grid grid-cols-3'>
        <div className='col-span-2 flex flex-col space-y-2'>
          <div className='col-span-2 flex flex-row space-x-4 items-center'>
            <h1 className='text-lg'>Payment details</h1>
            <h1 className={`text-[10px] uppercase px-4 border-2  ${dataChecker(paymentDetails, 'status') !== "paid" ? "border-yellow-200 bg-yellow-100" : "border-green-200 bg-green-100"}`}>{dataChecker(paymentDetails, 'status')}</h1>
          </div>
          <div className='p-0 m-0 flex items-center space-x-2'>
              <span>
                {`Pay ID: ${transaction['payment_id']}`}
              </span>
            </div>
          <div className='grid grid-cols-2 grid-rows-3 w-[50%]'>
            <h1 className='text-sm'>Gross amount</h1>
            <h1 className='text-sm text-end'>{convertToMoney(dataChecker(paymentDetails, 'amount'))}</h1>
            <h1 className='text-sm'>Fees</h1>
            <h1 className='text-sm text-end'>{convertToMoney((dataChecker(paymentDetails, 'netAmount') / 100) - dataChecker(paymentDetails, 'amount'))}</h1>
            <h1 className='text-sm border-t-2 pt-2'>Net amount</h1>
            <h1 className='text-sm text-end border-t-2 pt-2'>{convertToMoney((dataChecker(paymentDetails, 'netAmount') / 100))}</h1>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-start'>
            <h1 className='text-lg mb-2'>Paymongo billing details</h1>

            <div className='font-black p-0 m-0'>{dataChecker(paymentDetails, 'billingName')}</div>
            <div className='p-0 m-0 flex items-center space-x-2'>
              <MdEmail/>
              <span>
                {dataChecker(paymentDetails, 'billingEmail')}
              </span>
            </div>
            <div className='p-0 m-0 flex items-center space-x-2'>
              <FaPhone />
              <span>
                {dataChecker(paymentDetails, 'billingPhone')}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className='bg-white p-6 shadow-lg flex flex-col space-y-2'>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='text-lg'>Database customer info</h1>
          <h1 className='text-blue-700 cursor-pointer' onClick={() => router.get(route('admin.customer.viewCustomer', customer['id']))}>[ Profile Link ]</h1>
        </div>
        <ChangeCustomerInfo transaction={transaction} customer={customer} className='flex flex-col space-y-4'/>
      </div>

      <div className='bg-white p-6 shadow-lg flex flex-col space-y-2 w-full'>
        <h1 className='text-lg'>Booking settings</h1>
    
        <ChangeVenueInfo customer={customer} transaction={transaction} allTransaction={allTransaction} allVenue={allVenue} transactionVenue={venue}/>
      </div>
    </div>

  </AuthenticatedLayout>
)
}

export default TransactionView
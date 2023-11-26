import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { CircularProgress } from '@chakra-ui/react'
import { Head, router, useForm } from '@inertiajs/react'
import React from 'react'
import { FaArrowLeft } from 'react-icons/fa6'
import { MdEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa";




const TransactionView= ({transaction, customer, paymentDetails, auth}: any) => {
  // const {data, setData, patch, errors, setError, setDefaults, clearErrors, processing } = useForm<any>({
  //     email: transaction['email'],
  //     phone_number: transaction['phone_number'],
  //     first_name: transaction['first_name'],
  //     last_name: transaction['last_name'],
  // })

  // const handleSubmit = (e: any) => {
  //     e.preventDefault()
  //     patch(route('admin.customer.editCustomer', customer['id']))
  // }

  console.log(paymentDetails)

  const convertToMoney = (amount: number) => {
    return amount.toLocaleString('en-US', {style: 'currency', currency: 'PHP'})
  }

return (
  <AuthenticatedLayout user={auth.user} 
  header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Edit > ${transaction['id']}`}</h2>}>
    <Head title="Dashboard" />
    <div className="py-12 max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-6">
      <div className='bg-white p-6 shadow-lg grid grid-cols-3'>
        <div className='col-span-2 flex flex-col space-y-2'>
          <div className='col-span-2 flex flex-row space-x-4 items-center'>
            <h1 className='text-lg'>Payment details</h1>
            <h1 className={`text-[10px] uppercase px-4 border-2  ${paymentDetails['status'] !== "paid" ? "border-yellow-200 bg-yellow-100" : "border-green-200 bg-green-100"}`}>{paymentDetails['status']}</h1>
          </div>
          <div className='grid grid-cols-2 grid-rows-3 w-[50%]'>
            <h1 className='text-sm'>Gross amount</h1>
            <h1 className='text-sm text-end'>{convertToMoney(paymentDetails['amount'])}</h1>
            <h1 className='text-sm'>Fees</h1>
            <h1 className='text-sm text-end'>{convertToMoney((paymentDetails['netAmount'] / 100) - paymentDetails['amount'])}</h1>
            <h1 className='text-sm border-t-2 pt-2'>Net amount</h1>
            <h1 className='text-sm text-end border-t-2 pt-2'>{convertToMoney((paymentDetails['netAmount'] / 100))}</h1>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-start'>
            <h1 className='text-lg mb-2'>Billing details</h1>
            <div className='font-black p-0 m-0'>{paymentDetails['billingName']}</div>
            <div className='p-0 m-0 flex items-center space-x-2'>
              <MdEmail/>
              <span>
                {paymentDetails['billingEmail']}
              </span>
            </div>
            <div className='p-0 m-0 flex items-center space-x-2'>
              <FaPhone />
              <span>
                {paymentDetails['billingPhone']}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* <form onSubmit={handleSubmit} className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-6'>
          <div className='flex flex-col'>
              <InputLabel htmlFor="email" value='Email'/> 
              <TextInput autoComplete="off"  id='email' type="text" value={data.email} onChange={(e) => setData('email', e.target.value)} />
              {errors.email ? <div className='text-red-500'>{errors.email}</div> : null}
          </div>
          <div className='flex flex-col'>
              <InputLabel htmlFor="phone_number" value='phone_number'/> 
              <TextInput autoComplete="off"  id='phone_number' type="text" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} />
              {errors.phone_number ? <div className='text-red-500'>{errors.phone_number}</div> : null}
          </div>
          <div className='flex flex-col'>
              <InputLabel htmlFor="first_name" value='First Name'/> 
              <TextInput autoComplete="off"  id='first_name' type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
              {errors.first_name ? <div className='text-red-500'>{errors.first_name}</div> : null}
          </div>
          <div className='flex flex-col'>
              <InputLabel htmlFor="last_name" value='Last Name'/> 
              <TextInput autoComplete="off"  id='last_name' type="text" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
              {errors.last_name ? <div className='text-red-500'>{errors.last_name}</div> : null}
          </div>
          <div className='flex flex-row items-center justify-between'>
              <div className='flex flex-row space-x-4 text-red-700 font-black hover:scale-105 transition ease-in-out select-none' onClick={() => {router.get(route('admin.dashboard'))}}>
                <FaArrowLeft className="text-xl"/>
                <span>Return to Admin Panel</span>
              </div>
              <div className='flex md:flex-row space-x-4 items-center'>
                <PrimaryButton type='submit' disabled={processing ? true : false} className='md:order-last md:ms-3'>Edit</PrimaryButton>
                {processing ? <CircularProgress isIndeterminate color='blue.700' size="20px"/> : null}
              </div>
          </div>
      </form> */}
      <div className='bg-white p-6 shadow-lg flex flex-col space-y-2'>
        <div className='flex flex-row justify-between items-center w-full'>
          <h1 className='text-lg'>Database customer info</h1>
          <h1 className='text-blue-700 cursor-pointer' onClick={() => router.get(route('admin.customer.viewCustomer', customer['id']))}>[ Profile Link ]</h1>
        </div>
        <div className='grid grid-cols-2 grid-rows-3 w-[50%]'>
          <h1 className='text-sm'>Email</h1>
          <h1 className='text-sm text-end'>{customer['email']}</h1>
          <h1 className='text-sm'>Phone number</h1>
          <h1 className='text-sm text-end'>{customer['phone_number']}</h1>
          <h1 className='text-sm'>First name</h1>
          <h1 className='text-sm text-end'>{customer['first_name']}</h1>
          <h1 className='text-sm'>Last name</h1>
          <h1 className='text-sm text-end'>{customer['last_name']}</h1>
        </div>
        

      </div>
    </div>

  </AuthenticatedLayout>
)
}

export default TransactionView
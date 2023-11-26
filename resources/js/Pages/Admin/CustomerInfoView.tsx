import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm } from '@inertiajs/react'
import React from 'react'
import VenueSection from './Partials/VenueSection'
import CustomerSection from './Partials/CustomerSection'
import ReservationTable from '@/Components/Reservation/ReservationTable'
import RefundTable from '@/Components/Reservation/RefundTable'
import InputLabel from '@/Components/InputLabel'
import TextInput from '@/Components/TextInput'
import PrimaryButton from '@/Components/PrimaryButton'
import { FaArrowLeft } from 'react-icons/fa6'
import { CircularProgress, useToast } from '@chakra-ui/react'


const CustomerInfoView = ({auth, customer, success, error}: any) => {
  const toast = useToast()
  React.useEffect(() => {
      console.log(success)
      if(success !== null){
        toast({
          title: "Success",
          description: `${success}`,
          position: "bottom-right",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
      }
      if (error !== null){
        toast({
          title: "Failed",
          description: "Something went wrong",
          position: "bottom-right",
          status: "error",
          duration: 3000,
          isClosable: true,
        })
      }
      return () => {
          success = null
          error = null
      }
    }, [success, error, customer])
    const {data, setData, patch, errors, setError, setDefaults, clearErrors, processing } = useForm<any>({
        email: customer['email'],
        phone_number: customer['phone_number'],
        first_name: customer['first_name'],
        last_name: customer['last_name'],
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        patch(route('admin.customer.editCustomer', customer['id']))
    }


  return (
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Edit > [${customer['id']}] ${customer['first_name']} ${customer['last_name']}`}</h2>}>
      <Head title="Dashboard" />
      <div className="py-12">
        <form onSubmit={handleSubmit} className='max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-6'>
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
        </form>
      </div>
    </AuthenticatedLayout>
  )
}

export default CustomerInfoView
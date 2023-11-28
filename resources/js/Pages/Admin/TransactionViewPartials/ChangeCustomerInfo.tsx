import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import { dataChecker } from '@/Helper/dataHelper'
import { useToast } from '@chakra-ui/react'
import { useForm } from '@inertiajs/react'
import React from 'react'

const ChangeCustomerInfo = ({transaction, customer, className}: any) => {
    
    const {data, setData, patch, errors, setError, setDefaults, clearErrors, processing, wasSuccessful } = useForm<any>({
    email: customer['email'],
    phone_number: customer['phone_number'],
    first_name: customer['first_name'],
    last_name: customer['last_name'],
  })
  
  const toast = useToast()
  React.useEffect(() => {
    if (wasSuccessful){
        toast({
            title: "Success",
            description: "Customer information updated",
            position: "bottom-right",
            status: "success",
            duration: 3000,
            isClosable: true,
          })
    }
  }, [wasSuccessful])

  const handleSubmit = (e: any) => {
      e.preventDefault()
      patch(route('admin.customer.editCustomer', customer['id']))
  }
  return (
    <form onSubmit={handleSubmit} className={className}>
        <div className='flex flex-col'>
            <InputLabel htmlFor="phone_number" value='Email'/> 
            <TextInput autoComplete="off"  id='phone_number' type="text"  value={data.email} onChange={(e) => setData('phone_number', e.target.value)} />
            {errors.phone_number ? errors.phone_number : null}
        </div>
        <div className='flex flex-col'>
            <InputLabel htmlFor="phone_number" value='Phone Number ex: 9191219212'/> 
            <TextInput autoComplete="off"  id='phone_number' type="text"  value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} />
            {errors.phone_number ? errors.phone_number : null}
        </div>
        <div className='flex flex-col'>
            <InputLabel htmlFor="first_name" value='First name'/> 
            <TextInput autoComplete="off"  id='first_name' type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
            {errors.first_name ? errors.first_name : null}
        </div>
        <div className='flex flex-col'>
            <InputLabel htmlFor="last_name" value='Last name'/> 
            <TextInput autoComplete="off"  id='last_name' type="text"  value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
            {errors.last_name ? errors.last_name : null}
        </div>
        <div>
            <PrimaryButton type='submit'>Edit</PrimaryButton>
        </div>
    </form>
  )
}

export default ChangeCustomerInfo
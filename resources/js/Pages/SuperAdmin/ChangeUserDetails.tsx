import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Input, Select } from '@chakra-ui/react'
import { Head, useForm } from '@inertiajs/react'
import React from 'react'

const ChangeUserDetails = ({auth, user}: any) => {

    const {data, setData, patch, processing, errors} = useForm<any>({
        id: user['id'],
        first_name: user['first_name'],
        last_name: user['last_name'],
        email: user['email'],
        user_level: user['user_level'],
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        patch(route('superadmin.edit'))
    }


    return (
        <AuthenticatedLayout user={auth.user} 
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Update > User > [${user['id']}] ${user['first_name']} ${user['last_name']}`}</h2>}>
        <Head title="Admin | Edit User" />
        <div className="py-12">
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
                    <div className="grid grid-cols-3 gap-10">
                      <div className="col-span-2 space-y-4">
                        <div className="flex flex-col">
                          <InputLabel htmlFor="first_name">First name</InputLabel>
                          <TextInput autoComplete="off"  id='first_name' type="text" onChange={(e) => setData('first_name', e.target.value)} value={data.first_name}/>
                          {errors.first_name ? <div className='text-red-600'>{errors.first_name}</div> : null}
                        </div>
                        <div className="flex flex-col">
                          <InputLabel htmlFor="last_name">Last name</InputLabel>
                          <TextInput autoComplete="off"  id='last_name' type="text" onChange={(e) => setData('last_name', e.target.value)} value={data.last_name}/>
                          {errors.last_name ? <div className='text-red-600'>{errors.last_name}</div> : null}
                        </div>
                        <div className="flex flex-col">
                          <InputLabel htmlFor="email">Email</InputLabel>
                          <TextInput autoComplete="off"  id='email' type="text" onChange={(e) => setData('email', e.target.value)} value={data.email}/>
                          {errors.email ? <div className='text-red-600'>{errors.email}</div> : null}
                        </div>
                      </div>
                      <div>
                        <div className="flex flex-col">
                          <InputLabel htmlFor="user_level">User level</InputLabel>
                          <Select autoComplete="off" placeholder='Select user level' id='user_level' onChange={(e) => setData('user_level', e.target.value)} value={data.user_level}>
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                          </Select>
                          {errors.first_name ? <div className='text-red-600'>{errors.first_name}</div> : null}
                        </div>
                      </div>
                    </div>
                    <div><PrimaryButton type='submit' disabled={processing}>Submit</PrimaryButton></div>
                </form>
            </div>
        </div>
        </AuthenticatedLayout>  
      )
}

export default ChangeUserDetails
import Checkbox from '@/Components/Checkbox'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'

const UserAdminView = ({userdetails, auth}:any) => {
    const {data, setData, patch, errors, wasSuccessful, processing } = useForm({
        first_name: userdetails['first_name'],
        last_name: userdetails['last_name'],
        email: userdetails['email'],
        user_level: userdetails['user_level'],
        status: userdetails['status'],
    })
 
    const handleSubmit = (e: any) => {
        e.preventDefault()
        patch(route('admin.user.view', {user_id:userdetails['id']}))
    }
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{userdetails ? `Edit > User Profile > [ ID: ${userdetails['id']} ] ${userdetails['first_name']} ${userdetails['last_name']}` : "User not found"}</h2>}>
        <Head title="Admin | Edit User" />
        <div className="py-12">
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                {wasSuccessful ? "User profile successfully modified" : null}
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor="first_name" value='First Name'/> 
                        <TextInput autoComplete="off"  id='first_name' type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                        {errors.first_name ? errors.first_name : null}
                    </div>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor="last_name" value='Last Name'/> 
                        <TextInput autoComplete="off"  id='last_name' type="text" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                        {errors.last_name ? errors.last_name : null}
                    </div>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor="email">Email</InputLabel>
                        <TextInput autoComplete="off"  id='email' type="text" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email ? errors.email : null}
                    </div>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor='user_level'>User Level</InputLabel>
                        <select id='user_level' onChange={(e) => setData('user_level', e.target.value)} value={data.user_level} className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'>
                            <option value="customer">Customer</option>
                            <option value="vendor">Venue Vendor</option>
                        </select>
                        {errors.user_level ? errors.user_level : null}
                    </div>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor='status'>User Level</InputLabel>
                        <select id='status' onChange={(e) => setData('status', e.target.value)} value={data.status} className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'>
                            <option value="active">Active</option>
                            <option value="disabled">Disable</option>
                        </select>
                        {errors.status ? errors.status : null}
                    </div>
                    <div><PrimaryButton type='submit' disabled={processing}>Submit</PrimaryButton></div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default UserAdminView
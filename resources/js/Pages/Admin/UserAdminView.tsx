import Checkbox from '@/Components/Checkbox'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'

const UserAdminView = ({userdetails, auth}:any) => {
    const {data, setData, patch, errors, wasSuccessful, processing } = useForm({
        name: userdetails['name'],
        email: userdetails['email'],
        user_level: userdetails['user_level']
    })
 
    const handleSubmit = (e: any) => {
        e.preventDefault()
        patch(route('admin.user.view', {user_id:userdetails['id']}))
    }
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{userdetails ? `Edit > User Profile > [ ID: ${userdetails['id']} ] ${userdetails['name']}` : "User not found"}</h2>}>
        <Head title="Admin | Edit User" />
        <div className="py-12">
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                {wasSuccessful ? "User profile successfully modified" : null}
                <form onSubmit={handleSubmit}>
                    <InputLabel htmlFor="name">Name</InputLabel>
                    <TextInput autoComplete="off"  id='name' type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                    {errors.name ? errors.name : null}
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextInput autoComplete="off"  id='email' type="text" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    {errors.email ? errors.email : null}
                    <InputLabel htmlFor='user_level'>User Level</InputLabel>
                    <select id='user_level' onChange={(e) => setData('user_level', e.target.value)} value={data.user_level} className='border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm'>
                        <option value="0">User</option>
                        <option value="1">Shop Vendor</option>
                    </select>
                    {errors.user_level ? errors.user_level : null}
                    <div><PrimaryButton type='submit' disabled={processing}>Submit</PrimaryButton></div>
                </form>
            </div>
        </div>
    </AuthenticatedLayout>
  )
}

export default UserAdminView
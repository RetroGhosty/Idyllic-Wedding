import InputLabelComponent from '@/Components/FormComponents/InputLabelComponent'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import { error } from 'console'

const PhotographerView = ({photographer, auth}: any) => {
    const {data, setData, patch, errors, wasSuccessful, processing } = useForm({
        first_name: photographer['first_name'],
        last_name: photographer['last_name'],
        email: photographer['email'],
        phone_number: photographer['phone_number'],
        facebook_contact: photographer['facebook_contact'] ? photographer['facebook_contact'] : '',
        instagram_contact: photographer['instagram_contact'] ? photographer['instagram_contact'] : '',
        profile_picture: photographer['profile_picture'] ? photographer['profile_picture'] : '',
    })
 

    const handleSubmit = (e: any) => {
        e.preventDefault()
        patch(route('admin.photographer.update', {photographer_id:photographer['id']}))
    }
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{photographer ? `Edit > Photographer > [ ID: ${photographer['id']} ] ${photographer['first_name']} ${photographer['last_name']}` : "Venue not found"}</h2>}>
    <Head title="Admin | Edit User" />
    <div className="py-12">
        <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
            {wasSuccessful ? "User profile successfully modified" : null}
            <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
                <div className='flex flex-col'>
                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                    <TextInput autoComplete="off"  id="first_name" type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)} />
                    {errors.first_name ? errors.first_name : null}
                </div>
                <div className='flex flex-col'>
                    <InputLabel htmlFor="last_name">Last Name</InputLabel>
                    <TextInput autoComplete="off"  id="last_name" type="text" value={data.last_name} onChange={(e) => setData('last_name', e.target.value)} />
                    {errors.last_name ? errors.last_name : null}
                </div>
                <div className='flex flex-col'>
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <TextInput autoComplete="off"  id="email" type="text" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    {errors.email ? errors.email : null}
                </div>
                <div className='flex flex-col'>
                    <InputLabel htmlFor="phone_number">Phone Number</InputLabel>
                    <TextInput autoComplete="off"  id="phone_number" type="text" value={data.phone_number} onChange={(e) => setData('phone_number', e.target.value)} />
                    {errors.phone_number ? errors.phone_number : null}
                </div>
                <div className='flex flex-col'>
                    <InputLabel htmlFor="facebook_contact">Facebook Contact</InputLabel>
                    <TextInput autoComplete="off"  id="facebook_contact" type="text" value={data.facebook_contact} onChange={(e) => setData('facebook_contact', e.target.value)} />
                    {errors.facebook_contact ? errors.facebook_contact : null}
                </div>
                <div className='flex flex-col'>
                    <InputLabel htmlFor="facebook_contact">Instagram Contact</InputLabel>
                    <TextInput autoComplete="off"  id="instagram_contact" type="text" value={data.instagram_contact} onChange={(e) => setData('instagram_contact', e.target.value)} />
                    {errors.instagram_contact ? errors.instagram_contact : null}
                </div>
                <div><PrimaryButton type='submit' disabled={processing}>Submit</PrimaryButton></div>
            </form>
        </div>
    </div>
    </AuthenticatedLayout>
  )
}

export default PhotographerView
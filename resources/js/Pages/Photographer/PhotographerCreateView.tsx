import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, useForm } from "@inertiajs/react"

const PhotographerCreateView = ({auth}: any) => {
    interface IPhotographer{
        profile_picture?: File | undefined,
        first_name: string,
        last_name: string,
        email: string,
        phone_number: string,
        facebook_contact: string,
        instagram_contact: string,
    }

    const {data, setData, post, errors, wasSuccessful, processing } = useForm<IPhotographer>({
        profile_picture: undefined,
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
        facebook_contact: "",
        instagram_contact: "",
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        post(route('admin.photographer.createPhotographer'))
    }

    // const handleFile = (e: React.FormEvent<HTMLInputElement>, formModel: keyof IPhotographer) => {
    //     const file = e.target as HTMLInputElement & {files: FileList}
    //     setData(formModel, file.files[0])
    // }

    const handleFile = (e: React.FormEvent<HTMLInputElement>, formModel: keyof IPhotographer) => {
        const file = e.target as HTMLInputElement & {files: FileList}
        setData(formModel, file.files[0])
    }

    console.log(errors)
  return (
    <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Create > Photographer`}</h2>}>
    <Head title="Admin | Create Photographer profile" />
    <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        {wasSuccessful ? "User profile successfully modified" : null}
            <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
                <div className='flex flex-col'>
                    <InputLabel htmlFor="profile_picture">Profile Photo</InputLabel>
                    <input autoComplete="off"  id="profile_picture" type="file" onChange={(e) => handleFile(e, "profile_picture")} accept="image/jpg, image/png, image/jpeg"/>
                    {errors.profile_picture ? errors.profile_picture : null}

                </div>
                <div className='flex flex-col'>
                    <InputLabel htmlFor="first_name">First Name</InputLabel>
                    <TextInput autoComplete="off"  id="first_name" type="text" value={data.first_name} onChange={(e) => setData('first_name', e.target.value)}/>
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

export default PhotographerCreateView
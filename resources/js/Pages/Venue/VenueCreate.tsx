import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Head, router, useForm } from "@inertiajs/react"
import React from "react"

const VenueCreate = ({auth}: any) => {
  interface IVenue{
    venue_name: string,
    description: string,
    limit: number | string,
    price: number | string,
    header_image?: File | undefined,
    sub_images?: FileList | undefined,
  }

  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const {data, setData, errors, post, setError, clearErrors, processing} = useForm<any>({
    venue_name: "",
    description: "",
    limit: "",
    price: "",
    header_image: undefined,
    sub_images: undefined,
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()
    console.log(data)
    post(route('admin.venue.create'))
  }
  const handleFile = (e: React.FormEvent<HTMLInputElement>, formModel: keyof IVenue, fileType: string) => {
    const file = e.target as HTMLInputElement & {files: FileList}
    if (fileType !== 'FileList' && fileType !== 'File') throw new Error('fileType must be File or FileList')

    if (fileType === 'FileList'){
        setData(formModel, file.files)
    } else if (fileType === 'File'){
        setData(formModel, file.files[0])
    }
  }


  return (
    <div>
        <AuthenticatedLayout user={auth.user} 
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{`Create > Venue`}</h2>}>
        <Head title="Admin | Edit User" />
        <div className="py-12">
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                      <InputLabel htmlFor="header_image">Header Image</InputLabel>
                      <input autoComplete="off"  id='header_image' type="file" onChange={(e) => handleFile(e, 'header_image', 'File')} accept='image/jpeg, image/png, image/jpg'/>
                      {errors.header_image ? errors.header_image : null}
                    </div>
                    <div className="flex flex-col">
                      <InputLabel htmlFor="sub_images">Sub Images</InputLabel>
                      <input autoComplete="off"  id='sub_images' type="file" onChange={(e) => handleFile(e, 'sub_images', 'FileList')} accept='image/jpeg, image/png, image/jpg' multiple={true}/>
                      {errors.sub_images ? errors.sub_images : null}
                    </div>
                    <div className="flex flex-col">
                      <InputLabel htmlFor="venue_name">Venue Name</InputLabel>
                      <input autoComplete="off"  id='venue_name' type="text" onChange={(e) => setData('venue_name', e.target.value)} value={data.venue_name}/>
                      {errors.venue_name ? errors.venue_name : null}
                    </div>
                    <div className="flex flex-col">
                      <InputLabel htmlFor="description">Description</InputLabel>
                      <textarea autoComplete="off" rows={5} id='description' onChange={(e) => setData('description', e.target.value)} value={data.description}/>
                      {errors.description ? errors.description : null}
                    </div>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor="limit">Limit</InputLabel>
                        <TextInput autoComplete="off"  id='limit' type="text" value={data.limit} onChange={(e) => setData('limit', e.target.value)} />
                        {errors.limit ? errors.limit : null}
                    </div>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor="price">Price</InputLabel>
                        <TextInput autoComplete="off"  id='price' type="text" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                        {errors.price ? errors.price : null}
                    </div>
                    <div><PrimaryButton type='submit' disabled={processing}>Submit</PrimaryButton></div>
                </form>
            </div>
        </div>
        </AuthenticatedLayout>  
    </div>
  )
}

export default VenueCreate
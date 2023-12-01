import InputLabel from "@/Components/InputLabel"
import PrimaryButton from "@/Components/PrimaryButton"
import TextInput from "@/Components/TextInput"
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout"
import { Select } from "@chakra-ui/react"
import { Head, router, useForm } from "@inertiajs/react"
import React from "react"

const VenueCreate = ({auth, placeCategories, themeCategories}: any) => {
  interface IVenue{
    venue_name: string,
    description: string,
    limit: number | string,
    price: number | string,
    header_image?: File | undefined,
    sub_images?: FileList | undefined,
    place_category?: number | string,
    theme_category?: number | string,
  }
 

  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const {data, setData, errors, post, setError, clearErrors, processing} = useForm<any>({
    venue_name: "",
    description: "",
    limit: "",
    price: "",
    place_category: "",
    theme_category: "",
    header_image: undefined,
    sub_images: undefined,
  })
  const handleSubmit = (e: any) => {
    e.preventDefault()
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
                    <div className="grid grid-cols-3 gap-10">
                      <div className="col-span-2 space-y-4">
                        <div className="flex flex-col">
                          <InputLabel htmlFor="header_image">Header Image</InputLabel>
                          <input autoComplete="off"  id='header_image' type="file" onChange={(e) => handleFile(e, 'header_image', 'File')} accept='image/jpeg, image/png, image/jpg'/>
                          {errors.header_image ? <div className='text-red-600'>{errors.header_image}</div> : null}
                          
                        </div>
                        <div className="flex flex-col">
                          <InputLabel htmlFor="sub_images">Sub Images</InputLabel>
                          <input autoComplete="off"  id='sub_images' type="file" onChange={(e) => handleFile(e, 'sub_images', 'FileList')} accept='image/jpeg, image/png, image/jpg' multiple={true}/>
                          {errors.sub_images ? <div className='text-red-600'>{errors.sub_images}</div> : null}
                        </div>
                        <div className="flex flex-col">
                          <InputLabel htmlFor="venue_name">Venue Name</InputLabel>
                          <input autoComplete="off"  id='venue_name' type="text" onChange={(e) => setData('venue_name', e.target.value)} value={data.venue_name}/>
                          {errors.venue_name ? <div className='text-red-600'>{errors.venue_name}</div> : null}
                        </div>
                        <div className="flex flex-col">
                          <InputLabel htmlFor="description">Description</InputLabel>
                          <textarea autoComplete="off" rows={5} id='description' onChange={(e) => setData('description', e.target.value)} value={data.description}/>
                          {errors.description ? <div className='text-red-600'>{errors.description}</div> : null}
                        </div>
                        <div className='flex flex-col'>
                            <InputLabel htmlFor="limit">Limit</InputLabel>
                            <TextInput autoComplete="off"  id='limit' type="text" value={data.limit} onChange={(e) => setData('limit', e.target.value)} />
                            {errors.limit ? <div className='text-red-600'>{errors.limit}</div> : null}
                        </div>
                        <div className='flex flex-col'>
                            <InputLabel htmlFor="price">Price</InputLabel>
                            <TextInput autoComplete="off"  id='price' type="text" value={data.price} onChange={(e) => setData('price', e.target.value)} />
                            {errors.price ? <div className='text-red-600'>{errors.price}</div> : null}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-4">
                        <div>
                          <InputLabel htmlFor="place_category">Place Category</InputLabel>
                          <Select name="place_category" id="place_category" onChange={(e) => setData('place_category', e.target.value)}>
                            <option value="">Select Place Category</option>
                            {placeCategories.map((placeCategory: any) => {
                              return <option key={placeCategory.id} value={placeCategory.id}>{placeCategory.name}</option>
                            })}
                          </Select>
                          {errors.place_category ? <div className='text-red-600'>{errors.place_category}</div> : null}
                        </div>
                        <div>
                          <InputLabel htmlFor="theme_category">Theme Category</InputLabel>
                          <Select name="theme_category" id="theme_category" onChange={(e) => setData('theme_category', e.target.value)}>
                            <option value="">Select Theme Category</option>
                            {themeCategories.map((themeCategory: any) => {
                              return <option key={themeCategory.id} value={themeCategory.id}>{themeCategory.name}</option>
                            })}
                          </Select>
                          {errors.place_category ? <div className='text-red-600'>{errors.place_category}</div> : null}
                        </div>
                      </div>
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
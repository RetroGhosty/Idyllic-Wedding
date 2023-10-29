import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm } from '@inertiajs/react'
import { count, error } from 'console'
import React from 'react'

const VenueSettings = ({auth, venue}: any) => {

    interface IVEnue{
        venue_name: string,
        description: string,
        limit: number | string,
        price: number | string,
        header_image?: File | undefined,
        sub_images?: FileList | undefined,
    }

    const {data, setData, patch, errors, setError, setDefaults, clearErrors, wasSuccessful, processing } = useForm<any>({
        venue_name: venue['venue_name'],
        description: venue['description'],
        limit: venue['limit'],
        price: venue['price'],
        header_image: undefined,
        sub_images: undefined,
    })

    const [isSubmitted, setIsSubmitted] = React.useState(false)

    const handleSubmit = (e: any) => {
        e.preventDefault()
        router.post(route('admin.venue.update', venue['id']), {
            _method: 'patch',
            venue_name: data.venue_name,
            description: data.description,
            limit: data.limit,
            price: data.price,
            header_image: data.header_image,
            sub_images: data.sub_images as any,
        }, {onStart: () => {
            setIsSubmitted(false)
        }, onError: (errors: any) => {
            setError(errors)
            setData('header_image', undefined)
            setData('sub_images', undefined)
        }, onSuccess: () => {
            setIsSubmitted(true)
            clearErrors()
            setDefaults({
                venue_name: venue['venue_name'],
                description: venue['description'],
                limit: venue['limit'],
                price: venue['price'],
                header_image: undefined,
                sub_images: undefined,
            })
        }
    
    })
        
    }

    const handleFile = (e: React.FormEvent<HTMLInputElement>, formModel: keyof IVEnue, fileType: string) => {
        const file = e.target as HTMLInputElement & {files: FileList}
        if (fileType !== 'FileList' && fileType !== 'File') throw new Error('fileType must be File or FileList')

        if (fileType === 'FileList'){
            setData(formModel, file.files)
        } else if (fileType === 'File'){
            setData(formModel, file.files[0])
        }
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{venue ? `Edit > Venue > [ ID: ${venue['id']} ] ${venue['venue_name']}` : "Venue not found"}</h2>}>
        <Head title="Admin | Edit User" />
        <div className="py-12">
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                {Object.keys(errors).length === 0 && isSubmitted === true ? "User profile successfully modified" : null}
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>

                    <div className='flex flex-col'>
                        <InputLabel htmlFor="header_image">Header Image</InputLabel>
                        <input autoComplete="off"  id='header_image' type="file" onChange={(e) => handleFile(e, 'header_image', 'File')} accept='image/jpeg, image/png, image/jpg'/>
                        {errors.header_image ? errors.header_image : null}
                    </div>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor="sub_images">Sub Images</InputLabel>
                        <input autoComplete="off"  id='sub_images' type="file" multiple={true} onChange={(e) => handleFile(e, 'sub_images', 'FileList')} accept='image/jpeg, image/png, image/jpg'/>
                        {errors.sub_images ? errors.sub_images : null}
                    </div>

                    <div className='flex flex-col'>
                        <InputLabel htmlFor="venue_name" value='Venue Name'/> 
                        <TextInput autoComplete="off"  id='venue_name' type="text" value={data.venue_name} onChange={(e) => setData('venue_name', e.target.value)} />
                        {errors.venue_name ? errors.venue_name : null}
                    </div>

                    <div className='flex flex-col'>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <textarea rows={5} autoComplete="off"  id='description' value={data.description} onChange={(e) => setData('description', e.target.value)} />
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
  )
}

export default VenueSettings
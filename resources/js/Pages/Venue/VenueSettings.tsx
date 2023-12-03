import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router, useForm, Link } from '@inertiajs/react'
import {AiFillCloseSquare} from 'react-icons/ai'
import {BsBoxArrowUpRight} from 'react-icons/bs'
import React from 'react'
import { Select, useToast } from '@chakra-ui/react'


const VenueSettings = ({auth, venue, header_image, showcase_image, placeCategories, themeCategories, currentPlaceCategory, currentThemeCategory}: any) => {

    console.log(currentPlaceCategory)


    interface IVEnue{
        venue_name: string,
        description: string,
        limit: number | string,
        price: number | string,
        header_image?: File | undefined,
        sub_images?: FileList | undefined,
    }

    const {data, setData, patch, errors, setError, setDefaults, clearErrors, processing } = useForm<any>({
        venue_name: venue['venue_name'],
        description: venue['description'],
        limit: venue['limit'],
        price: venue['price'],
        place_category: currentPlaceCategory !== null ? currentPlaceCategory['id'] : '',
        theme_category: currentThemeCategory !== null ? currentThemeCategory['id'] : '',
        header_image: undefined,
        sub_images: undefined,
        
    })
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    const toast = useToast()

    const [wasSuccessful, setWasSuccessful] = React.useState(false)

    React.useEffect(() => {
        if (wasSuccessful){
            toast({
                title: "Venue",
                description: `Successfully modified`,
                position: "bottom-right",
                status: "success",
                duration: 3000,
                isClosable: true,
              })
        }
        return () => {
            setWasSuccessful(false)
        }
    }, [wasSuccessful])

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const payload = {
            _method: 'patch',
            venue_name: data.venue_name,
            description: data.description,
            limit: data.limit,
            price: data.price,
            header_image: data.header_image,
            sub_images: data.sub_images,
            place_category: parseInt(data.place_category),
            theme_category: parseInt(data.theme_category),
        }

        if (data.header_image === undefined) delete payload.header_image
        if (data.sub_images === undefined) delete payload.sub_images
        router.post(route('admin.venue.update', venue['id']), payload, {preserveScroll: true, onStart: () => {
            setIsSubmitted(false)
        }, onError: (errors: any) => {
            setError(errors)
            setData('header_image', undefined)
            setData('sub_images', undefined)
        }, onSuccess: () => {
            setIsSubmitted(true)
            clearErrors()
            setData('header_image', undefined)
            setData('sub_images', undefined)
            setWasSuccessful(true)
        }})
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

    const deleteLandingPhoto = ($image_id: number, $venue_id: number) => {
        router.visit(route('admin.landingphoto.delete'), {
            method: 'delete',
            data:{
                venue_id: $venue_id,
                image_id: $image_id
            }
        })
    }
    
    const deleteShowcasePhoto = ($image_id: number, $venue_id: number) => {
        router.visit(route('admin.showcasephoto.delete'), {
            method: 'delete',
            data:{
                venue_id: $venue_id,
                image_id: $image_id
            }
        })
    }

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{venue ? `Edit > Venue > [ ID: ${venue['id']} ] ${venue['venue_name']}` : "Venue not found"}</h2>}>
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
                          {header_image && (
                            <div className='mt-4 space-y-3'>
                                <div className='flex flex-row items-center'>
                                    <button type='button' onClick={() => deleteLandingPhoto(header_image['id'], venue['id'])} className='flex flex-wrap space-x-2 bg-slate-800 text-white p-2 rounded me-1 md:me-3'>
                                        <AiFillCloseSquare className="text-2xl text-red-600"/>
                                        <span>Delete Image</span>
                                    </button>
                                    <div className='flex flex-row items-center space-x-3'>
                                        <a href={`/storage/${header_image['photo_url']}`} className='text-cyan-700 underline underline-offset-4'>Preview Image</a>
                                        <BsBoxArrowUpRight/>
                                    </div>
                                </div>
                            
                            </div>
                            )}
                        </div>
                        <div className="flex flex-col">
                          <InputLabel htmlFor="sub_images">Sub Images</InputLabel>
                          <input autoComplete="off"  id='sub_images' type="file" onChange={(e) => handleFile(e, 'sub_images', 'FileList')} accept='image/jpeg, image/png, image/jpg' multiple={true}/>
                          {errors.sub_images ? <div className='text-red-600'>{errors.sub_images}</div> : null}
                          {showcase_image && (
                            <div className='mt-4 space-y-3'>
                                {showcase_image.map((image: any, key: number) => (
                                    <div key={key} className='flex flex-wrap space-x-3 items-center'>
                                        <button onClick={() => deleteShowcasePhoto(image['id'], venue['id'])} type='button' className='flex flex-row space-x-2 bg-slate-800 text-white p-2 rounded'>
                                            <AiFillCloseSquare className="text-2xl text-red-600"/>
                                            <span>Delete Image {key + 1}</span>
                                        </button>
                                        <div className='flex flex-row  items-center space-x-3'>
                                            <a href={`/storage/${image['photo_url']}`} className='text-cyan-700 underline underline-offset-4'>Preview Image</a>
                                            <BsBoxArrowUpRight/>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            )}
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
                          <Select name="place_category" placeholder='Select place category' id="place_category" value={data['place_category']} onChange={(e) => setData('place_category', e.target.value)}>
                            {placeCategories.map((placeCategory: any) => {
                              return <option key={placeCategory.id} value={placeCategory.id}>{`[${placeCategory.id}] ${placeCategory.name}`}</option>
                            })}
                          </Select>
                          {errors.place_category ? <div className='text-red-600'>{errors.place_category}</div> : null}
                        </div>
                        <div>
                          <InputLabel htmlFor="theme_category">Theme Category</InputLabel>
                          <Select name="theme_category" placeholder='Select theme category' id="theme_category" value={data['theme_category']} onChange={(e) => setData('theme_category', e.target.value)}>
                            {themeCategories.map((themeCategory: any) => {
                              return <option key={themeCategory.id} value={themeCategory.id}>{`[${themeCategory.id}] ${themeCategory.name}`}</option>
                            })}
                          </Select>
                          {errors.theme_category ? <div className='text-red-600'>{errors.theme_category}</div> : null}
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

export default VenueSettings
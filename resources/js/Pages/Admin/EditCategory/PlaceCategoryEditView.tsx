import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'

const PlaceCategoryEditView = ({auth, placeCategory}: any) => {

    const {data, setData, post, processing, errors} = useForm({
        name: ''
    })

    const handleSubmit = (e: any) => {
        e.preventDefault()
        console.log(data)
    } 

    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{placeCategory ? `Edit > Place Category > [ ID: ${placeCategory['id']} ] ${placeCategory['name']}` : "Category not found"}</h2>}>
        <Head title="Admin | Edit Category" />
        <div className="py-12">
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                    <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-3 gap-10">
                            <div className="col-span-2 space-y-4">
                                <div className="flex flex-col">
                                    <InputLabel htmlFor="name">Category Name</InputLabel>
                                    <input autoComplete="off"  id='name' type="text" onChange={(e) => setData('name', e.target.value)} value={data.name}/>
                                    {errors.name ? <div className='text-red-600'>{errors.name}</div> : null}
                                </div>
                                
                                <div>
                                    <PrimaryButton type='submit' disabled={processing}>Submit</PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
  )
}

export default PlaceCategoryEditView
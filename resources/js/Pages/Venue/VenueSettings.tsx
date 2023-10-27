import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'

const VenueSettings = ({auth, venue}: any) => {
    const {data, setData, patch, errors, wasSuccessful, processing } = useForm({
        venue_name: venue['venue_name'],
        address: venue['address'],
        price: venue['price'],
        iS_active: venue['iS_active']
    })
 
    const handleSubmit = (e: any) => {
        e.preventDefault()
        patch(route('admin.venue.edit', {venue_id:venue['id']}))
    }
    return (
        <AuthenticatedLayout user={auth.user} header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">{venue ? `Edit > Venue > [ ID: ${venue['id']} ] ${venue['venue_name']}` : "Venue not found"}</h2>}>
        <Head title="Admin | Edit User" />
        <div className="py-12">
            <div className='max-w-7xl mx-auto sm:px-6 lg:px-8'>
                {wasSuccessful ? "User profile successfully modified" : null}
                <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
                    <div className='flex flex-col'>
                        <InputLabel htmlFor="venue_name" value='Venue Name'/> 
                        <TextInput autoComplete="off"  id='venue_name' type="text" value={data.venue_name} onChange={(e) => setData('venue_name', e.target.value)} />
                        {errors.venue_name ? errors.venue_name : null}
                    </div>

                    <div className='flex flex-col'>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <TextInput autoComplete="off"  id='address' type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                        {errors.address ? errors.address : null}
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
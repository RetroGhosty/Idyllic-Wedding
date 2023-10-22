import React from 'react'
import { useForm } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'

const EditStoreDetailsPartial = ({shop, className}: any) => {
    console.log(shop)
    const {data, setData, patch, errors, wasSuccessful, processing } = useForm<any>({
        id: shop['id'],
        shop_name: shop['shop_name'],
      })
    const handleSubmit = (e: any) => {
        e.preventDefault()
        patch(route('shopvendor.updatestore'))
    }
  return (
    <div className={className}>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="container bg-white p-8">
                <header>
                {wasSuccessful ? <div>Shop successfully edited</div> : null}
                <h2 className="text-lg font-medium text-gray-900">Edit Store</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Make your product here
                </p>
                </header>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex flex-col py-2'>
                <label htmlFor="shop_name">Shop Name</label>
                <input type="text" id='shop_name' value={data.shop_name} onChange={(e) => setData('shop_name', e.target.value)}/>
                {errors.shop_name && errors.shop_name }
                </div>

                <div className='pt-4'>
                    <PrimaryButton type='submit' disabled={processing} >Submit</PrimaryButton>
                </div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default EditStoreDetailsPartial
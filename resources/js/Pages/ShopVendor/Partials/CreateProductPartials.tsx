import React from 'react'
import { useForm  } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'

const CreateProductPartials = ({shop, className}: any) => {
      const {data, setData, post, errors, wasSuccessful, processing } = useForm<any>({
        shop_id: shop['id'],
        name: "",
        price: "",
        description: "",
        image: null,
      })
    
      
      const handleSubmit = (e: any) => {
          e.preventDefault()
          post(route('shopvendor.createproduct'))
      }
    
      const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0]
        if (selectedFile){
          setData("image", selectedFile)
        }
      }

  return (
    <div className={className}>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="container bg-white p-8">
                <header>
                {wasSuccessful ? <div>Product successfully created</div> : null}
                <h2 className="text-lg font-medium text-gray-900">Create Product</h2>

                <p className="mt-1 text-sm text-gray-600">
                    Make your product here
                </p>
                </header>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                <div className='flex flex-col py-2'>
                  <label htmlFor="name">Product Name</label>
                  <input type="text" id='name' value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                  {errors.name ? errors.name : null}
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="price">Price</label>
                  <input type="number" id='price' value={data.price} onChange={(e) => setData('price', e.target.value)}/>
                  {errors.price ? errors.price : null}
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="description">Description</label>
                  <textarea rows={8} id='description' value={data.description} onChange={(e) => setData('description', e.target.value)}/>
                  {errors.description ? errors.description : null}
                </div>
                <div className="flex flex-col py-2">
                  <label htmlFor="image">Image</label>
                  <input type="file" id='image' onChange={handleFile}/>
                  {errors.image ? errors.image : null}
                </div>
                <div className='pt-4'><PrimaryButton type='submit' disabled={processing} >Submit</PrimaryButton></div>
                </form>
            </div>
        </div>
    </div>
  )
}

export default CreateProductPartials
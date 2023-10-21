import React from 'react'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { PageProps } from '@/types'
import { Head,useForm  } from '@inertiajs/react'
import PrimaryButton from '@/Components/PrimaryButton'

const Dashboard = ({auth, shop}: any) => {

  interface FormProps{
    shop_id: string;
    name: string;
    price: string;
    image: File | null
  }

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
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Shop</h2>}>
      
      <Head title="Dashboard" />

      <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                  <div className="p-6 text-gray-900">Welcome to your shop</div>
                  <form onSubmit={handleSubmit}>
                  {wasSuccessful ? <div>Product successfully created</div> : null}
                    <label htmlFor="name">Name</label>
                    <input type="text" id='name' value={data.name} onChange={(e) => setData('name', e.target.value)}/>
                    {errors.name ? errors.name : null}
                    <label htmlFor="price">Price</label>
                    <input type="number" id='price' value={data.price} onChange={(e) => setData('price', e.target.value)}/>
                    {errors.price ? errors.price : null}
                    <label htmlFor="description">Description</label>
                    <input type="text" id='description' value={data.description} onChange={(e) => setData('description', e.target.value)}/>
                    {errors.description ? errors.description : null}
                    <label htmlFor="image">Description</label>
                    <input type="file" id='image' onChange={handleFile}/>
                    {errors.image ? errors.image : null}
                    <div><PrimaryButton type='submit' disabled={processing} >Submit</PrimaryButton></div>
                  </form>

              </div>
          </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Dashboard
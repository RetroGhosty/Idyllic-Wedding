import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import CreateProductPartials from './Partials/CreateProductPartials'
import EditStoreDetailsPartial from './Partials/EditStoreDetailsPartial'
const Dashboard = ({auth, shop}: any) => {
  return (
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">My Shop</h2>}>
      <Head title="Dashboard" />

  
      <EditStoreDetailsPartial shop={shop} className="pt-12"/>
      <CreateProductPartials shop={shop} className="py-8"/>

    </AuthenticatedLayout>
  )
}
export default Dashboard
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import VenueSection from './Partials/VenueSection';
import PhotographerSection from './Partials/PhotographerSection';

const Dashboard = ({auth, users, venues, photographers}:any) => {

  return (
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-10">
          <VenueSection className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-9" venues={venues}/>
          <PhotographerSection className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-9" photographers={photographers}/>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Dashboard
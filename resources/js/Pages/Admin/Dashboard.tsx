import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import VenueSection from './Partials/VenueSection';
import { useToast } from '@chakra-ui/react';
import React from 'react';

const Dashboard = ({auth, users, venues, success, error}:any) => {
  const toast = useToast()
  React.useEffect(() => {
    if(success !== null){
      toast({
        title: "Venue",
        description: `${success}`,
        position: "bottom-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
    if (error !== null){
      toast({
        title: "Venue",
        description: "Something went wrong",
        position: "bottom-right",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    }

    return () => {
      success = null
      error = null
    }
  }, [success])
  
  return (
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Dashboard</h2>}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-10">
          <VenueSection className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-9" venues={venues}/>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Dashboard
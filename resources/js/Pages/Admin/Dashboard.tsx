import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import VenueSection from './Partials/VenueSection';
import { useToast } from '@chakra-ui/react';
import React from 'react';
import CustomerSection from './Partials/CustomerSection';
import ReservationTable from '@/Components/Reservation/ReservationTable';
import RefundTable from '@/Components/Reservation/RefundTable';

const Dashboard = ({auth, venues, customers, transactions, refundRequests, success, error}:any) => {
  const toast = useToast()

  React.useEffect(() => {
    if(success !== null){
      toast({
        title: "Success",
        description: `${success}`,
        position: "bottom-right",
        status: "success",
        duration: 3000,
        isClosable: true,
      })
    }
    if (error !== null){
      toast({
        title: "Failed",
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
  }, [success, error, venues])
  
  return (
    <AuthenticatedLayout user={auth.user} 
    header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin Panel</h2>}>
      <Head title="Dashboard" />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-10">

          <VenueSection className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-9" venues={venues} tableHeight={"0"}/>
          <CustomerSection className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-9" customers={customers} tableHeight={"0"}/>
          <ReservationTable className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-9" transactions={transactions} tableHeight={"0"}/>
          <RefundTable className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-9" refundRequests={refundRequests} tableHeight={"0"}/>

        </div>
      </div>
    </AuthenticatedLayout>
  )
}

export default Dashboard
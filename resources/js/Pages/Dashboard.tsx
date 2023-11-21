import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { ITransaction, PageProps, TransactionArr } from '@/types';
import ReservationTable from '@/Components/Reservation/ReservationTable';
import HeaderPopUp from '@/Components/HeaderPopUp';
import RefundTable from '@/Components/Reservation/RefundTable';

export default function Dashboard({ auth, transactions, refundRequests }: any,) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:space-y-7">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">You're logged in!</div>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <ReservationTable transactions={transactions}/>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <RefundTable refundRequests={refundRequests}/>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

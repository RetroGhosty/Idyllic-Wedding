import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { ITransaction, PageProps, TransactionArr } from '@/types';
import ReservationTable from '@/Components/Reservation/ReservationTable';
import RefundTable from '@/Components/Reservation/RefundTable';
import { MdEmail } from "react-icons/md";
import { motion } from 'framer-motion';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';


export default function Dashboard({ auth, transactions, refundRequests, emailCountInquiries, latestEmailInquiries }: any,) {




    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:space-y-7">
                <div className='flex flex-col md:grid md:grid-cols-3  items-start grid-flow-col gap-10'>
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 w-full'>
                        <h1 className='font-black text-xl'>TOTAL MESSAGES</h1>
                        <h1 className='font-black text-5xl text-indigo-500'>{emailCountInquiries}</h1>
                    </div>
                    <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-5 col-span-2'>
                        <div className='flex flex-col'>
                            <div className='flex flex-row justify-between items-start mb-5'>
                                <h1 className='font-black text-xl'>LATEST MESSAGES</h1>
                                <SecondaryButton>View more</SecondaryButton>
                            </div>
                            <div className='flex flex-col space-y-6'>
                                {latestEmailInquiries.map((inquiry: any, index: number) => (
                                    <motion.div key={index} whileHover={{scale:1.02}} className='flex flex-col border-t-[2px] py-1 px-3 border-indigo-700 shadow-md min-h-[80px]'>
                                        <div className='flex flex-row items-center justify-between'>
                                            <span className='text-[#e56b6f]'>
                                                {inquiry.full_name}
                                            </span>
                                            <div className='flex flex-row items-center space-x-2'>
                                                <span>
                                                    {inquiry.email}
                                                </span>
                                                <MdEmail/>
                                            </div>
                                        </div>
                                        <p className='text-slate-500'>{inquiry.message}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
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

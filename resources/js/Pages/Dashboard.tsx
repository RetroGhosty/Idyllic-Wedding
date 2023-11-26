import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, router } from '@inertiajs/react';
import { ITransaction, PageProps, TransactionArr } from '@/types';
import ReservationTable from '@/Components/Reservation/ReservationTable';
import RefundTable from '@/Components/Reservation/RefundTable';
import { MdEmail } from "react-icons/md";
import { HiOutlineMailOpen } from "react-icons/hi";
import { motion } from 'framer-motion';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import { parse, parseISO } from 'date-fns';


export default function Dashboard({ auth, transactions, refundRequests, emailCountInquiries, latestEmailInquiries }: any,) {


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            
            <Head title="Dashboard" />

            <div className="md:py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 sm:space-y-7">
                    <div className='flex flex-col md:grid md:grid-cols-3  items-start grid-flow-col md:gap-10'>
                        <div className='bg-white overflow-hidden shadow-sm sm:rounded-lg p-6 w-full'>
                            <div className='font-black text-xl flex items-center space-x-2'>
                                <h1 className=''>TOTAL INQUIRY</h1>
                                <MdEmail/>
                            </div>
                            <div className=' font-black text-5xl text-indigo-500'>
                                <h1>{emailCountInquiries}</h1>
                            </div>
                        </div>
                        <div className='bg-[#212529] overflow-hidden shadow-sm sm:rounded-lg p-10 col-span-2 w-full'>
                            <div className='flex flex-col'>
                                <div className='flex flex-row justify-between items-start mb-5'>
                                    <h1 className='font-black text-xl text-white'>LATEST INQUIRY</h1>
                                    <SecondaryButton onClick={() => router.get(route('inbox.view'))}>View more</SecondaryButton>
                                </div>
                                <div className='flex flex-col space-y-6'>
                                    {latestEmailInquiries.map((inquiry: any, index: number) => (
                                        <motion.div key={index} whileHover={{scale:1.03}} className='flex flex-col border-t-[2px] py-1 px-3 border-indigo-700 shadow-md min-h-[80px] relative bg-white'>
                                            <div className='flex flex-row items-center justify-between'>
                                                <span className='text-[#e56b6f]'>
                                                    {inquiry.full_name}
                                                </span>
                                                <div className='flex flex-row items-center text-slate-600 space-x-2'>
                                                    <span>
                                                        {inquiry.email}
                                                    </span>
                                                    <HiOutlineMailOpen/>
                                                </div>
                                            </div>
                                            <div className='flex flex-col justify-between'>
                                                <p className='text-black mb-5'>{inquiry.message}</p>
                                                <span className='text-slate-500'>{`Recieved @ ${parseISO(inquiry.created_at).toLocaleString()}`}</span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

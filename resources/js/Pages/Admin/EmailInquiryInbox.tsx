import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head } from '@inertiajs/react'
import { parseISO } from 'date-fns'
import { motion } from 'framer-motion'
import React from 'react'
import { HiOutlineMailOpen } from 'react-icons/hi'

const EmailInquiryInbox = ({auth, inquiries}: any) => {
    console.log(inquiries)
    return (
        <AuthenticatedLayout user={auth.user} 
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Inquire Inbox</h2>}>
          <Head title="Inbox" />
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-5">
                {inquiries.map((inquiry: any, index:number) => (
                    <motion.div key={index} whileHover={{scale:1.03}} className='flex flex-col border-s-[2px] py-1 px-3 border-indigo-700 shadow-md min-h-[80px] relative bg-white'>
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
        </AuthenticatedLayout>
    )
}

export default EmailInquiryInbox
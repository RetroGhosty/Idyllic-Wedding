import PrimaryButton from '@/Components/PrimaryButton'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, router } from '@inertiajs/react'

const CreateSuperAdminView = ({auth}: any) => {

    const claimSuperAdmin = () => {
        router.post(route('superadmin.create'))
    }

    return (
        <AuthenticatedLayout user={auth.user} 
        header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Admin setup</h2>}>
          <Head title="Dashboard" />
          <div className="py-12 space-y-10">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 flex flex-col space-y-5 items-start">
                <PrimaryButton onClick={() => claimSuperAdmin()}>Claim super admin</PrimaryButton>
      
                <h1 className='text-xl font-black'>User details</h1>
                <div className='flex flex-col w-[50%] space-y-1'>
                    <div className='flex flex-row w-full justify-between'>
                        <h2 className='text-slate-600'>Email</h2>
                        <h2 className='font-bold'>{auth.user['email']}</h2>
                    </div>
                    <div className='flex flex-row w-full justify-between'>
                        <h2 className='text-slate-600'>Full name</h2>
                        <h2 className='font-bold'>{`${auth.user['first_name']} ${auth.user['last_name']}`}</h2>
                    </div>
                    <div className='flex flex-row w-full justify-between'>
                        <h2 className='text-slate-600'>User role</h2>
                        <h2 className='font-bold uppercase'>{`${auth.user['user_level']}`}</h2>
                    </div>
                    
                </div>
    
            </div>

          </div>
        </AuthenticatedLayout>
    )
}

export default CreateSuperAdminView
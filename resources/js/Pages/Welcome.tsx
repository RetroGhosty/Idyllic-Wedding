import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import NavBar from './Guest/Partial/NavBar';
import Footer from './Guest/Partial/Footer';
import HeaderPopUp from '@/Components/HeaderPopUp';

export default function Welcome({ auth }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Homepage" />
            <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                <HeaderPopUp/>
                <NavBar user={auth.user}/>
                <div className='min-h-screen max-w-7xl pt-4  md:pt-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam enim non dolore tempora commodi sunt eos sit officia atque nulla quia eius ullam ipsa aliquid qui doloribus, repellendus molestiae tenetur totam cum dolorum. Earum numquam sit soluta quam neque.
                </div>
                <Footer/>
            </div>
        </>
    );
}

import { Head, router } from '@inertiajs/react';
import { PageProps } from '@/types';
import NavBar from './Guest/Partial/NavBar';
import Footer from './Guest/Partial/Footer';
import HeaderPopUp from '@/Components/HeaderPopUp';

export default function Welcome({ auth }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Home" />
            <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter selection:bg-red-500 selection:text-white">
                <HeaderPopUp/>
                <NavBar user={auth.user}/>
                <div className='min-h-screen overflow-hidden relative w-full'>
                    <div className='relative aspect-video w-full min-h-[60vh] md:min-h-[0] md:max-h-[70vh]'>
                        <img src="http://localhost:8000/hero-image.png" className='pointer-events-none absolute z-5 h-full w-full object-cover'/>
                        <div className='grid grid-cols-3 gap-10 h-full max-w-7xl py-4 md:py-9 mx-auto px-4 sm:px-6 lg:px-8l relative'>
                            <div className='flex flex-col space-y-3 md:space-y-5 col-span-2 grid-rows-3 justify-center items-start relative z-10'>
                                <h1 className='text-xl md:text-4xl tracking-widest font-black text-white'>Idyllic Wedding</h1>
                                <div>
                                    <p className='text-base md:text-xl text-white'>Your idyllic love story begins here.</p>
                                    <p className='text-base md:text-xl text-white'>Discover enchanting venues, personalized services, and seamless planning for your special day.</p>
                                </div>
                                <button type='button' className='bg-[#0066FF] text-base md:text-xl px-2 py-1 md:px-5 md:py-2 font-black text-white' 
                                onClick={() => router.get(route('booking.home'))}
                                >
                                    Book now
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className='bg-white text-black relative z-20'>
                        <div className='max-w-7xl py-4 md:py-24 mx-auto px-4 sm:px-6 lg:px-8l'>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sunt architecto nesciunt molestiae eligendi velit, atque iste minima facilis nisi nam nostrum minus nemo numquam dolor eos iusto a error alias vel dolorem quibusdam. Neque corporis cupiditate velit doloremque, atque veniam unde beatae obcaecati, nostrum pariatur officia dolorum. Sapiente ipsam ducimus ad et! Eius reprehenderit recusandae accusantium aliquam quam. Sed quaerat perferendis inventore. Voluptatum error doloremque eos! Dolore ut quis nobis nemo cumque quisquam temporibus eaque, facilis quibusdam ab consectetur cum, perferendis obcaecati autem? Nihil possimus aliquid reprehenderit dicta suscipit, quos velit soluta vero blanditiis. Deleniti qui voluptatibus fugit, quo est quam voluptates porro modi eius facilis, mollitia ex molestiae magnam fugiat perferendis perspiciatis natus iure numquam harum excepturi tempora voluptate nisi nostrum odit. Non ipsam sit ex harum esse omnis labore, nulla dolorum? Expedita ea dolor perspiciatis quidem odio delectus voluptates, porro error distinctio atque, magnam pariatur ducimus rem neque. Repudiandae recusandae facere velit quam, eligendi impedit nobis enim optio? Ipsum ex iusto facilis alias repellendus aliquam nobis distinctio non velit unde dolor, deserunt eligendi iste doloremque consequatur voluptas? Consequuntur modi repudiandae tenetur consequatur. Labore modi recusandae quasi ratione, minima quaerat rerum mollitia. Odit omnis tempore culpa, ratione perspiciatis officia.
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        </>
    );
}

import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import NavLink from '@/Components/NavLink';
import NavBar from './Guest/Partial/NavBar';

export default function Welcome({ auth }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    return (
        <>
            <Head title="Homepage" />
            <div className="relative sm:flex sm:flex-col bg-dots-darker bg-center bg-gray-100 dark:bg-dots-lighter dark:bg-gray-900 selection:bg-red-500 selection:text-white">
                <NavBar/>
                <div className='min-h-screen max-w-7xl pt-4  md:pt-9 mx-auto px-4 sm:px-6 lg:px-8l'>
                    sdsdsdsdsd
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum laboriosam enim non dolore tempora commodi sunt eos sit officia atque nulla quia eius ullam ipsa aliquid qui doloribus, repellendus molestiae tenetur totam cum dolorum. Earum numquam sit soluta quam neque.
                </div>
            </div>
        </>
    );
}

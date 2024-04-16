import MainLayout from '@/Layouts/MainLayout';
import { Head, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import Swal from 'sweetalert2';

export default function Dashboard({ auth }) {
    const {flash} = usePage().props
    console.log(flash)

    useEffect(() => {
        if (flash.error) {
          Swal.fire({
            icon: 'error',
            title: 'Success',
            text: flash.error,
          });
        }
    }, []);
    return (
        <MainLayout
        auth={auth}
        >
             <Head title="Dashboard" />
                <div className='w-full h-full flex flex-col gap-[10px]'>
                    <div className='p-[25px] sticky top-[96.5px] border-[2px] border-gray-200 bg-white rounded-sm flex items-start justify-between'>
                        <h1 className='capitalize'>Welcome Back!!</h1>
                    </div> 
                </div>
        </MainLayout>
    );
}

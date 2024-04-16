import MainLayout from '@/Layouts/MainLayout';
import { Head, Link } from '@inertiajs/react';
import { GrPrevious } from "react-icons/gr";
import { GrNext } from "react-icons/gr";
import { GrFormNext } from "react-icons/gr";
import { useState } from 'react';
import burger from '../../../img/burger.png'

export default function Menu({ auth }) {

    const products = [
        {id: 1, name: 'burger', price: 10000},
        {id: 2, name: 'burger', price: 10000},
        {id: 3, name: 'burger', price: 10000},
        {id: 4, name: 'burger', price: 10000},
        {id: 5, name: 'burger', price: 10000},
        {id: 6, name: 'burger', price: 10000},
    ]
    const [openMenu, setOpenMenu] = useState(false)
    const [dataProduct, setDataProduct] = useState(null)

    const handleOpenMenu = (product) => {
        setOpenMenu(!openMenu)
        setDataProduct(product)
    }




    return (
        <MainLayout
        auth={auth}
        handleOpenMenu={handleOpenMenu}
        openMenu={openMenu}
        dataProduct={dataProduct}
        setOpenMenu={setOpenMenu}
    >
             <Head title="Dashboard" />
                <div className='w-full h-full flex flex-col gap-[20px]'>
                    <div className='p-[25px] sticky sm:top-[96.5px] border-[2px] border-gray-200 bg-white rounded-sm flex items-start justify-between'>
                        <div className='flex gap-[20px] items-center'>
                            <Link href='/menus' className='border-[2px] flex items-center justify-center text-gray-500 w-[50px] rounded-full h-[50px] border-[#EEEEF1]'>
                                <GrPrevious/>
                            </Link>
                            <div className='flex flex-col'>
                                <h1 className='capitalize font-bold text-[30px] max-sm:text-[25px]'>food</h1>
                                <p className='text-[14px] capitalize text-[#D86D77] max-sm:text-[13px] font-bold'>discover whatever you need easily</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-[10px] max-sm:hidden text-gray-500'>
                            <button className='capitalize font-bold'>
                                
                            </button>
                            <div className='text-[16px] max-sm:text-[14px]'>
                                <GrFormNext/>
                            </div>
                            <Link href='/menus' className='capitalize font-bold max-sm:text-[14px]'>
                                menus
                            </Link>
                            <div className='text-[16px] max-sm:text-[14px]'>
                                <GrFormNext/>
                            </div>
                            <button className='capitalize font-bold max-sm:text-[14px]'>
                                food
                            </button>
                        </div>
                    </div>
                    <div className='w-full gap-[10px] h-auto bg-transparent  grid grid-cols-6 max-vlg:grid-cols-5 max-lg:grid-cols-4 max-lsm:grid-cols-3 max-sm:grid-cols-2'>
                        {products.map((product,index)=> (
                            <button key={index} className='flex flex-col bg-white rounded-md w-full h-auto items-center p-[20px]'>
                                <img src={burger} alt="" className='w-[100px]'/>
                                <div className='flex flex-col gap-[5px]'>
                                <p className='text-[16px] font-bold text-black capitalize'>{product.name}</p>
                                <p className='text-[#D86D77] text-[14px]'>RP {product.price}</p>
                                </div>
                            </button>
                        ))}
                        
                    </div>
                </div>
        </MainLayout>
    );
}

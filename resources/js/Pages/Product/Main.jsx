import MainLayout from '@/Layouts/MainLayout'
import {HiOutlinePencilAlt} from "react-icons/hi";
import {FaRegTrashCan} from "react-icons/fa6";
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormPrevious } from 'react-icons/gr';
import { IoClose } from 'react-icons/io5';
import TextInput from '@/Components/TextInput';

const Main = ({side,handleForm, auth}) => {

    return (
        <MainLayout
        // categories={categories}
        auth={auth}
        >
            <div className='w-full h-full flex flex-col gap-[10px]'>
                <div className='flex items-center gap-[10px]'>
                    <div className=' h-full p-[15px] flex bg-red-500 text-white items-center rounded-sm'>
                        <GrFormPrevious className='text-[20px] '/>
                    </div>
                <div
                    className='bg-white w-full sticky sm:top-[96.5px] border border-gray-200 flex items-center justify-between h-auto p-[15px] rounded-sm'>
                    <p className='capitalize font-bold'>product management</p>
                    <button onClick={handleForm} className='text-red-500 sm:hidden'>
                        <AiOutlinePlus/>
                    </button>
                </div>
                </div>
                <div className='flex flex-col h-full gap-[10px]'>
                    <div
                        className={`bg-transparent grid gap-[10px] ${side
                            ? 'vlg:grid-cols-3 max-vlg:grid-cols-2 max-md:grid-cols-2 max-lsm:grid-cols-1 '
                            : 'vlg:grid-cols-3 max-vlg:grid-cols-2 max-md:grid-cols-2 max-lsm:grid-cols-1'}
                            h-auto
                            `}>
                                <div className={`bg-white p-[15px] relative rounded-sm justify-between card  gap-[20px]  ${auth.user.role === 'admin' ? 'flex flex-col':'grid grid-cols-2'}`}>
                                    <div className='flex items-center justify-between col-span-2'>
                                        <div className='flex items-center gap-[15px]'>
                                            <div className='w-[50px] text-white flex items-center justify-center font-bold rounded-md h-[50px]' style={{ backgroundColor: 'red' }}>
                                                1
                                            </div>
                                            <div>
                                                <p className='text-[17px] capitalize font-bold'>
                                                     gak tau cok
                                                </p>
                                                <p className='text-[14px] capitalize font-bold text-gray-400'>10 pcs</p>
                                            </div>
                                        </div>
                                        {auth.user.role === 'admin' && (
                                            <div className='flex gap-[10px]'>
                                                <button className='text-[20px] border border-red-500 p-[8px] rounded-md text-red-500 hover:bg-red-500 hover:text-white'>
                                                    <HiOutlinePencilAlt/>
                                                </button>
                                                <button className='text-[20px] bg-red-500 p-[8px] rounded-md text-white'>
                                                    <FaRegTrashCan/>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex items-center justify-between gap-[20px] col-span-1'>
                                        <div className='flex items-center gap-[20px]'>
                                            <div className='capitalize'>
                                                    <p className='text-gray-500 text-[14px]'>Category Name</p>  
                                                        <p className='font-bold'>'testing doang'</p>    
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex gap-[15px] col-span-1 ${auth.user.role === 'admin' ? 'items-center':'items-end justify-end'}`}>
                                            {/* RP {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2).replace(/\.00$/, '') : product.price}/pcs */}
                                        <p className={`whitespace-nowrap font-bold max-sm:text-[14px]`}>
                                            RP 10000/pcs
                                        </p>
                                        {auth.user.role === 'admin' && (
                                        <div className='w-full h-auto flex gap-[10px]'>
                                            <button
                                                className='w-full border border-red-500 text-red-500 rounded-md max-sm:p-[8px] sm:text-[15px] max-sm:text-[14px] p-[8px]  hover:text-white hover:bg-red-500 capitalize font-bold'>
                                                restok product
                                            </button>
                                        </div>
                                        )}
                                    </div>
                                <div className='absolute hidden flex flex-col gap-[10px] w-full h-full card flip-reverse bg-white right-0 top-0 p-[10px] rounded-sm'>
                                        <div className='flex items-center justify-between'>
                                            <p className='capitalize font-bold'>restock product - {'hello'}</p>
                                            <button >
                                                <IoClose/>
                                            </button>
                                        </div>
                                        <form className='flex flex-col gap-[10px]'>
                                            <div className='w-full'>
                                                <TextInput type="number" className={`w-full`} id="stok" />
                                            </div>
                                                <button className='bg-red-500 text-white p-[8px] rounded-md capitalize font-bold'>restok</button>
                                        </form>
                                    </div>
                                </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Main

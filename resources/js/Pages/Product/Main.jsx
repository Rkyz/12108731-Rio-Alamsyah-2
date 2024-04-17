import MainLayout from '@/Layouts/MainLayout'
import {HiOutlinePencilAlt} from "react-icons/hi";
import {FaRegTrashCan} from "react-icons/fa6";
import {Link, router, useForm, usePage} from '@inertiajs/react';
import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import { AiOutlinePlus } from 'react-icons/ai';
import { GrFormPrevious } from 'react-icons/gr';
import NoData from '@/Components/NoData';
import { IoClose } from 'react-icons/io5';
import { BsDoorOpen } from "react-icons/bs";
import TextInput from '@/Components/TextInput';

const Main = ({side, products, categorys, handleEdit, edit, auth, handleForm}) => {

    const message = usePage().props;
    const {flash} = message

    console.log(products)

    console.log(message.errors.stok)
    const [stok, reStok] = useState(false)
    const [dataStok, setDataStok] = useState(null)

    const { data, setData } = useForm({
        stok: dataStok ? dataStok.stock : '', // Set name to editedUser.name if editedUser exists, otherwise set it to an empty string
    });

    function handleChange(e) {
        const { id, value } = e.target;
        setData(values => ({
          ...values,
          [id]: value,
        }));
      }
    

    const handleOpenStok = (product) => () => { 
        reStok(true)
        setDataStok(product)
    }

    console.log(dataStok)

    const handleCloseStok = () => {
        reStok(false)
        setDataStok(null)
    }

    console.log(flash)
    const handleRestok = (e) => {
        e.preventDefault();
        try {
            router.put(`/product/stok/${dataStok.id}`, data);
        } catch (error) {
            console.error('Failed to edit user:', error);
        } 
    }

    useEffect(() => {
        if (!flash === null && flash.message) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: flash.message,
          });
        } 
    }, [flash]);

    const handleDelete = (id) => {
        Swal.fire({
          title: 'Yakin Nih Mau Hapus?',
          text: "Jan Nyesel Yah!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Ya, hapus saja!'
        }).then((result) => {
          if (result.isConfirmed) {
            router.delete(`/product/${id}`);
          }
        });
      };
      

  

          
    const getUserColor = (userId) => {
        const colors = ['#FF5733', '#33FF57', '#5733FF', '#33B5FF', '#33FFE8'];
        return colors[userId % colors.length]; 
    };


    return (
        <MainLayout
        categorys={categorys}
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
                        className={`bg-transparent grid  gap-[10px] ${side
                            ? 'vlg:grid-cols-3 max-vlg:grid-cols-2 max-md:grid-cols-2 max-lsm:grid-cols-1 '
                            : 'vlg:grid-cols-3 max-vlg:grid-cols-2 max-md:grid-cols-2 max-lsm:grid-cols-1'}
                            ${products.length > 0 ? 'h-auto':'h-full'}
                            `}>
                        {products.length > 0 ? (   
                            products.map((product, index) => {
                                const userColor = getUserColor(product.id);
                                console.log(product.category)
                                return (
                                <div key={index} className={`bg-white p-[15px] relative rounded-sm justify-between card gap-[20px] ${stok && dataStok && dataStok.id === product.id  ? 'flip':''} ${auth.user.role === 'admin' ? 'flex flex-col':'grid grid-cols-2'}`}>
                                    <div className='flex items-center justify-between col-span-2'>
                                        <div className='flex items-center gap-[15px]'>
                                            <div className='w-[50px] text-white flex items-center justify-center font-bold rounded-md h-[50px]' style={{ backgroundColor: userColor }}>
                                                {product.id}
                                            </div>
                                            <div>
                                                <p className='text-[17px] capitalize font-bold'>
                                                     {product.name.length > 20 ? `${product.name.slice(0, 20)}...` : product.name}
                                                </p>
                                                <p className='text-[14px] capitalize font-bold text-gray-400'>{product.stock} pcs</p>
                                            </div>
                                        </div>
                                        {auth.user.role === 'admin' && (
                                            <div className='flex gap-[10px]'>
                                                <Link href={`/product/${product.id}`} className='text-[20px] border border-red-500 p-[8px] rounded-md text-red-500 hover:bg-red-500 hover:text-white'>
                                                    <HiOutlinePencilAlt/>
                                                </Link>
                                                <button onClick={() => handleDelete(product.id)} className='text-[20px] bg-red-500 p-[8px] rounded-md text-white'>
                                                    <FaRegTrashCan/>
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <div className='flex items-center justify-between gap-[20px] col-span-1'>
                                        <div className='flex items-center gap-[20px]'>
                                            <div className='capitalize'>
                                                {product.category && (
                                                    <p className='text-gray-500 text-[14px]'>Category Name</p>  
                                                )}
                                                {product.category === null ? (
                                                    <p className='font-bold'>categories not available</p>    
                                                    ):(
                                                        <p className='font-bold'>{product.category.category}</p>    
                                                    )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`flex gap-[15px] col-span-1 ${auth.user.role === 'admin' ? 'items-center':'items-end justify-end'}`}>
                                        {/* <p className='whitespace-nowrap font-bold max-sm:text-[14px]'>RP {product.price.toFixed(2).replace(/\.00$/, '')}/pcs</p> */}
                                        <p className={`whitespace-nowrap font-bold max-sm:text-[14px]`}>
                                            RP {typeof product.price === 'string' ? parseFloat(product.price).toFixed(2).replace(/\.00$/, '') : product.price}/pcs
                                        </p>
                                        {auth.user.role === 'admin' && (
                                        <div className='w-full h-auto flex gap-[10px]'>
                                            <button
                                                onClick={handleOpenStok(product)}
                                                className='w-full border border-red-500 text-red-500 rounded-md max-sm:p-[8px] sm:text-[15px] max-sm:text-[14px] p-[8px]  hover:text-white hover:bg-red-500 capitalize font-bold'>
                                                restok product
                                            </button>
                                        </div>
                                        )}
                                    </div>
                                    {stok && dataStok && dataStok.id === product.id && (
                                    <div className='absolute flex flex-col gap-[10px] w-full h-full card flip-reverse bg-white right-0 top-0 p-[10px] rounded-sm'>
                                        <div className='flex items-center justify-between'>
                                            <p className='capitalize font-bold'>restock product - {product.name}</p>
                                            <button onClick={handleCloseStok}>
                                                <IoClose/>
                                            </button>
                                        </div>
                                        <form onSubmit={handleRestok} className='flex flex-col gap-[10px]'>
                                            <div className='w-full'>
                                                <TextInput type="number" className={`w-full ${message.errors.stock && 'border border-red-500 placeholder:text-red-500 placeholder:capitalize'}`} id="stock" onChange={handleChange} placeholder={message.errors.stock}/>
                                            </div>
                                                <button className='bg-red-500 text-white p-[8px] rounded-md capitalize font-bold'>restok</button>
                                        </form>
                                    </div>
                                    )}
                                </div>
                                )
                            })
                        ):(
                            <NoData className='text-[25px]'/>
                        )}
                    </div>
                </div>
            </div>
        </MainLayout>
    )
}

export default Main
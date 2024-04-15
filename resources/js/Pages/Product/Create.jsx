import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import React from 'react';

const Create = () => {

    return (
      <div className='w-full h-full flex flex-col gap-[10px]'>
        <div className='bg-white rounded-sm'>
        <form className='flex flex-col gap-[15px]'>
        <div className='flex flex-col'>
            <InputLabel htmlFor="" className='font-bold capitalize'>nama produk</InputLabel>
            <TextInput type="text" id="name" />
            <p className='text-[12px] text-red-500 capitalize'>'error product'</p>
        </div>
        {/*
        <div className='flex flex-col'>
            <InputLabel htmlFor="" className='font-bold capitalize'>gambar produk</InputLabel>
            <TextInput
                type="file"
                onChange={handleChange}
                className="border file:bg-gray-300 file:text-gray-500 file:border-none file:p-[10px] file:rounded-l-sm file:mr-[10px] text-[14px] font-bold file:text-[14px]"/>
        </div>
        */ }
        <div className='flex flex-col'>
            <InputLabel htmlFor="" className='font-bold capitalize'>harga</InputLabel>
            <TextInput type="number" id="price" />
            <p className='text-[12px] text-red-500 capitalize'>'error harga'</p>
        </div>
        <div className='flex flex-col'>
            <InputLabel htmlFor="" className='font-bold capitalize'>category</InputLabel>
            <select name="category_id" className='border-gray-300 rounded-md'>
                <option value="" selected></option>
                    <option >{'gak tau bingung'}</option>
            </select>
            <p className='text-[12px] text-red-500 capitalize'>{'error category'}</p>
        </div>
        <div className='flex flex-col'>
            <InputLabel htmlFor="" className='font-bold capitalize'>stok</InputLabel>
            <TextInput type="number" id="stok" />
            <p className='text-[12px] text-red-500 capitalize'>{'error stok'}</p>
        </div>
        <button
            className='w-full mt-[10px] bg-red-500 text-white font-bold capitalize p-[10px] rounded-md'>submit</button>
    </form>
        </div>
      </div>
    );
}

export default Create;




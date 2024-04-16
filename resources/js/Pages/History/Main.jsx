import MainLayout from '@/Layouts/MainLayout'
import {Head} from '@inertiajs/react'
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { SiMicrosoftexcel } from "react-icons/si";

const Main = ({auth, buying}) => {
  const [openDetails, setOpenDetails] = useState(false)

  const handleOpenDetails = (id) => {
    setOpenDetails(true)
  }

    return (
        <MainLayout auth={auth}>
            <Head title="Menus - Food"/>
            <div className='w-full h-auto flex gap-[10px] bg-transparent'>
              <div className={`flex w-full h-auto flex-col gap-[10px] ${openDetails && 'slg:pr-[360px]'}`}>
                <div className='p-[15px] bg-white rounded-sm flex items-center justify-between'>
                    <p className='capitalize font-bold'>history penjualan</p>
                    <button className='flex items-center gap-[10px] bg-red-500 text-[20px] text-white py-[10px] px-[10px] rounded-md font-bold capitalize'>
                    <SiMicrosoftexcel/>
                  </button>
                </div>
                 <div className='flex flex-col gap-[10px]'>
                  <button onClick={handleOpenDetails}
                      className="w-full bg-white p-[15px] items-center rounded-sm border border-transparent hover:border-yellow-500 flex justify-between">
                      <div className="flex items-center gap-[15px]">
                          <div className="flex flex-col items-start">
                              <p className="text-[18px] font-Roboto font-bold">Orders : #1</p>
                              <p className="text-[12px] font-Roboto text-gray-500">Qty : 12 Produk</p>
                          </div>
                      </div>
                      <div className="flex flex-col items-end">
                          <div className="flex gap-[10px] items-center">
                              <p className="text-[18px] font-Roboto font-bold">RP 120000</p>
                              <p className="bg-red-500 py-[5px] px-[10px] rounded-md text-white font-Roboto text-[13px] capitalize">success</p>
                          </div>
                      </div>
                  </button>
              </div>
              </div>
            
            </div>
        </MainLayout>
    )
}

export default Main

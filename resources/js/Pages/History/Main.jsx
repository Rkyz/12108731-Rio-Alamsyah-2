import MainLayout from '@/Layouts/MainLayout'
import {Head} from '@inertiajs/react'
import React, { useState } from 'react'
import { IoClose } from 'react-icons/io5';
import { SiMicrosoftexcel } from "react-icons/si";

const Main = ({auth, buying}) => {
  const [openDetails, setOpenDetails] = useState(false)

  const handleOpenDetails = (id) => {
    setOpenDetails(!openDetails)
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
              {openDetails && (
              <div className='bg-transparent fixed right-[10px] h-full max-sm:w-full top-0 max-sm:z-[50] sm:pt-[96px] pb-[10px]'>
              <div className='bg-white shadow-[-20px_20px_30px_rgba(0,_0,_0,_0.2)] rounded-sm pb-[10px] h-full overflow-y-auto hidden-scroll right-0 flex flex-col justify-between gap-[15px] max-sm:w-full sm:max-w-[350px] w-full'>
                <div className='flex flex-col gap-[15px]'>
                <div className='border-b sticky top-0 bg-white flex items-center justify-between border-black px-[15px] pt-[15px] pb-[15px] border-opacity-10'>
                  <div>
                    <p className='font-bold capitalize text-[20px]'>invoice <span className='text-red-500'>#{'12'}</span></p>
                    <p className='text-[15px] text-gray-500 font-bold capitalize'>customer - {'chinsdkn'}</p>
                  </div>
                  <button onClick={handleOpenDetails} className='border border-red-500 p-[12px] text-[20px] rounded-md text-white bg-red-500'>
                    <IoClose/>
                  </button>
                </div>
                <div className='flex flex-col gap-[25px]'>
                <div className='px-[15px] font-medium flex gap-[30px]'>
                  <div>
                    <p className='text-[14px] text-gray-500 capitalize font-bold'>date order</p>
                    <p>{'12-023-23'}</p>
                  </div>
                  <div>
                    <p className='text-[14px] text-gray-500 capitalize font-bold'>time order</p>
                    <p>20.30</p>
                  </div>
                </div>
                <div className='px-[15px] flex gap-[30px]'>
                  <div className='flex flex-col gap-[2px]'>
                    <p className='text-[14px] text-gray-500 capitalize font-bold'>customer</p>
                    <p className='capitalize font-medium'>{'china'} - {'2913i123'} </p>
                    <p className='text-[14px] text-gray-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam, adipisci.</p>
                  </div>
                </div>
                <div className='flex flex-col gap-[5px] px-[15px]'>
                  <p className='text-gray-500 text-[14px] capitalize font-bold'>invoice</p>
                  <div className='w-full'>
                    <table className='text-[14px] border w-full'>
                        <thead className='bg-[#EDF1F4]'>
                            <tr>
                                <th className='text-left font-normal p-[5px]'>Product</th>
                                <th className='text-left font-normal p-[5px]'>Quantity</th>
                                <th className='text-left font-normal p-[5px]'>Header 3</th>
                                <th className='text-left font-normal p-[5px]'>price</th>
                            </tr>
                        </thead>
           
                        <tbody>
                            <tr>
                                <td className='p-[5px]'>{'nama'}</td>
                                <td className='p-[5px]'>{'12'}</td>
                                <td className='p-[5px]'>Cell 3</td>
                                <td className='p-[5px]'>{'12000'}</td>
                            </tr>
                        </tbody>
                       
                    </table>
                  </div>
                  <div className='grid grid-cols-4 mt-[10px]'>
                    <div className='col-span-2 text-gray-500 text-[14px]'>
                      Lorem ipsum dolor sit amet.
                    </div>
                    <div className='col-span-1'>
                      hello
                    </div>
                    <p>dd</p>
                  </div>
                </div>
                </div>
                </div>
              </div>
              </div>
              )}
            </div>
        </MainLayout>
    )
}

export default Main

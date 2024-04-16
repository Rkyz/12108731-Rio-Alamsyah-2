
import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { SlOptions } from "react-icons/sl";
import { AiOutlinePlus } from "react-icons/ai";
import { AiOutlineMinus} from "react-icons/ai";
import { LuUser2 } from "react-icons/lu";
import burger from '../../img/burger.png'
import NoData from './NoData';
import InputLabel from './InputLabel';
import TextInput from './TextInput';
import { MdDelete } from 'react-icons/md';
import { router, useForm } from '@inertiajs/react';

const CartComponent = ({handleOpenCart, openCart}) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [openCustomer, setOpenCustomer] = useState(false);
    const [options, setOptions] = useState(false);
    const [productsData, setProductsData] = useState(false);
    const [customerData, setCustomerData] = useState({
        nama: "",
        alamat: "",
        telephone: ""
    });

    const customers = window.customers;
    
    // console.log(customers, 'hello asu lah')

    // console.log(customerData)

    const [isEditCustomer, setIsEditCustomer] = useState(false);

    // const { post } = useForm(); // Gunakan useForm untuk mendapatkan fungsi post

    const handleOpenCustomer = () => {
        setOpenCustomer(!openCustomer);
    };

    const handleOption = (product) => {
        setOptions(true)
        setProductsData(product)
    };

    const handleSaveCustomer = () => {
        sessionStorage.setItem('customerData', JSON.stringify(customerData));
        setOpenCustomer(false);
        setIsEditCustomer(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    useEffect(() => {
        const productsFromSession = JSON.parse(sessionStorage.getItem('products')) || [];
        setCartProducts(productsFromSession);

        const savedCustomerData = JSON.parse(sessionStorage.getItem('customerData'));
        if (savedCustomerData) {
            setCustomerData(savedCustomerData);
            setIsEditCustomer(true);
        }
    }, []);

    const handleDecreaseQuantity = (products) => {
        const updatedCart = cartProducts.map(product => {
            if (product.id === products.id && product.name === products.name && product.category_id === products.category_id && product.quantity > 1) {
                return { ...product, quantity: product.quantity - 1 };
            }
            return product;
        });
        setCartProducts(updatedCart);
        sessionStorage.setItem('products', JSON.stringify(updatedCart));
    };

    const handleIncreaseQuantity = (products) => {
        const updatedCart = cartProducts.map(product => {
            if (product.id === products.id && product.category_id === products.category_id) {
                return { ...product, quantity: product.quantity + 1 };
            }
            return product;
        });
        setCartProducts(updatedCart);
        sessionStorage.setItem('products', JSON.stringify(updatedCart));
    };

    const handleDeleteProduct = (productId) => {
        const updatedCart = cartProducts.filter(product => product.id !== productId);
        setCartProducts(updatedCart);
        sessionStorage.setItem('products', JSON.stringify(updatedCart));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const currentDate = new Date().toISOString().slice(0, 10);

        const detailsData = cartProducts.map(product => ({
            productid: product.id,
            jumlahproduct: product.quantity
        }));

        console.log(detailsData)
        // Kirim data ke server menggunakan Inertia.js
        router.post('/buying', {
            tanggalpenjualan : currentDate,
            customer: {
                nama: customerData.nama,
                alamat: customerData.alamat,
                telephone: customerData.telephone
            },
            details : detailsData
         });
        console.log("Bill printed successfully"); 
        sessionStorage.removeItem('customerData');
        sessionStorage.removeItem('products');
    };

    const handleCustomerButtonClick = (customer) => {
        // Mengatur data pelanggan yang dipilih ke dalam state customerData
        setCustomerData({
          nama: customer.nama,
          alamat: customer.alamat,
          telephone: customer.telephone
        });
      };


    console.log(cartProducts)
  return (
 <div>
        <div className='absolute top-0 left-0 z-[50] bg-opacity-0 w-full h-full bg-black'/>

    <div className={`fixed flex top-0 w-full max-sm:max-w-full max-sm:flex-col max-sm:z-[90] z-[99] sm:pt-[96.5px] pr-[10px] max-sm:bg-white sm:bg-transparent h-full  right-0 ${openCustomer && cartProducts.length > 0 ? 'sm:max-w-[370px]':'sm:max-w-[330px]'}`}>
    
        {openCustomer && cartProducts.length > 0 && (
            <div className={`bg-white h-full max-sm:absolute max-sm:z-[90] flex w-full ${openCustomer && 'shadow-[-20px_20px_30px_rgba(0,_0,_0,_0.2)]'}`}>
                <div className='border-r border-black border-opacity-15 flex flex-col gap-[10px]'>
                    <div className='capitalize flex p-[15px] font-bold'>recent</div>
                    <div className='w-full h-auto px-[10px] flex-col gap-[15px] flex items-center justify-start'>
                        {customers.map((customer,index)=> (
                            <button onClick={()=> handleCustomerButtonClick(customer)} key={index} className='bg-red-500 text-white rounded-sm w-[50px] h-[50px]'>
                                {customer.id}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='w-full'>
                 <div className='flex gap-[10px] p-[15px] items-center justify-between'>
                    <div className='flex flex-col'>
                    <p className='font-bold capitalize text-[19px]'>Customer</p>
                     <p className='text-[13px] capitalize font-bold text-gray-500'>
                         {isEditCustomer ? 'Edit Customer' : 'Add Customer'}
                     </p>
                    </div>
                    <button onClick={handleOpenCustomer} className='bg-transparent flex items-center justify-center text-gray-500 w-[40px] rounded-full border-[2px] border-gray-300 h-[40px]'>
                        <IoMdClose/>
                    </button>
                </div>
                <form onSubmit={handleSaveCustomer} className='p-[15px] flex flex-col gap-[15px]'>
                        <div className='flex flex-col gap-[5px]'>
                            <InputLabel>Nama Customer</InputLabel>
                            <TextInput required name="nama" value={customerData.nama} onChange={handleChange} className="w-full"/>
                        </div>
                        <div className='flex flex-col gap-[5px]'>
                            <InputLabel>Alamat Customer</InputLabel>
                            <TextInput required name="alamat" value={customerData.alamat} onChange={handleChange} className="w-full"/>
                        </div>
                        <div className='flex flex-col gap-[5px]'>
                            <InputLabel>Nomor Customer</InputLabel>
                            <TextInput required name="telephone" value={customerData.telephone} onChange={handleChange} className="w-full"/>
                        </div>
                        <button type="submit" className='bg-red-500 text-white p-[10px] rounded-md capitalize font-bold'>
                            {isEditCustomer ? 'Save Customer' : 'Add Customer'}
                        </button>
                    </form>
                </div>
            </div>
        )}
        <div className={`w-full h-full relative bg-white flex flex-col items-center shadow-[-20px_20px_30px_rgba(0,_0,_0,_0.2)] ${openCustomer && cartProducts.length > 0 ? 'md:hidden ':''}`}>
      <div className='flex items-center w-full justify-between p-[15px]'>
        <div className='flex gap-[10px]'>
            {/* <button>
                cus
            </button> */}
            <div className='flex flex-col'>
            <p className='font-bold capitalize text-[19px]'>cart order</p>
            <p className='text-[13px] capitalize font-bold text-gray-500'>take out</p>
            </div>
        </div>
        <button onClick={handleOpenCart} className='bg-transparent flex items-center justify-center text-gray-500 w-[40px] rounded-full border-[2px] border-gray-300 h-[40px]'>
            <IoMdClose/>
        </button>
      </div>
        <div className={`bg-transparent gap-[15px] p-[15px] flex flex-col w-full h-full  overflow-y-auto ${openCart ? 'max-h-[330px]':'sm:max-h-[280px] max-sm:max-h-[400px]'}`}>
            {cartProducts.length > 0 ? (
                cartProducts.map((product,index)=>{
                    // console.log(product)
                    return (
                        <div key={index} className='flex w-full items-center bg-[#EEEEF1] p-[13px] rounded-md justify-between'>
                            <div className='flex items-center gap-[10px]'>
                            <div>
                                <img src={burger} alt="" className='w-[60px]'/>
                            </div>
                            <div className='flex flex-col gap-[5px]'>
                                <p className='text-[16px] font-bold capitalize'>{product.name}</p>
                                <p className='text-[#E35652] font-bold text-[12px]'>RP {product.price}</p>
                            </div>
                            </div>
                            <div className='flex flex-col justify-between items-end gap-[10px]'>
                                <button onClick={()=>handleOption(product)} className='text-gray-500'>
                                    <SlOptions/>
                                </button>
                                {options && productsData && productsData.id === product.id ? (
                                    <button onClick={()=> handleDeleteProduct(product.id)} className='text-[13px] bg-red-500 text-white p-[5px] rounded-sm'>
                                        <MdDelete/>
                                    </button>
                                ):(
                                    <div className='flex gap-[10px]'>
                                    <button onClick={() => handleDecreaseQuantity(product)} className='text-[13px] bg-transparent text-gray-500 border border-gray-500 w-[20px] h-[20px] rounded-sm flex items-center justify-center'>
                                        <AiOutlineMinus/>
                                    </button>
                                    <div>
                                        {product.quantity}
                                    </div>
                                    <button onClick={() => handleIncreaseQuantity(product)} className='text-[13px] bg-red-500 text-white w-[20px] h-[20px] rounded-sm flex items-center justify-center'>
                                        <AiOutlinePlus/>
                                    </button>
                                </div>
                                )}
                            </div>
                        </div>
                    )
                })
            ):(
                // <p>gak ada tolol</p>
                <div className='bg-[#EEEEF1] h-full flex-col rounded-md flex items-center justify-center'>
                    <p className='font-bold'>
                    No Data Available
                    </p>
                    <p className='capitalize text-[14px] font-bold text-gray-400'>buy something to see data</p>
                </div>
            )}
        </div>
        <div className='p-[15px]  w-full bg-white flex flex-col gap-[15px] absolute bottom-[10px]'>
            <div className='flex items-center justify-between gap-[10px]'>
                <div className='bg-red-500 p-[7.5px] text-white rounded-md w-full'>
                    <p className='text-[15px] font-bold'>
                    {isEditCustomer ? 'Edit Customer' : 'Add Customer'}  
                    </p>
                </div>
                {/* <button type='button' onClick={handleOpenCustomer} className='bg-red-500 text-white p-[10px] rounded-md capitalize font-bold flex items-center gap-[10px] justify-center'>
                    <LuUser2 className='text-[18px]'/>
                </button> */}
                <button type='button' className='bg-red-500 text-white p-[10px] rounded-md capitalize font-bold flex items-center gap-[10px] justify-center'>
                    <LuUser2 className='text-[18px]'/>
                </button>
            </div>
            <div className='flex items-center justify-between text-[14px] border-b border-black border-dashed capitalize text-gray-500 py-[10px]'>
                <div className='flex flex-col gap-[5px]'>
                    <p>subtotal</p>
                    <p>tax (10%)</p>
                </div>
                <div className='flex flex-col gap-[5px]'>
                    <p>RP 5.000</p>
                    <p>RP 5.000</p>
                </div>
            </div>
            <div className='flex items-center justify-between capitalize font-bold text-[14px]'>
                <div>
                    <p>total</p>
                </div>
                <div>
                    <p>RP 5.000</p>
                </div>
            </div>
            {/* <button onClick={handleSubmit} className='p-[10px] bg-[#F25754] rounded-md w-full h-auto text-white capitalize font-bold text-[15px]'>print bills</button> */}
            <button className='p-[10px] bg-[#F25754] rounded-md w-full h-auto text-white capitalize font-bold text-[15px]'>print bills</button>
        </div>
        </div>
    </div>
  </div>
  )
}

export default CartComponent
  

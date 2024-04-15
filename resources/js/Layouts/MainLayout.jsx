import React, { useState } from 'react'
import Side from './Side'
import Top from './Top'
import CartComponent from '@/Components/CartComponent'
import { Link, usePage } from '@inertiajs/react'
import { AiOutlinePlus } from "react-icons/ai";
import Form from '@/Components/Form'
import CreateUser from '@/Pages/User/Create'
import CreateProduct from '@/Pages/Product/Create'
import burger from '../../img/burger.png'
import TextInput from '@/Components/TextInput'
import { IoClose } from 'react-icons/io5'


const MainLayout = ({children, categories, auth, handleOpenMenu, openMenu, dataProduct, setOpenMenu, customers}) => {
  console.log(auth)
  const [openCart, setOpenCart] = useState(false)

  console.log(customers)

  const url = usePage().url

  const handleOpenCart = () => {
    setOpenCart(!openCart)
    setForm(false)

  }
  const [side, setSide] = useState(false)

  const handleSide = () => {
    setSide(!side)
  }
  const [form, setForm] = useState(false)

  const handleForm = () => {
    setForm(!form)
    setOpenCart(false)
  }

  const [quantity, setQuantity] = useState(1);
  
  const handleChangeQuantity = (e) => {
    const value = parseInt(e.target.value); 
    setQuantity(value); 
  };

  const handleAddProduct = () => {
    let products = JSON.parse(sessionStorage.getItem('products')) || [];
    const existingProductIndex = products.findIndex((product) => 
      product.name === dataProduct.name && product.category_id === dataProduct.category_id
    );
    
    if (existingProductIndex !== -1) {
      products[existingProductIndex].quantity += quantity;
    } else {
      products.push({
        id: dataProduct.id,
        name: dataProduct.name,
        stok: dataProduct.stok,
        category_id: dataProduct.category_id,
        quantity: quantity, 
        price: dataProduct.price,
        category_id: dataProduct.category_id
      });
    }
    
    // Simpan kembali data produk ke session
    sessionStorage.setItem('products', JSON.stringify(products));
    setOpenMenu(false);
  };
  
  
  
  console.log(url)

  return (
    <div className={`w-full relative h-screen flex ${openCart | form && 'overflow-hidden hidden-scroll'}`}>
      <Side side={side} children={'asu'}/>
      <div className=' w-full h-full'>
        <div className='flex flex-col z-[49] w-full h-full'>
          <Top handleSide={handleSide} handleOpenCart={handleOpenCart} side={side}/>
          <div className={`w-full ${openCart ? 'sm:z-[51]':'sm:z-[48]'} ${form ? 'sm:z-[51]':'sm:z-[48]'}  h-full pt-[96.5px] relative p-[10px] ${side ? 'slg:md:pl-[260px] max-md:sm:pl-[95px]':'md:pl-[95px]'}`}>
          {children}
          {openCart && (
            <CartComponent handleOpenCart={handleOpenCart}/>
          )}
          {form && (
            <Form handleForm={handleForm} url={url} >
                {url === '/user' && (
                  <CreateUser setForm={setForm}/>
                )}
                {url === '/product' && (
                  <CreateProduct categories={categories} setForm={setForm}/>
                )}
            </Form>
          )}
          </div>
        </div>
        {auth.user.role === 'admin' && url === '/product' | url === '/user' && (
          <button onClick={handleForm} className={`fixed shadow-lg right-[30px] max-sm:hidden sm:bottom-[30px] bg-red-500 p-[15px] text-[20px] text-white rounded-md ${form || openCart ? 'z-[45] hidden':'z-[50]'} ${url === '/menus' && 'hidden'} `}>
          <AiOutlinePlus/>
        </button>
        )}
        {openMenu && (
          <div className='bg-black px-[12px] flex-col bg-opacity-15 flex items-center justify-center w-full h-screen fixed left-0 top-0 z-[104]'>
              <div className='bg-white rounded-md grid md:grid-cols-2 max-w-[700px] relative w-full'>
                <button onClick={handleOpenMenu} className="bg-transparent text-black text-[20px] absolute max-md:right-[15px] md:left-[15px] top-[15px]">
                   <IoClose/>
                </button>
                <div className="w-full max-md:hidden h-full flex items-center justify-center">
                    <img src={burger} alt="" />
                </div>
                <div className="p-[20px] flex-col flex gap-[25px]">
                    <div className="flex flex-col">
                        <p className="font-Roboto font-bold text-[20px]">{dataProduct.name}</p>
                        <p className="capitalize text-gray-400 font-Roboto">stok {dataProduct.stok}</p>
                    </div>
                    <p className="font-Roboto text-gray-500">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quam odit, voluptates similique maiores facilis dignissimos natus laboriosam voluptas consequatur eius?</p>
                    <div className="grid grid-cols-2 gap-[15px] capitalize">
                        <div className="flex flex-col gap-[10px]">
                            <label htmlFor="">quantity</label>
                            <TextInput type="number" className=" outline-none placeholder:capitalize font-bold" placeholder="input here!!" value={quantity} onChange={handleChangeQuantity}/>
                        </div>
                        <div className="flex flex-col gap-[10px]">
                            <span>price</span>
                            <div className='bg-transparent flex items-center h-full'>
                                RP {dataProduct.price}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleAddProduct} className="bg-red-500 text-white p-[10px] rounded-md font-Roboto hover:bg-Yellow" >Add Product</button>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MainLayout

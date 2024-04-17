import React from 'react'

const Invoice = ({sale}) => {
    console.log(sale)
  return (
    <div>
         <div>
            <h1>Invoice</h1>
            <p>tanggal penjualan: {sale.sales_date}</p>
            <p>tanggal penjualan: {sale.total_price}</p>
            <p>customer id: {sale.customer_id}</p>
            <p>pembuat: {sale.user_id}</p>

            {sale.details.map((sales, index)=> (
                <div key={index}>
                    <div className='w-full bg-white gap-[10px] flex flex-col'>
                        <p>id : {sales.id}</p>
                        <p>sale id : {sales.sale_id}</p>
                        <p>product id : {sales.product_id}</p>
                        <p>product id : {sales.amount}</p>
                        <p>product id : {sales.sub_total}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Invoice
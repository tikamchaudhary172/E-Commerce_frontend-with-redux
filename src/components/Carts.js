import React from 'react'
import CartsData from './cartsData';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {add_to_cart} from '../redux/cartSlice';

const Carts = () => {

  const dispatch = useDispatch();

  const [data, setData] = useState(CartsData);
  // console.log("allData in Carts.js--",data);
  return (
    <>
      <div className='container mt-4'>
        <h3 className='text-center'>Food Menu List</h3>

        <div className='row d-flex justify-content-center align-item-center'>
          {
            data.map((item) => (
              <div className="card mx-1 my-1" style={{ width: '20rem' }} key={item.id}>
                <img src={item.imgdata} className="card-img-top mt-2" alt="img" style={{ height: '17rem' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.rname}</h5>
                  <h6>Price: ₹ {item.price}</h6>
                  <div className='d-flex justify-content-center'>
                    <button className="btn btn-primary col-lg-12" onClick={() =>dispatch(add_to_cart(item))}>Add to cart</button>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </>
  );
}

export default Carts;
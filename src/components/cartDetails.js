
import React, { useEffect, useState } from "react"
import Table from 'react-bootstrap/Table'
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { remove_to_cart, add_to_cart, item_qnty_decrement } from "../redux/cartSlice";


const cartDetails = () => {

  const [data, setData] = useState([]);
  //  console.log(data);
  const { id } = useParams();
  // console.log(id);

  const getData = useSelector((state) => state.cart.carts);
  // console.log("xyz",getData);
  const dispatch = useDispatch();
  const history = useNavigate();

  const remove = (id) => {
    dispatch(remove_to_cart(id));
    history("/");
  }

  const compare = () => {
    let compareData = getData.filter((e) => e.id == id);
    setData(compareData);
  }

  useEffect(() => {
    compare();
  }, [getData]);



  return (
    <>
      <div className="container mt-3">
        <h3 className='text-center'>Iteam Details
        </h3>
        <section className='container mt-3'>
          {
            data.map((itm) => {
              return < div className="iteamsdetails" key={itm.id}>
                <div className="items_img ms-3">
                  <img src={itm.imgdata} alt="" style={{ height: '12rem' }} />
                </div>
                <div className="details mt-4 ">
                  <Table>
                    <tbody>
                      <tr>
                        <td>
                          <p> <strong>Restaurant</strong>  : {itm.rname}</p>
                          <p> <strong>Price</strong>  : ₹ {itm.price}</p>
                          <p> <strong>Dishes</strong> : {itm.address}</p>
                          <p> <strong>Total</strong> : ₹ {itm.price * itm.qnty}</p>


                          <div className='mt-5 d-flex justify-content-between' style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>

                            <span style={{ fontSize: 28, marginLeft:8}} onClick={itm.qnty<=1 ?() =>remove(itm.id) : ()=>dispatch(item_qnty_decrement(itm))}>-</span>

                            {/* <span style={{ fontSize: 28, marginLeft: 8 }} onClick={() =>dispatch(item_qnty_decrement(itm))}>-</span> */}

                            <span style={{ fontSize: 30 }}>{itm.qnty}</span>

                            <span style={{ fontSize: 28, marginRight: 7 }} onClick={() => dispatch(add_to_cart(itm))}>+</span>
                          </div>


                        </td>
                        <td>
                          <p><strong>Rating :</strong> <span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "5px" }}>{itm.rating}</span></p>
                          <p><strong>Order Review :</strong> <span >{itm.somedata}</span></p>
                          <p><strong>Remove :</strong> <span ><i className='fas fa-trash' onClick={() => { remove(itm.id) }} style={{ color: "red", fontSize: 20, cursor: "pointer" }}></i>	</span></p>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
              </div>
            })
          }
        </section>
      </div>
    </>
  )
}

export default cartDetails;
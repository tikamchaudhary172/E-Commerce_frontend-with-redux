import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import Badge from '@mui/material/Badge';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import { useSelector, useDispatch } from 'react-redux';
import { remove_to_cart } from '../redux/cartSlice';


const Header = () => {
  const [price, setPrice] = useState(0);
  // console.log(price);
  const dispatch = useDispatch();
  const getData = useSelector((state) => state.cart.carts);
  // console.log("allData in Header.js--",getData);


  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const total = () => {
    let price = 0;
    getData.map((element) => {
      price = element.price * element.qnty + price;
    })
    setPrice(price);
  }

  useEffect(() => {
    total();
  }, [total])
  return (
    <>
      <Navbar bg="dark" variant="dark" style={{ height: '60px' }}>
        <Container>

          <NavLink to="/" className="text-decoration-none text-danger fs-4 ">Online Restaurant</NavLink>
          <Nav className="me-auto">
            <NavLink to="/" className="text-decoration-none text-light mx-5"  >Home</NavLink>
          </Nav>
          <Nav>
            <NavLink to="/cartsDetails" className="text-decoration-none text-light mx-5"  >Carts Details</NavLink>
          </Nav>

          <Badge badgeContent={getData.length} color="primary"
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <i className="fa-sharp fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: 'pointer' }}></i>
          </Badge>

        </Container>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >

          {
            getData.length ?
              <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                <Table>
                  <thead>
                    <tr><th>Iteams</th><th>Details</th></tr>
                  </thead>
                  <tbody>
                    {
                      getData.map((e) =>
                        <tr key={e.id}>
                          <td>
                            <NavLink to={`/cart/${e.id}`} title="View details" onClick={handleClose}>
                              <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                              <p className='text-success'>View Details</p>
                            </NavLink>
                          </td>
                          <td>
                            <p>{e.rname}</p>
                            <p>Price : ₹ {e.price}</p>
                            <p>Quantity : {e.qnty}</p>
                            <p style={{ color: 'red', fontSize: 24, cursor: 'pointer' }} onClick={() => dispatch(remove_to_cart(e.id))}>
                              <i className='fas fa-trash smalltrash'></i>
                            </p>
                          </td>
                          <td style={{ color: 'red', fontSize: 24, cursor: 'pointer' }} onClick={() => dispatch(remove_to_cart(e.id))}>
                            <i className='fas fa-trash largetrash'></i>
                          </td>
                        </tr>)
                    }
                  </tbody>
                  <tfoot>
                    <tr>< td className='text-center'>Total : ₹ {price}</td></tr>
                  </tfoot>
                </Table>
              </div> :
              <div className='cart-details d-flex justify-content-center align-items-center' style={{ width: "20rem" }}>
                <i className="fa-solid fa-xmark smallclose" style={{ position: 'absolute', top: 4, right: 18, cursor: 'pointer', fontSize: 24 }} onClick={handleClose}></i>
                <p>Your cart is empty</p>
                <img src='./cart.gif' alt='' className='emptycart_img ms-2' style={{ width: '3rem' }} />
              </div>
          }
        </Menu>
      </Navbar>
    </>
  );
}

export default Header;
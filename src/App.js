import "./components/Style.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Carts from './components/Carts';
import CartDetails from './components/cartDetails';
import CartsDetails from "./components/cartsDetails";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Carts />} />
          <Route path="/cartsDetails" element={<CartsDetails />}/>
          <Route path='/cart/:id' element={<CartDetails />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

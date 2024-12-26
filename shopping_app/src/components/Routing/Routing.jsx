import React from 'react'
import {Routes, Route} from 'react-router-dom'

import Homepage from './../Home/Homepage';
import ProductsPage from './../Products/ProductsPage';
import SingleProductPage from './../SingleProcduct/SingleProductPage';
import LoginPage from '../Authentication/LoginPage';
import Cartpage from './../Cart/Cartpage';
import MyOrderPage from './../MyOrder/MyOrderPage';
import SignupPage from '../Authentication/SignupPage';
import Logout from '../Authentication/Logout';
import ProtectedRoute from './ProtectedRoute';

const Routing = () => {
  return (
    <Routes>
       <Route path='/' element={<Homepage />} />
       <Route path='/products' element={<ProductsPage />} />
       <Route path='/product/:id' element={<SingleProductPage />} />
       <Route path='/signup' element={<SignupPage />} />
       <Route path='/login' element={<LoginPage />} />
       <Route path='/cart' element={<Cartpage />} />
       <Route path='/myorders' element={<MyOrderPage />} />
       <Route path='/logout' element={<Logout />} />
       {/* <Route element={<ProtectedRoute />}>
       <Route path='/cart' element={<Cartpage />} />
       <Route path='/myorders' element={<MyOrderPage />} />
       <Route path='/logout' element={<Logout />} />
       </Route> */}
    </Routes>
  )
}

export default Routing;

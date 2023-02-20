import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Sidebar from './components/sidebar/Sidebar';
import Layout from './components/card/layouts/Layout';
import Dashboard from './pages/Dashboard';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getLoginStatus } from './services/authService';
import { SET_LOGIN } from './redux/slices/authSlice';
import AddProduct from './pages/products/AddProduct';
import ProductDetails from './components/products/ProductDetails';
import EditProduct from './pages/products/EditProduct';
import Profile from './pages/profile/Profile';
import EditProfile from './pages/profile/EditProfile';
import ContactUs from './pages/contact/ContactUs';

axios.defaults.withCredentials = true


function App() {

  const dispatch = useDispatch()

useEffect(() => {

async function loginStatus() {

  const status = await getLoginStatus()
  dispatch(SET_LOGIN(status))
}

loginStatus()
}, [dispatch])

  return (
  <BrowserRouter>
  <ToastContainer />
  <Routes>
    <Route path='/' element={ <Home /> } />
    <Route path='/register' element={<Register />} />
    <Route path='/login' element={<Login />} />
    <Route path='/reset-password/:resetToken' element={<ResetPassword />} />
    <Route path='/forgot-password' element={<ForgotPassword />} />

    <Route path='/dashboard' element={
    <Sidebar>
    <Layout>
    <Dashboard />
    </Layout>
    </Sidebar>
  } 
  />

<Route path='/add-product' element={
    <Sidebar>
    <Layout>
    <AddProduct />
    </Layout>
    </Sidebar>
  } 
  />


<Route path='/product-details/:id' element={
    <Sidebar>
    <Layout>
    <ProductDetails />
    </Layout>
    </Sidebar>
  } 
  />

<Route path='/update-product/:id' element={
    <Sidebar>
    <Layout>
    <EditProduct />
    </Layout>
    </Sidebar>
  } 
  />

<Route path='/profile' element={
    <Sidebar>
    <Layout>
    <Profile />
    </Layout>
    </Sidebar>
  } 
  />

<Route path='/edit-profile' element={
    <Sidebar>
    <Layout>
    <EditProfile />
    </Layout>
    </Sidebar>
  } 
  />

<Route path='/contact-us' element={
    <Sidebar>
    <Layout>
    <ContactUs />
    </Layout>
    </Sidebar>
  } 
  />
  </Routes>
  </BrowserRouter>
  );
}

export default App;

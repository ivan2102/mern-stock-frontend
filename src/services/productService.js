import axios from 'axios';

 const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  

 //create product
  const createProduct = async (formData) => {

   const res = await axios.post(`${BACKEND_URL}/api/products`, formData)
   return res.data
 }

 //all products
 const getProducts = async () => {

  const res = await axios.get(`${BACKEND_URL}/api/products`)
  return res.data
 }

 //single product
 const productDetails  = async (id) => {

  const res = await axios.get(`${BACKEND_URL}/api/products/${id}`)
  return res.data
 }

 //edit product
 const updateProduct = async (id, formData) => {

  const res = await axios.patch(`${BACKEND_URL}/api/products/${id}`, formData)
  return res.data
 }

 //delete product
 const deleteProduct = async (id) => {

  const res = await axios.delete(`${BACKEND_URL}/api/products/${id}`)
  return res.data
 }

 const productService = {
  createProduct,
  getProducts,
  deleteProduct,
  productDetails,
  updateProduct
 }

 export default productService
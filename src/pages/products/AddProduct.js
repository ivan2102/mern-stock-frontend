import {useState} from 'react'
import ProductForm from "../../components/form/ProductForm";
import {useDispatch, useSelector } from 'react-redux';
import { createProduct, fetchAllProducts } from '../../redux/slices/productSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';

const initialState = {
    name: "",
    category: "",
    quantity: "",
    price: "",
    
}

const AddProduct = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productSlice = useSelector(state => state.product)
    const {isLoading} = productSlice

   const [ product, setProduct ] = useState(initialState)
   const [description, setDescription] = useState('')
   const [productImage, setProductImage] = useState("");
   const [imagePreview, setImagePreview] = useState(null);
   const { name, category, quantity, price } = product

   const handleChange = (event) => {

    const {name, value} = event.target
    setProduct({...product, [name]: value})
   }

   const handleImageChange = (e) => {
    setProductImage(e.target.files[0]);
    setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

   const handleSubmit = async (event) => {
   event.preventDefault()

   const formData = new FormData()
   formData.append("name", name)
   formData.append("category", category)
   formData.append("quantity", quantity)
   formData.append("price", price)
   formData.append("description", description)
   formData.append("image", productImage);
   
     dispatch(createProduct(formData))
     dispatch(fetchAllProducts())
    navigate('/dashboard')
   }

  return (
    <div>
        {isLoading && <Loading />}
       <h3 className="--mt">Add New Product</h3> 
       <ProductForm 
       product={product} 
       description={description}
       setDescription={setDescription}
       handleChange={handleChange}
       handleSubmit={handleSubmit}
       handleImageChange={handleImageChange}
       />
    </div>
  )
}
export default AddProduct
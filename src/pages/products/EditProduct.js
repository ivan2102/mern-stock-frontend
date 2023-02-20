import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchAllProducts, productDetails, selectProduct, updateProduct } from "../../redux/slices/productSlice"
import Loading from "../../components/loading/Loading"
import ProductForm from "../../components/form/ProductForm"

const EditProduct = () => {

    const {id} = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const productSlice = useSelector(state => state.product)
    const {isLoading} = productSlice

   const editProduct = useSelector(selectProduct)

    const [product, setProduct] = useState(editProduct)
    const [description, setDescription] = useState('')
    const [productImage, setProductImage] = useState("");
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (event) => {

        const {name, value} = event.target
        setProduct({...product, [name]: value})
       }

       const handleImageChange = (e) => {
        setProductImage(e.target.files[0]);
        console.log(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
      };
    
      
    useEffect(() => {

      dispatch(productDetails(id))
    }, [dispatch, id])

    useEffect(() => {

        setProduct(editProduct)

       setImagePreview(
      editProduct && editProduct.image ? `${editProduct.image.filePath}` : null
    ); 

        setDescription(

            editProduct && editProduct.description ? editProduct.description : ''
        )
    }, [editProduct])

    const handleSubmit = async (event) => {
        event.preventDefault()
     
        const formData = new FormData()
        formData.append('name', product?.name)
        formData.append('category', product?.category)
        formData.append('quantity', product?.quantity)
        formData.append('price', product?.price)
        formData.append('description', description)
        if (productImage) {
          formData.append("image", productImage);
        }
      
        console.log(...formData);
     
         await dispatch(updateProduct({id,formData}))
         await dispatch(fetchAllProducts())
         navigate('/dashboard')
        }
  return (
    <div>
    {isLoading && <Loading />}
   <h3 className="--mt">Edit Product</h3> 
   <ProductForm 
   product={product} 
   description={description}
   productImage={productImage}
   imagePreview={imagePreview}
   setDescription={setDescription}
   handleChange={handleChange}
   handleImageChange={handleImageChange}
   handleSubmit={handleSubmit}
   />
</div>
  )
}
export default EditProduct
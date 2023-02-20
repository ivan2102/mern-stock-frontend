import './ProductDetails.scss';
import { useRedirect } from '../../customHook/useRedirect';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { productDetails } from '../../redux/slices/productSlice';
import Card from '../card/Card';
import Loading from '../loading/Loading';
import DOMPurify from 'dompurify';
import { selectIsLoggedIn } from '../../redux/slices/authSlice';

const ProductDetails = () => {

  const { id } = useParams()
 const dispatch = useDispatch()
  useRedirect('/login')

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const productSlice = useSelector(state => state.product)
  const {product, isLoading, isError, message} = productSlice



  const stockStatus = (quantity) => {

    if(quantity > 0) {

      return <span className="--color-success">In Stock</span>
    }

    return <span className="--color-danger">Out of Stock</span>
  }

  useEffect(() => {


    if(isError) {
       console.log(message)
     }
     
     if(isLoggedIn === true) {
 
       dispatch(productDetails(id))
     }
 
  
   }, [isLoggedIn, isError, message, dispatch])



  return (
    <div className='product-detail'>
    <h3 className='--mt'>Product Detail</h3>
    <Card cardClass='card'>
      {isLoading && <Loading /> }

      {product && (

        <div className="detail">
         

          <h4>Product Aviability: { stockStatus(product.quantity) }</h4>
          <hr/>

          <h4>
            <span className='badge'>Name: </span> &nbsp; { product.name }
          </h4>

          <p>
            <b>&rarr; Category : </b> {product.category}
          </p>

          <p>
            <b>&rarr; Price : </b> ${product.price}
          </p>

          <p>
            <b>&rarr; Quantity in stock : </b> {product.quantity}
          </p>

          <p>
            <b>&rarr; Total Price : </b> ${product.price * product.quantity} 
          </p>

          <hr />

         <div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(product.description)}}></div>

         <hr/>

       <code className='--color-dark'>Created on: {product.createdAt.toLocaleString('en-US')}</code>
      <br />
       <code className='--color-dark'> LastUpdated : {product.updatedAt.toLocaleString('en-US')}</code> 

        </div>
      )}
    </Card>
    </div>
  )
}
export default ProductDetails
import './ProductSummary.scss';
import { MdProductionQuantityLimits } from'react-icons/md';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { BsCartX } from 'react-icons/bs';
import BoxComponent from '../box/BoxComponent';
import { useDispatch, useSelector } from 'react-redux';
import { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CATEGORY } from '../../redux/slices/productSlice';
import { useEffect } from 'react';

//icons
const productQuantityIcon = <MdProductionQuantityLimits size={40} color='#fff'/>
const moneyIcon = <FaRegMoneyBillAlt size={40} color='#fff'/>
const categoryIcon = <BiCategory size={40} color='#fff' />
const cartIcon = <BsCartX size={40} color='#fff'/>

//format total amount
export const formatNumbers = (x) => {

  return x.toString().replace(/\B(?=(\d{3}) + (?!\d)) /g, ",")
}

const ProductSummary = ({products}) => {

  const dispatch = useDispatch()
  const productValue = useSelector(state => state.product)
  const {totalValue, outOfStock, category } = productValue

useEffect(() => {

dispatch(CALC_STORE_VALUE(products))
dispatch(CALC_OUT_OF_STOCK(products))
dispatch(CALC_CATEGORY(products))

}, [dispatch, products])

  return (
    <div className='product-summary'>
      <h3>Overview</h3>
      <div className="info-summary">
       <BoxComponent 
       icon={productQuantityIcon} 
       title={'Total Products'}
       count={products.length}
       bgColor='card1'
       />

      <BoxComponent 
       icon={moneyIcon} 
       title={'Total Value'}
       count={ `$${formatNumbers(totalValue.toFixed(2))}` }
       bgColor='card2'
       />

      <BoxComponent 
       icon={categoryIcon} 
       title={'Categories'}
       count={ category.length }
       bgColor='card3'
       />

       <BoxComponent 
       icon={cartIcon} 
       title={'Out of Stock'}
       count={ outOfStock }
       bgColor='card4'
       />
      </div>
    </div>
  )
}
export default ProductSummary
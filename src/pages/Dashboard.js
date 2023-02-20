import { useRedirect } from "../customHook/useRedirect";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slices/authSlice";
import { useEffect } from "react";
import { fetchAllProducts } from "../redux/slices/productSlice";
import ProductList from "../components/products/ProductList";
import ProductSummary from "../components/products/ProductSummary";


const Dashboard = () => {

  const dispatch = useDispatch()

  useRedirect('/login')

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const productSlice = useSelector(state => state.product)
  const {products, isLoading, isError, message} = productSlice

  useEffect(() => {

    if(isLoggedIn === true) {

      dispatch(fetchAllProducts())
    }

    if(isError) {
      console.log(message)
    }
  }, [isLoggedIn, isError, message, dispatch])
  
  return (
    <div className="--dashboard">
      <h2>Dashboard</h2>
      <ProductSummary products={products}/>
    <ProductList products={products} isLoading={isLoading} />
    </div>
  )
}
export default Dashboard
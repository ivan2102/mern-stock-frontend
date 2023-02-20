import Loading from "../loading/Loading";
import "./ProductList.scss";
import { MdPageview } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import Search from "../search/Search";
import { useDispatch, useSelector } from 'react-redux';
import { SEARCH_PRODUCTS } from "../../redux/slices/searchSlice";
import ReactPaginate from 'react-paginate';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { deleteProduct, fetchAllProducts } from "../../redux/slices/productSlice";
import { Link } from "react-router-dom";


const ProductList = ({products, isLoading}) => {

   const [search, setSearch] = useState("");

  const dispatch = useDispatch()
  const searchResults = useSelector(state => state.search)
  const {searchedProducts} = searchResults

  //pagination
  const [currentItems, setCurrentItems] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5

 useEffect(() => { 
   
  const endOffset = itemOffset + itemsPerPage;
  
  setCurrentItems(searchedProducts.slice(itemOffset, endOffset));
  setPageCount(Math.ceil(searchedProducts.length / itemsPerPage));
 }, [itemOffset, itemsPerPage, searchedProducts])
  

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % searchedProducts.length;
  
    setItemOffset(newOffset);

  }
  //end pagination

  useEffect(() => {

   dispatch(SEARCH_PRODUCTS({products, search}))
  }, [products, search, dispatch])

  const removeProduct = async (id) => {

    await dispatch(deleteProduct(id))
    
     await dispatch(fetchAllProducts())
     
    }

  //confirm delete
  const confirmDelete = (id) => {

    confirmAlert({
      title: 'Delete product',
      message: 'Are you sure you want to delete this product.',
      buttons: [
        {
          label: 'Delete',
          onClick: () => removeProduct(id)
        },
        {
          label: 'Cancel',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>

          <span>
            <Search value={search} onChange={(event) => setSearch(event.target.value)}/>
          </span>
        </div>

        {isLoading && <Loading />}

        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No products to display</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td>${price}</td>
                      <td>{quantity}</td>
                      <td>${price * quantity}</td>
                      <td className="icons">
                        <span>
                        <Link to={`/product-details/${_id}`}>
                          <MdPageview size={25} color={"#2e86de"} />
                          </Link>
                        </span>

                        <span>
                          <Link to={`/update-product/${_id}`}>
                          <FiEdit size={25} color={"#00d2d3"} />
                          </Link>
                        </span>

                        <span>
                          <FaTrash onClick={() => confirmDelete( _id )} size={25} color={"red"} />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={2}
        pageCount={pageCount}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        pageLinkClassName="page-num"
        previousLinkClassName="page-num"
        nextLinkClassName="page-num"
        activeLinkClassName="active"
      />
      </div>
    </div>
  );
};
export default ProductList;

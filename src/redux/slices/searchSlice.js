import { createSlice } from '@reduxjs/toolkit'

const initialState = {

    searchedProducts: []
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    SEARCH_PRODUCTS(state, action) {
       
        const {products, search} = action.payload
        const tempProducts = products.filter((product) =>
        
          product.name?.toLowerCase().includes(search?.toLowerCase()) ||
        product.category?.toLowerCase().includes(search?.toLowerCase())

           
        )

        state.searchedProducts = tempProducts
    }
  }
});

export const {SEARCH_PRODUCTS} = searchSlice.actions

export default searchSlice.reducer
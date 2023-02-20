import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from "../../services/productService";

const initialState = {

    product: null,
    products: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    totalValue: 0,
    outOfStock: 0,
    category: []
}

//create product
export const createProduct = createAsyncThunk(
    'products/create',
    async (formData, thunkAPI) => {

        try {

            return await productService.createProduct(formData)
            
        } catch (error) {

            const message = (

                error.response && error.response.data 
                && error.response.data.message ) || error.message ||
                error.toString()

                console.log(message);
                console.log(error.message)
    
              
               return thunkAPI.rejectWithValue(message)
            
        }
    }
)

//fetch all products
export const fetchAllProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, thunkAPI) => {

        try {

            return await productService.getProducts()

        }catch(error) {

            const message = (

                error.response && error.response.data 
                && error.response.data.message ) || error.message ||
                error.toString()
    
               console.log(message);
               console.log(error.message)

               return thunkAPI.rejectWithValue(message)
        }
    }
)

//product details
export const productDetails = createAsyncThunk(
    'products/details',
    async (id, thunkAPI) => {

        try {

            return await productService.productDetails(id)

        }catch(error) {

            const message = (

                error.response && error.response.data 
                && error.response.data.message ) || error.message ||
                error.toString()
    
               console.log(message);
               console.log(error.message)

               return thunkAPI.rejectWithValue(message)  
        }
    }
)

//edit product
export const updateProduct = createAsyncThunk(
    'products/update',
    async ({id, formData}, thunkAPI) => {

        try {

            return await productService.updateProduct(id, formData)
            
        } catch (error) {

            const message = (

                error.response && error.response.data 
                && error.response.data.message ) || error.message ||
                error.toString()
    
               console.log(message);
               console.log(error.message)

               return thunkAPI.rejectWithValue(message)  
            
        }
    }
)

//delete product
export const deleteProduct = createAsyncThunk(
    'products/delete',
    async(id, thunkAPI) => {

        try {

            return await productService.deleteProduct(id)

        }catch(error) {

            const message = (

                error.response && error.response.data 
                && error.response.data.message ) || error.message ||
                error.toString()
    
               console.log(message);
               console.log(error.message)

               return thunkAPI.rejectWithValue(message) 
        }
    }
)

const productSlice = createSlice({

    name: 'product',
    initialState,
    reducers: {

        CALC_STORE_VALUE(state, action) {

            const products = action.payload
            const array = []
            products.map((item) => {
              
                const {price, quantity} = item
                const productValue = price * quantity
                return array.push(productValue)
            })

            const total = array.reduce((acc, currentValue) => {

               return acc + currentValue
            }, 0)

            state.totalValue = total
        },

        CALC_OUT_OF_STOCK(state, action) {

            const products = action.payload
            const array = []
            products.map((item) => {

                const {quantity} = item
                return array.push(quantity)

            })

            let count = 0

            array.forEach((number) => {

                if(number === 0 || number === "0") {

                    count += 1
                }
            })

            state.outOfStock = count
        },

        CALC_CATEGORY(state, action) {

            const products = action.payload
            const array = []

            products.map((item) => {

                const {category} = item
                return array.push(category)
            })

            const newCategory = [...new Set(array)]
            state.category = newCategory
        }
    },

    extraReducers: (builder) => {

        //create product
      builder.addCase(createProduct.pending, (state) => {

         state.isLoading = true;
      })

      builder.addCase(createProduct.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false
        state.product = action.payload
        state.products.push(action.payload)
        toast.success('Product added successfully')

      })

      builder.addCase(createProduct.rejected, (state, action) => {

          state.isLoading = false;
          state.isError = true;
          state.message = action.payload;
          toast.error(action.payload)
      })

       //fetch all products
      builder.addCase(fetchAllProducts.pending, (state) => {

        state.isLoading = true;
    })

     builder.addCase(fetchAllProducts.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false
        state.products = action.payload
     })

     builder.addCase(fetchAllProducts.rejected, (state, action) => {

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error('Product rejected')
     })

     //product details
     builder.addCase(productDetails.pending, (state) => {

        state.isLoading = true;
     })

     builder.addCase(productDetails.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false
        state.product = action.payload
        
     })

     builder.addCase(productDetails.rejected, (state, action) => {

        state.isLoading = false;
        state.isError = true
        state.message = action.payload
        toast.error('Product details rejected')
     })

     //update product
     builder.addCase(updateProduct.pending, (state) => {

        state.isLoading = true;
     })

     builder.addCase(updateProduct.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false
        toast.success('Product updated successfully')
        
     })

     builder.addCase(updateProduct.rejected, (state, action) => {

        state.isLoading = false;
        state.isError = true
        state.message = action.payload
        toast.error('Update product rejected')
     })

     //delete product
     builder.addCase(deleteProduct.pending, (state) => {

        state.isLoading = true;
     })

     builder.addCase(deleteProduct.fulfilled, (state, action) => {

        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Product deleted successfully')
     })

     builder.addCase(deleteProduct.rejected, (state, action) => {

        state.isLoading = false;
        state.isError = true;
        state.message = action.payload
        toast.error('Product rejected')
     })

    }

   
})

export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_CATEGORY } = productSlice.actions

export const selectProduct = (state) => state.product.product

export default productSlice.reducer


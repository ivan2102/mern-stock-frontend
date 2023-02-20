import { configureStore } from "@reduxjs/toolkit";
import authReducer from './slices/authSlice';
import productReducer from "./slices/productSlice";
import searchReducer from "./slices/searchSlice";


const store = configureStore({

    reducer: {

        auth: authReducer,
        product: productReducer,
        search: searchReducer
    }
})

export default store
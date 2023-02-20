
import axios from 'axios';
import { toast } from 'react-toastify';


export const BACKEND_URL = process.env.REACT_APP_BACKEND_URL

export const validateEmail = (email) => {

    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
}
//register user
export const registerUser = async (userData) => {

    try {

        const response = await axios.post(`${BACKEND_URL}/api/users/register`, userData)

        if(response.statusText === 'OK') {

            toast.success('User successfully registered')
        }

        return response.data
        
    } catch (error) {

        const message = (

            error.response && error.response.data && 
            error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}

//login user
export const loginUser = async (userData) => {

    try {

        const response = await axios.post(`${BACKEND_URL}/api/users/login`, userData)

        if(response.statusText === 'OK') {

            toast.success('Login successfully')
        }

        return response.data
        
    } catch (error) {

        const message = (

            error.response && error.response.data 
            && error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}

//logout user
export const logoutUser = async () => {

    try {

     await axios.get(`${BACKEND_URL}/api/users/logout`)
        
    } catch (error) {

        const message = (

            error.response && error.response.data 
            && error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}
//forgot password
export const forgotPassword = async (userData) => {

    try {

       const res = await axios.post(`${BACKEND_URL}/api/users/forgot-password`, userData)

       toast.success(res.data.message)
        
    } catch (error) {

        const message = (

            error.response && error.response.data 
            && error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}

//reset password
export const resetPassword = async (userData, resetToken) => {

    try {

       const res = await axios.put(`${BACKEND_URL}/api/users/reset-password/${resetToken}`, userData)

       return res.data
        
    } catch (error) {

        const message = (

            error.response && error.response.data 
            && error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}

//get login status
export const getLoginStatus = async () => {

    try {

        const res = await axios.get(`${BACKEND_URL}/api/users/loggedIn`)

        return res.data
        
    } catch (error) {

        const message = (

            error.response && error.response.data 
            && error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}

//user profile
export const userProfile = async () => {

    try {

        const res = await axios.get(`${BACKEND_URL}/api/users/profile`)
        return res.data
        
    } catch (error) {

        const message = (

            error.response && error.response.data 
            && error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}

//update user profile
 export const updateUserProfile = async (formData) => {

    try {

        const res = await axios.patch(`${BACKEND_URL}/api/users/updateUser`, formData)
        return res.data
        
    } catch (error) {

        const message = (

            error.response && error.response.data 
            && error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}

//change password
export const changePassword = async (formData) => {

    try {

        const res = await axios.patch(`${BACKEND_URL}/api/users/changePassword`, formData)
        return res.data
        
    } catch (error) {

        const message = (

            error.response && error.response.data 
            && error.response.data.message ) || error.message ||
            error.toString()

            toast.error(message)
        
    }
}
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN } from '../redux/slices/authSlice';
import { toast } from 'react-toastify';
import { getLoginStatus } from '../services/authService';


export const useRedirect = (path) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

  useEffect(() => {

    const redirect = async () => {

        const isLoggedIn = await getLoginStatus()
        dispatch(SET_LOGIN(isLoggedIn))

        if(!isLoggedIn) {

            toast.info('You are not logged in, please try again')
            navigate(path)
            return
        }
    }

    redirect()
  }, [navigate, path, dispatch])
}
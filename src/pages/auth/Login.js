import styles from './auth.module.scss';
import {SlLogin} from 'react-icons/sl';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import { loginUser, validateEmail } from '../../services/authService';
import { SET_LOGIN, SET_NAME } from '../../redux/slices/authSlice';
import { toast } from 'react-toastify';

const initialState = {

  email: '',
  password: '' 
}

const Login = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

const [formData, setFormData] = useState(initialState)
const { email, password } = formData
const [isLoading, setIsLoading] = useState(false)

const handleChange = (event) => {

   const {name, value} = event.target
   setFormData({...formData, [name]: value})
}

const handleSubmit = async (event) => {
   event.preventDefault()

   if(!email || !password) {

      return toast.error('Please enter a valid email and password')
   }

   if(password.length < 6) {

      return toast.error('Please enter at least 6 characters')
   }

   if(!validateEmail(email)) {

      return toast.error('Please enter a valid email')
   }

   const userData = {email, password}
   

   setIsLoading(true)

   try {

      const data = await loginUser(userData)
      console.log(data);
      await dispatch(SET_LOGIN(true))
      await dispatch(SET_NAME(data.name))
      navigate('/dashboard')
      setIsLoading(false)
      
   } catch (error) {

      setIsLoading(false)
      
      
   }


}

  return (
    <div className={`container ${styles.auth}`}>

      {isLoading && <Loading /> }
        <Card>
        <div className={styles.form}>
         <div className="--flex-center">
            <SlLogin size={35} color="#7A577A"/>
         </div>
         <h2>Login</h2>

         <form onSubmit={handleSubmit}>
            <input type="email" name="email" value={email} onChange={handleChange} required id="email" placeholder='Email' />
            <input type="password" name="password" value={password} onChange={handleChange} required id="password" placeholder='Password' />
            <button type='submit' className='--btn --btn-purple --btn-block'>Login</button>
         </form>
         <div className="login-links">
         <Link to='/forgot-password'>Forgot Password</Link>
         <span className={styles.register}>
            <p>&nbsp; Don't have an account yet <Link to='/register'>Register</Link> please? &nbsp;</p>
            
         </span>
         </div>
        </div>
        </Card>
    </div>
  )
}
export default Login
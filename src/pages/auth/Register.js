import styles from './auth.module.scss';
import {FaRegUser} from 'react-icons/fa'
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {toast} from 'react-toastify';
import { registerUser, validateEmail } from '../../services/authService';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SET_LOGIN, SET_NAME } from '../../redux/slices/authSlice';
import Loading from '../../components/loading/Loading';

const initialState = {
  name: '',
  email: '',
  password: ''
}

const Register = () => {

const dispatch = useDispatch()
const navigate = useNavigate()

 const [formData, setFormData]  = useState(initialState)
 const [isLoading, setIsLoading] = useState(false)
 const {name, email, password} = formData

 const handleChange = (event) => {
  
  const {name, value}  = event.target
  setFormData({...formData, [name]: value})
 }

 const handleSubmit = async (event) => {
  event.preventDefault()

  if(!name || !email || !password) {

    return toast.error('Please enter a name and email and password')
  }

  if(password.length < 6) {

    return toast.error('Password must be at least 6 characters')
  }

  if(!validateEmail(email)) {

    return toast.error('Please enter a valid email address')
  }

  const userData = {name, email, password}
  

  setIsLoading(true)

  try {

    const data = await registerUser(userData)
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

       { isLoading && <Loading /> }

        <Card>
        <div className={styles.form}>
         <div className="--flex-center">
            <FaRegUser size={35} color="#7A577A"/>
         </div>
         <h2>Register</h2>

         <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={ name } onChange={ handleChange } required id="name" placeholder='Your Name' />
            <input type="email" name="email" value={email} onChange={handleChange} required id="email" placeholder='Email' />
            <input type="password" name="password" value={password} onChange={handleChange} required id="password" placeholder='Password' />
            <button type='submit' className='--btn --btn-purple --btn-block'>Register</button>
         </form>
         <div className="login-links">
         <span className={styles.register}>
            <p>&nbsp; You already have an account <Link to='/login'>Login</Link> please? &nbsp;</p>
            
         </span>
         </div>
        </div>
        </Card>
    </div>
  )
}
export default Register
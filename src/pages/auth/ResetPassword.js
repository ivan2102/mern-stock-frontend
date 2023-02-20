import styles from './auth.module.scss';
import {GrPowerReset} from 'react-icons/gr';
import Card from '../../components/card/Card';
import { Link, useParams } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { resetPassword } from '../../services/authService';


const initialState = {
  password: '',
  password2: ''
}

const ResetPassword = () => {

const [formData, setFormData] = useState(initialState)
const { password, password2 } = formData

const {resetToken} = useParams()

const handleChange = (event) => {

  const {name, value} = event.target
  setFormData({...formData, [name]: value})
}

const handleSubmit = async (event) => {
  event.preventDefault()

  if(password.length < 6) {

    return toast.error('Password must be at least 6 characters long')
  }

  if(password !== password2) {

    return toast.error('Passwords do not match')
  }

  const userData = { password, password2 }

  try {

    const data = await resetPassword(userData, resetToken)
    toast.success(data.message)
    
  } catch (error) {

    console.log(error.message);
    
  }

}

  return (
    <div className={`container ${styles.auth}`}>
        <Card>
        <div className={styles.form}>
         <div className="--flex-center">
            <GrPowerReset size={35} color="#7A577A"/>
         </div>
         <h2>Reset Password</h2>

         <form onSubmit={handleSubmit}>
            <input type="password" value={ password } onChange={ handleChange } name="password" required id="password" placeholder='New Password' />
            <input type="password" value={ password2 } onChange={ handleChange } name="password2" required id="password" placeholder='Confirm New Password' />
            <button type='submit' className='--btn --btn-purple --btn-block'>Reset Password</button>
            
            <div className="login-links">
            <div className={styles.links}>
             <p><Link to='/login'>Login</Link></p>
            </div>
            </div>
         </form>
         
        </div>
        </Card>
    </div>
  )
}
export default ResetPassword
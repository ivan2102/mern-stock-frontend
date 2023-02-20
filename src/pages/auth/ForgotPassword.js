import styles from './auth.module.scss';
import {TfiEmail} from 'react-icons/tfi';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { forgotPassword, validateEmail } from '../../services/authService';

const ForgotPassword = () => {

const [email, setEmail] = useState('')

const forgotSubmit = async (event) => {
event.preventDefault()

if(!email) {

  return toast.error('Please enter a valid email address')
}

if(!validateEmail(email)) {

  return toast.error('Please enter a valid email address')
}

const userData = {email }

await forgotPassword(userData)
setEmail('')

}

  return (
    <div className={`container ${styles.auth}`}>
        <Card>
        <div className={styles.form}>
         <div className="--flex-center">
            <TfiEmail size={35} color="#7A577A"/>
         </div>
         <h2>Forgot Password</h2>

         <form onSubmit={forgotSubmit}>
            <input type="email" name="email" value={email} onChange={(event) => setEmail(event.target.value)} required id="email" placeholder='Email' />
            <button type='submit' className='--btn --btn-purple --btn-block'>Reset Email</button>
            
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
export default ForgotPassword
import { useState } from 'react';
import { toast } from 'react-toastify';
import { changePassword } from '../../services/authService';
import './ChangePassword.scss';
import Card from '../card/Card';
import { useNavigate } from 'react-router-dom'

const initialState = {

    oldPassword: '',
    password: '',
}

const ChangePassword = () => {

    const navigate = useNavigate()

  const [ formData, setFormData ] = useState(initialState)

  const {oldPassword, password } = formData

  const handleChange = (event) => {

    const {name, value} = event.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const pass = { oldPassword, password }

   const data = await changePassword(pass)
    toast.success(data)
    navigate('/profile')

  }

  return (
    <div className='change-password'>
      <Card cardClass={'password-card'}>
        <h3>ChangePassword</h3>

        <form onSubmit={handleSubmit} className='--form-control'>
           <input 
           type="password"
            name="oldPassword"
            placeholder='Old Password'
            required
             value={oldPassword}
             onChange={handleChange}
              /> 

<input 
           type="password"
            name="password"
            placeholder='Password'
            required
             value={password}
             onChange={handleChange}
              /> 

              <button type='submit' className="--btn --btn-primary">Reset Password</button>
        </form>
      </Card>
    </div>
  )
}
export default ChangePassword
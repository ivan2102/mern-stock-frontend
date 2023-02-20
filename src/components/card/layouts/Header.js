import { logoutUser } from "../../../services/authService"
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { SET_LOGIN } from "../../../redux/slices/authSlice";
import { selectName } from "../../../redux/slices/authSlice";


const Header = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const name = useSelector(selectName)

 const logout = async () => {

   await logoutUser()
    dispatch(SET_LOGIN(false))
   navigate('/login')
 }

  return (
    <div className="--pad header">
     <div className="--flex-between">
        <h3>
          <span className="--fw-grey --color-grey">Welcome, </span>
          <span className="--color-danger">{name}</span>  
        </h3>

        <button onClick={logout} className="button --btn --btn-danger">Logout</button>
    </div> 
  
    </div>
  )
}
export default Header
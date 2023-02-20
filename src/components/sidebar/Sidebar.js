import './Sidebar.scss';
import {GrHpi} from 'react-icons/gr';
import {GiHamburgerMenu} from 'react-icons/gi';
import menu from '../../data/sidebar';
import SidebarItem from './SidebarItem';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Sidebar = ({children}) => {

    const navigate = useNavigate()

    const home = () => {

        navigate('/')
    }

const [ isOpen, setIsOpen ] = useState()

const toggleHandler = () => setIsOpen(!isOpen)

  return (
    <div className='layout'>
       <div className="sidebar" style={{width: isOpen ? '230px' : '60px'}}>
        <div className="top_section">
            <div className="logo" style={{display: isOpen ? 'block' : 'none'}}>
                <GrHpi size={35} style={{cursor: 'pointer'}} onClick={home}/>
            </div>

            <div className="bars" style={{marginLeft: isOpen ? '100px' : '0px'}}>
                <GiHamburgerMenu onClick={toggleHandler} size={35} style={{cursor: 'pointer'}}/>
            </div>
        </div>
       

       {menu.map((item, index) => {

        return <SidebarItem key={index} item={item} isOpen={isOpen}/>
       })}
</div>
       <main style={{paddingLeft: isOpen ? '230px' : '60px', transition: 'all .5s'}}>
        {children}
       </main>
    </div>
  )
}
export default Sidebar
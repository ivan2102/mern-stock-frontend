import { useState } from "react"
import { MdKeyboardArrowRight } from "react-icons/md"
import { NavLink } from "react-router-dom";

const activeLink = ({isActive}) => (isActive ? "active" : "link")
const activeSublink = ({isActive}) => (isActive ? "active" : "link")

const SidebarItem = ({item, isOpen}) => {

  const [ expandMenu, setExpandMenu ] = useState(false)

if(item.childrens) {

  return(

     <div className={expandMenu ? 'sidebar-item s-parent open' : 'sidebar-item s-parent'}>

      <div className="sidebar-title">
        <span>
          <div className="icon">{item.icon}</div>
          {isOpen && <div>{item.title}</div>}
        </span>

        <MdKeyboardArrowRight 
        size={25} 
        className='arrow-icon'
        onClick={() => setExpandMenu(!expandMenu)}
         />
      </div>

      <div className="sidebar-content">
        {item.childrens.map((child, index) => {

          return(
            <div key={index} className="s-child">
             <NavLink className={activeSublink} to={child.path}>
              <div className="sidebar-item">
              <div className="sidebar-title">
                {child.icon}
              {isOpen && <div>{child.title}</div>}
              </div>
              </div>
             </NavLink>
            </div>
          )
        })}
      </div>
     </div>
  ) 

}else {

  return (

    <NavLink className={activeLink} to={item.path}>
      <div className="sidebar-item s-parent">
    <div className="sidebar-title">

    <span>
    {item.icon}
    {isOpen && <div>{item.title}</div>}
    </span>

    </div>
    </div>
    </NavLink>
  )
}
    
  
}
export default SidebarItem
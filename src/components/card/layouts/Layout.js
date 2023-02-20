import Footer from "./Footer"
import Header from "./Header"

const Layout = ({children}) => {
  return (
    <div>
        <>
        <Header />
        <div style={{minHeight: '80vh'}} className='--pad'>
            {children}
        </div>
        <Footer />
        </>
    </div>
  )
}
export default Layout
import {GrHpi} from 'react-icons/gr';
import { Link } from 'react-router-dom';
import heroImg from '../assests/images/heroImg.png';
import './Home.scss';
import { ShowLoggedIn, ShowLoggedOut } from '../components/NavbarLinks';


function Home() {
  return (
    <div className='home'>
      <nav className="container --flex-between">
        <div className="logo">
          <GrHpi size={35} />
        </div>

        <ul className="home-links">

      <ShowLoggedOut>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        </ShowLoggedOut>

      <ShowLoggedOut>
        <li>
          <button className="--btn --btn-primary">
          <Link to='/login'>Login</Link>
          </button>
          
        </li>
        </ShowLoggedOut>

        <ShowLoggedIn>
        <li>
          <button className="--btn --btn-primary">
          <Link to='/dashboard'>Dashboard</Link>
          </button>
          
        </li>
        </ShowLoggedIn>
        </ul>
      </nav>

      <section className="container hero">
        <div className="hero-text">
          <h2>WE'RE <span>COMING SOON</span></h2>
          <p>Hello fellow shoppers! We're currently building our new fashion store. Add your email to stay up-to-date with announcements and our launch deals.</p>

          <div className="hero-buttons">
          <button className="--btn --btn-secondary">
          <Link to='/dashboard'>Free Trial 1 Month</Link>
          </button>
          </div>

          <div className="--flex-start">
            <NumberText num='14K' text='Brand Owners' />
            <NumberText num='23K' text='Active Users' />
            <NumberText num='500+' text='Partners' />
          </div>
        </div>
        <div className="hero-image">
          <img src={heroImg} alt='web'/>
        </div>
      </section>
    </div>
  )
}

const NumberText = ({num, text}) => {

  return (
    <div className="--mr">
      <h3 className='--color-white'>{num}</h3>
      <p className='--color-white'>{text}</p>
    </div>
  )
}
export default Home
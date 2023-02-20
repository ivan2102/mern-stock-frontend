import { useState } from 'react';
import Card from '../../components/card/Card';
import './ContactUs.scss';
import { FaPhoneAlt, FaEnvelope, FaTwitter } from 'react-icons/fa';
import {GoLocation} from 'react-icons/go';
import { toast } from 'react-toastify';
import axios from 'axios';
import { BACKEND_URL } from '../../services/authService';

const ContactUs = () => {

const [ subject, setSubject ] = useState('')
const [message, setMessage ] = useState('')

const data = {subject, message}

const sendEmail = async (event) => {
    event.preventDefault()

    try {

       const res = await axios.post(`${BACKEND_URL}/api/contact`, data)

         setSubject('')
         setMessage('')
         toast.success(res.data.msg)
        
    } catch (error) {

        toast.error(error.message)
        
    }
}

  return (
    <div className='contact'>
        <h3 className='--mt'>Contact Us</h3>

        <div className="section">
            <form onSubmit={sendEmail}>
                <Card cardClass='card'>
                    <label htmlFor="subject">Subject</label>
                    <input 
                    type="text"
                     name="subject"
                      value={subject}
                       placeholder='Subject'
                        required
                        onChange={(event) => setSubject(event.target.value)}
                         />

                    <label htmlFor="message">Message</label>
                    <textarea
                     name="message"
                      value={message}
                       placeholder='Message'
                        required
                        cols={30}
                        rows={10}
                        onChange={(event) => setMessage(event.target.value)}
                         ></textarea>

                         <button className="--btn --btn-primary">Send Message</button>
                </Card>
            </form>

            <div className="details">
                <Card cardClass={'card2'}>
                    <h3>Our Contact Information</h3>
                    <p>Fill the form or contact us via other channels listed bellow</p>

                    <div className="icons">
                        <span>
                            <FaPhoneAlt />
                            <p>+381641111111</p>
                        </span>

                        <span>
                            <FaEnvelope />
                            <p>email@email.com</p>
                        </span>

                        <span>
                            <GoLocation />
                            <p>Belgrade, Serbia</p>
                        </span>

                        <span>
                            <FaTwitter />
                            <p>www.twitter.com</p>
                        </span>
                    </div>
                </Card>
            </div>
        </div>
    </div>
  )
}
export default ContactUs
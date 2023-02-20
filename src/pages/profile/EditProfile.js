import { useEffect, useState } from 'react';
import './Profile.scss';
import { useSelector } from 'react-redux';
import Loading from '../../components/loading/Loading';
import Card from '../../components/card/Card';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { updateUserProfile } from '../../services/authService';
import { selectUser } from '../../redux/slices/authSlice';
import ChangePassword from '../../components/changePassword/ChangePassword';


const EditProfile = () => {

    const navigate = useNavigate()
   
   const user = useSelector(selectUser)
    const { email } = user

    useEffect(() => {

    if(!email) {

        navigate('/profile')
    }
    }, [email, navigate])

    const initialState = {

        name: user?.name,
        email: user?.email,
        bio: user?.bio,
        photo: user?.photo
      }

    const [ profile, setProfile ] = useState(initialState)
    const [profileImage, setProfileImage ] = useState('')
    const [ isLoading, setIsLoading ] = useState(false)

  

    const handleChange = (event) => {

        const { name, value } = event.target
        setProfile({...profile, [name]: value})
    }

    const handleImageChange = (event) => {
       
        setProfileImage(event.target.files[0])
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)

        try {
            //image upload
            let imageURL;

            if(profileImage && (
                profileImage.type === 'image/jpeg' ||
                profileImage.type === 'image/png' ||
                profileImage.type === 'image/jpg'
                )) {


            

                const image = new FormData()

                image.append('file', profileImage)
                image.append('cloud_name', 'dtxfuorxh')
                image.append('upload_preset', 'lkpgcxxx')

            

                //save image to cloudinary
                const res = await fetch('https://api.cloudinary.com/v1_1/dtxfuorxh/image/upload',{

                method: 'POST',
                body: image,
                })

                const imageData = await res.json()
                imageURL = imageData.url.toString()

            }

                //save profile
                const formData = {

                    name: profile.name,
                    email: profile.email,
                    bio: profile.bio,
                    photo: profileImage ? imageURL : profile.photo
                }
                
             const data = await updateUserProfile(formData)
                console.log(data);
                toast.success('User profile updated')
                navigate('/profile')
                setIsLoading(false)
                
        } catch (error) {

            setIsLoading(false)
            console.log(error)
            toast.error(error.message)
            
        }

    }

  return (
    <div className='profile --my2'>
        { isLoading && <Loading /> }

        <Card className={'card --flex-dir-column'}>
          <span className="profile-photo">
            <img src={profile?.photo} alt='profile image' />
            </span>  
            <form onSubmit={handleSubmit} className="--form-control --m">
            <span className="profile-data">
                <p>
                    <label htmlFor="name">Name: </label>
                    <input type="text" onChange={handleChange} name="name" value={profile?.name} />
                </p>

                <p>
                    <label htmlFor="email">Email: </label>
                    <input type="email" name="email" value={profile?.email} disabled />
                   
                </p>

                <p>
                    
                    <textarea name="bio" value={profile?.bio} onChange={handleChange} cols="30" rows="10"></textarea>
                    
                </p>

                <p>
                    <label htmlFor="profile photo">Profile Photo: </label>
                    <input type="file" name="image" onChange={handleImageChange} />
                </p>

                <div className='edit-button'>
                <button className='--btn --btn-primary'>Edit Profile</button>
                </div>
            </span>
            </form>
        </Card>

        <br/>

        <ChangePassword />
    </div>
  )
}
export default EditProfile
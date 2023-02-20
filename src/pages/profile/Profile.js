import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRedirect } from '../../customHook/useRedirect';
import { userProfile } from '../../services/authService';
import { SET_USER, SET_NAME } from '../../redux/slices/authSlice';
import './Profile.scss';
import Loading from '../../components/loading/Loading';
import Card from '../../components/card/Card';
import { Link } from 'react-router-dom';

const Profile = () => {

  useRedirect('/login')

  const dispatch = useDispatch()

  const [profile, setProfile] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

   setIsLoading(true)

   async function loadProfile() {

    const data = await userProfile()
    console.log(data);

    setProfile(data)
    setIsLoading(false)
    await dispatch(SET_USER(data))
    await dispatch(SET_NAME(data.name))
   }

   loadProfile()
  }, [dispatch])
  return (
    <div className='profile --my-2'>
      {isLoading && <Loading />}

      <>
      {!isLoading && profile === null ? (

        <p>There is no user to display</p>
      ) : (

        <Card cardClass={'card --flex-dir-column'}>
          <span className="profile-photo">
            <img src={profile?.photo} alt='profile picture' />
          </span>

          <span className="profile-data">
            <p>
              <b>Name: </b> {profile?.name}
            </p>

            <p>
              <b>Email: </b> {profile?.email}
            </p>

            <p>
              <b>Bio: </b> {profile?.bio}
            </p>

            <div className='edit-button'>
              <Link to='/edit-profile'>
                <button className="--btn --btn-primary">Edit Profile</button>
              </Link>
            </div>
          </span>
        </Card>
      )}
      </>
    </div>
  )
}
export default Profile
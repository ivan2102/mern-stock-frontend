import loaderImg from '../../assests/images/loader.gif';
import  ReactDOM  from 'react-dom';
import './Loading.scss';

const Loading = () => {
  
return ReactDOM.createPortal(

    <div className="wrapper">
        <div className="loading">
            <img src={loaderImg} alt="Loading..." />
        </div>
    </div>,

    document.getElementById('loading')
)
    
}

export const spinnerImg = () => {

    return(
        <div className="--center-all">
            <img src={loaderImg} alt="Loading..." />
        </div>
    )
}

export default Loading
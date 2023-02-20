import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../redux/slices/authSlice";

export const ShowLoggedIn = ({ children }) => {

    const isLoggedIn = useSelector(selectIsLoggedIn);

    if(isLoggedIn) {

        return <> {children} </>

    }else {

        return null
    }
}

export const ShowLoggedOut = ({ children }) => {

    const isLoggedIn = useSelector(selectIsLoggedIn)

    if(!isLoggedIn) {

        return <> {children} </>
        

    }else {

        return null
    }
}
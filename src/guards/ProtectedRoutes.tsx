import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext";


const ProtectedRoutes = ({ children }: { children: React.ReactNode }) => {

    const {isAuth} = useAuth()

    return <>{isAuth ? children : <Navigate to = "/login" />}</>

};

export default ProtectedRoutes;
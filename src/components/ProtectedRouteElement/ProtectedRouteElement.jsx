import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRouteElement = ({ onlyUnAuth = false, component }) => {

    const email = useSelector((store) => store.regNewUser.email);
    const location = useLocation();

    if (onlyUnAuth && email) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !email) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return component;
};

export const OnlyAuth = ProtectedRouteElement;
export const OnlyUnAuth = ({ component }) => (
    <ProtectedRouteElement onlyUnAuth={true} component={component} />
);

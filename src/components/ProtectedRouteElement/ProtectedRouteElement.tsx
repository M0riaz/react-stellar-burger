import { Navigate, useLocation } from "react-router-dom";
import {useSelector} from "../../services/store/typesStore";

interface IC {
    onlyUnAuth: boolean
    component: JSX.Element
}
interface IComponent {
    component: JSX.Element
}

const ProtectedRouteElement = ({ onlyUnAuth = false, component  }: IC) :JSX.Element => {
    // @ts-ignore
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

export const OnlyAuth = ({component}: IComponent): JSX.Element =>
    (<ProtectedRouteElement onlyUnAuth={false} component={component}/>);
export const OnlyUnAuth = ({ component }: IComponent) => (
    <ProtectedRouteElement onlyUnAuth={true} component={component} />
);
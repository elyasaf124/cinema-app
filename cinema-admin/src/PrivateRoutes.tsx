import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  let status = useSelector((state: any) => state.isLoggedIn);

  return status != true ? <Navigate to="/login" /> : <Outlet />;
};

export default PrivateRoutes;

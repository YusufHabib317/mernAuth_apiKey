import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

const Private = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  return userInfo ? children : <Navigate to="/auth" replace={true} />;
};

export default Private;

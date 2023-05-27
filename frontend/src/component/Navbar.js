//impot

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { logout } from "../features/slices/authSlice";
import { toast } from "react-toastify";
import { useLogoutMutation } from "../features/slices/userApiSlice";

// function
const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/auth");
    } catch (err) {
      toast(err.data.message || err.error);
    }
  };

  return (
    <div className="w-full  bg-slate-600">
      <nav className=" flex flex-row justify-between items-center p-3 w-[90%] mx-auto">
        <h2 className="font-bold text-white text-lg cursor-pointer">
          Hello {userInfo ? userInfo.name : ""}
        </h2>

        <div className="flex flex-col sm:flex-row space-x-4">
          {userInfo ? (
            <>
              <button className="p-1 rounded-lg bg-blue-400 hover:bg-slate-700 text-white">
                <Link to={"/profile"}> Profile</Link>
              </button>
              <button className="p-1 rounded-lg  hover:bg-slate-700 text-white">
                <Link to={"/logout"} onClick={logoutHandler}>
                  Logout
                </Link>
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

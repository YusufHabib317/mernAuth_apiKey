import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AiOutlineCheck } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import FormContainer from "../../component/FormContainer";
import { setCrendials } from "../../features/slices/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../features/slices/userApiSlice";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  // regex
  const Email_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

  //valid email state
  const [validEmail, setValidEmail] = useState(false);

  // user date
  const initState = {
    email: "",
    password: "",
  };

  const [userData, setuserData] = useState(initState);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    setValidEmail(Email_REGEX.test(userData.email));
  }, [userData.email]);

  // API Slice

  const [login] = useLoginMutation();

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);
  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login({
        email: userData.email,
        password: userData.password,
      }).unwrap();
      dispatch(setCrendials({ ...res }));
      navigate("/");
    } catch (err) {
      toast(err.data.message || err.error);
    }
  };
  //content render
  let content = (
    <>
      <div className="w-full mt-11">
        <form
          className="flex flex-col justify-center items-center w-full  h-full p-6"
          onSubmit={handleSubmit}
        >
          <h2 className="text-[2.5rem] font-bold">Sign In</h2>

          <label htmlFor="email" className="relative w-full sm:w-[75%] mt-8">
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              placeholder="Email"
              className="w-full border-gray-500 border p-3 outline-none rounded-lg 	"
              onChange={handleChange}
            />
            {validEmail ? (
              <AiOutlineCheck className="absolute bottom-14 right-0 text-green-500 font-bold text-[1.5rem]" />
            ) : (
              <FaTimes className="absolute bottom-14 right-0 text-red-500 font-bold text-[1.5rem]" />
            )}
          </label>

          <label htmlFor="password" className="w-full sm:w-[75%] mt-8">
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              placeholder="password"
              className="w-full  border-gray-500 border p-3 outline-none rounded-lg  "
              onChange={handleChange}
            />
          </label>
          <button
            className="bg-blue-500 text-white px-5 py-1 rounded-lg text-[1.1rem] disabled:bg-slate-400 mt-5"
            disabled={!userData.email || !userData.password || !validEmail}
          >
            Log in
          </button>
        </form>
        <p className="mt-5 text-[0.8rem] underline px-6 cursor-pointer  hover:text-blue-500">
          <Link to="/register"> Do not have an account? register now</Link>
        </p>
      </div>
    </>
  );
  return <FormContainer>{content}</FormContainer>;
};

export default SignIn;

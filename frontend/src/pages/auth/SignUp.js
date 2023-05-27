import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { AiOutlineCheck } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import FormContainer from "../../component/FormContainer";
import { setCrendials } from "../../features/slices/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../features/slices/userApiSlice";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  // regex
  const Email_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

  //valid email state
  const [validEmail, setValidEmail] = useState(false);

  //valid password state
  const [validPwd, setValidPwd] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");

  const [validMatch, setValidMatch] = useState(false);

  const [emailFocus, setEmailFocus] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  // user date
  const initState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [userData, setuserData] = useState(initState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setuserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    setValidEmail(Email_REGEX.test(userData.email));
  }, [userData.email]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(userData.password));
    setValidMatch(userData.password === matchPwd);
  }, [userData.password, matchPwd]);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  //handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await register({
        name: userData.name,
        email: userData.email,
        password: userData.password,
      }).unwrap();
      dispatch(setCrendials({ ...res }));
      navigate("/");
    } catch (error) {
      toast(error.data.message || error.error);
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
          <h2 className="text-[2.5rem] font-bold">Sign Up</h2>

          <label htmlFor="email" className="relative w-full sm:w-[75%] mt-8">
            <input
              type="name"
              name="name"
              id="name"
              value={userData.name}
              placeholder="your name"
              className="w-full border-gray-500 border p-3 outline-none rounded-lg 	"
              onChange={handleChange}
            />
          </label>

          <label htmlFor="email" className="relative w-full sm:w-[75%] mt-8">
            <input
              type="email"
              name="email"
              id="email"
              value={userData.email}
              placeholder="Email"
              className="w-full border-gray-500 border p-3 outline-none rounded-lg 	"
              onChange={handleChange}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
            {validEmail ? (
              <AiOutlineCheck className="absolute bottom-14 right-0 text-green-500 font-bold text-[1rem]" />
            ) : (
              <FaTimes className="absolute bottom-14 right-0 text-red-500 font-bold text-[1rem]" />
            )}
          </label>

          {emailFocus && userData.email && !validEmail ? (
            <p className=" bg-slate-100  rounded-lg p-2 text-[0.85rem] font-[500] mt-3">
              email must be formatted correctly
            </p>
          ) : (
            <></>
          )}

          <label htmlFor="password" className="relative w-full sm:w-[75%] mt-8">
            <input
              type="password"
              name="password"
              id="password"
              value={userData.password}
              placeholder="password"
              className="w-full  border-gray-500 border p-3 outline-none rounded-lg  "
              onChange={handleChange}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            {validPwd ? (
              <AiOutlineCheck className="absolute bottom-14 right-0 text-green-500 font-bold text-[1rem]" />
            ) : (
              <FaTimes className="absolute bottom-14 right-0 text-red-500 font-bold text-[1rem]" />
            )}
          </label>
          {pwdFocus && userData.password && !validPwd ? (
            <p className="w-[90%] bg-slate-100  rounded-lg p-2 text-[0.85rem] font-[500] mt-3">
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!</span>{" "}
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>{" "}
              <span aria-label="percent">%</span>
            </p>
          ) : (
            <></>
          )}
          <label htmlFor="password" className="relative w-full sm:w-[75%] mt-8">
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={matchPwd}
              placeholder="confirm password"
              className="w-full  border-gray-500 border p-3 outline-none rounded-lg  "
              onChange={(e) => setMatchPwd(e.target.value)}
            />
            {validMatch && matchPwd ? (
              <AiOutlineCheck className="absolute bottom-14 right-0 text-green-500 font-bold text-[1rem]" />
            ) : (
              <FaTimes className="absolute bottom-14 right-0 text-red-500 font-bold text-[1rem]" />
            )}
          </label>

          <button
            className="bg-blue-500 text-white px-5 py-1 rounded-lg text-[1.1rem] disabled:bg-slate-400 mt-5"
            disabled={
              !userData.email ||
              !userData.password ||
              !validEmail ||
              !validPwd ||
              !validMatch
            }
          >
            Sign Up
          </button>
        </form>
        <p className="mt-5 text-[0.8rem] underline px-6 cursor-pointer  hover:text-blue-500">
          <Link to="/auth"> Do you have an account? Log IN</Link>
        </p>
      </div>
    </>
  );
  return <FormContainer>{content}</FormContainer>;
};
export default SignUp;

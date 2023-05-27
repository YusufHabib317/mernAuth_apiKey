import "react-toastify/dist/ReactToastify.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomeLayout from "./pages/home/HomeLayout";
import Index from "./pages/home/Index";
import Private from "./component/Private";
import Profile from "./pages/profile/Profile";
import { Provider } from "react-redux";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import { ToastContainer } from "react-toastify";
import store from "./features/store/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true,
        element: (
          <Private>
            <Index />
          </Private>
        ),
      },
    ],
  },
  {
    path: "/register",
    element: <SignUp />,
  },
  {
    path: "/auth",
    element: <SignIn />,
  },
  {
    path: "/profile",
    element: (
      <Private>
        <Profile />
      </Private>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;

import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";

const Home = lazy(() => import("../App"));
const User = lazy(() => import("../pages/User"));
const Setting = lazy(() => import("../pages/Setting"));
const Schedule = lazy(() => import("../pages/Schedule"));
const Profile = lazy(() => import("../pages/Profile"));
const Login = lazy(() => import("../pages/Login"));
const UserForm = lazy(() => import("../components/Form/userForm"));
const DestForm = lazy(() => import("../components/Form/destForm"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Booking = lazy(() => import("../pages/Booking"));
const VeiwBooking = lazy(() => import("../pages/VeiwBooking"));
const AddBooking = lazy(() => import("../pages/addBooking"));
const VeiwAllBooking = lazy(() => import("../pages/VeiwAllBooking"));
const ExcelToTable = lazy(() => import("../components/customTable/ExcelToTable"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/user",
        element: <User />,
    },
    {
        path: "/setting",
        element: <Setting />,
    },
    {
        path: "/booking",
        element: <Booking />,
    },
    {
        path: "/schedule",
        element: <Schedule />,
    },
    {
        path: "/profile",
        element: <Profile />,
    },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "/userForm",
        element: <UserForm />,
    },
    {
        path: "/destForm",
        element: <DestForm />,
    },
    {
        path: "/dashboard",
        element: <Dashboard />,
    },
    {
        path: "/viewBooking",
        element: <VeiwBooking />,
    },
    {
        path: "/addBooking",
        element: <AddBooking />,
    },
    {
        path: "/viewAllBooking",
        element: <VeiwAllBooking />,
    },
    {
        path: "/excelToTable",
        element: <ExcelToTable />,
    }
]);

export default router;
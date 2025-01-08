import { createBrowserRouter, Navigate } from "react-router-dom";
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
const NotFound = lazy(() => import("../errorPages/NotFound.jsx"));

// ProtectedRoute component
const ProtectedRoute = ({ element }) => {
    // Check if the token is present in cookies
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

    // Redirect to login if no token
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    // Render the element if authenticated
    return element;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute element={<Home />} />,
    },
    {
        path: "/user",
        element: <ProtectedRoute element={<User />} />,
    },
    {
        path: "/setting",
        element: <ProtectedRoute element={<Setting />} />,
    },
    {
        path: "/booking",
        element: <ProtectedRoute element={<Booking />} />,
    },
    {
        path: "/schedule",
        element: <ProtectedRoute element={<Schedule />} />,
    },
    {
        path: "/profile",
        element: <ProtectedRoute element={<Profile />} />,
    },
    {
        path: "/dashboard",
        element: <ProtectedRoute element={<Dashboard />} />,
    },
    {
        path: "/viewBooking",
        element: <ProtectedRoute element={<VeiwBooking />} />,
    },
    {
        path: "/addBooking",
        element: <ProtectedRoute element={<AddBooking />} />,
    },
    {
        path: "/viewAllBooking",
        element: <ProtectedRoute element={<VeiwAllBooking />} />,
    },
    {
        path: "/excelToTable",
        element: <ProtectedRoute element={<ExcelToTable />} />,
    },
    {
        path: "/userForm",
        element: <ProtectedRoute element={<UserForm />} />,
    },
    {
        path: "/destForm",
        element: <ProtectedRoute element={<DestForm />} />,
    },
    // Public routes
    // {
    //     path: "/userForm",
    //     element: <UserForm />,
    // },
    {
        path: "/login",
        element: <Login />,
    },
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;
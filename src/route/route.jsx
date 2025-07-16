import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/shared/ErrorPage";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../provider/PrivateRoute";
import Profile from "../pages/Dashboard/Profile";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import CreateDonationRequest from "../pages/Dashboard/CreateDonationRequest";
import DonorDashboard from "../pages/Dashboard/DonorDashboard";
import MyDonationRequests from "../pages/Dashboard/MyDonationRequests";
import DonationRequestDetails from "../pages/Dashboard/DonationRequestDetails";
import EditDonationRequest from "../pages/Dashboard/EditDonationRequest";
import Forbidden from "../pages/shared/Forbidden";
import DonorRoute from "../provider/DonorRoute";
import AdminRoute from "../provider/AdminRoute";
import AllUsersPage from "../pages/Dashboard/AllUsersPage";
import AllBloodDonationPage from "../pages/Dashboard/AllBloodDonationPage";
import AdminEditDonationRequest from "../pages/Dashboard/AdminEditDonationRequest";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: '/',
                element: <Home></Home>,
                // loader: () => fetch('https://btobridge-server.vercel.app/publicAllProducts'),
                // hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: "/login",
                element: <Login></Login>,
            },
            {
                path: "/register",
                element: <Register></Register>,
            },
            {
                path: '/forbidden',
                element: <Forbidden></Forbidden>,
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute>
            <DashboardLayout></DashboardLayout>
        </PrivateRoute>,

        children: [
            {
                index: true,
                element: <DashboardHome></DashboardHome>
                // element: <DonorDashboard></DonorDashboard>
            },
            {
                path: 'profile',
                element: <Profile></Profile>
            },
            {
                path: 'my-donation-requests',
                element: <DonorRoute><MyDonationRequests></MyDonationRequests></DonorRoute>, 
            },
            {
                path:'create-donation-request',
                element: <DonorRoute><CreateDonationRequest></CreateDonationRequest></DonorRoute>,
                // loader: () => fetch('http://localhost:3000/allUsers'),
                // hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: 'donation-details/:id',
                element: <DonorRoute><DonationRequestDetails></DonationRequestDetails></DonorRoute>,
            },
            {
                path: 'edit-donation-request/:id',
                element: <DonorRoute><EditDonationRequest></EditDonationRequest></DonorRoute>,
            },
            {
                path: 'all-users',
                element: <AdminRoute><AllUsersPage></AllUsersPage></AdminRoute>,
            },
            {
                path: 'all-blood-donation-request',
                element: <AdminRoute><AllBloodDonationPage></AllBloodDonationPage></AdminRoute>,
            },
            {
                path: 'admin-edit-donation/:id',
                element: <AdminRoute><AdminEditDonationRequest></AdminEditDonationRequest></AdminRoute>,
            },
            // {
            //     path: ''
            // },


            
        ]
    },
    // {
    //     path:"/*",
    //     element: <Error></Error>,
    // },
]);

export default router;
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
                path:'create-donation-request',
                element: <CreateDonationRequest></CreateDonationRequest>,
                // loader: () => fetch('http://localhost:3000/allUsers'),
                // hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: 'my-donation-requests',
                element: <MyDonationRequests></MyDonationRequests>
            },
            {
                path: 'donation-details/:id',
                element: <DonationRequestDetails></DonationRequestDetails>
            },
            {
                path: 'edit-donation-request/:id',
                element: <EditDonationRequest></EditDonationRequest>
            },


            
        ]
    },
    // {
    //     path:"/*",
    //     element: <Error></Error>,
    // },
]);

export default router;
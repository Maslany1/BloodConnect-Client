import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/home/Home";
import ErrorPage from "../pages/shared/ErrorPage";

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
                element: <h1>login</h1>,
            },
            {
                path: "/register",
                element: <h1>register</h1>,
            }
        ]
    },
    // {
    //     path:"/*",
    //     element: <Error></Error>,
    // },
]);

export default router;
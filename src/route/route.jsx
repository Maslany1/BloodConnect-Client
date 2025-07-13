import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Root></Root>,
        // errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                index: true,
                path: '/',
                element: <h1>home</h1>,
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
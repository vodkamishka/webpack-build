import { createRoot } from 'react-dom/client';
import App from "./components/App";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {About, Shop} from "@/pages";
import {Suspense} from "react";

const rootElement = document.getElementById('root');

if (rootElement) {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <App/>,
            children: [
                {
                    path: '/about',
                    element: <Suspense fallback={'Loading...'}><About/></Suspense>
                },
                {
                    path: '/shop',
                    element: <Suspense fallback={'Loading...'}><Shop/></Suspense>
                }
            ]
        },
    ]);


    const root = createRoot(rootElement);
    root.render(<RouterProvider router={router} />);

} else {
    console.error('Root element not found');
}
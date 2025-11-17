import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";

import { CircularProgress } from "@mui/material";

import App from "../App";

import RedirectRoute from "./redirectRoute";
import ProtectedRoute from "./protectedRoute";

const Landing = lazy(() => import("../modules/landing/main"));
const Client = lazy(() => import("../modules/client/main"));
const Login = lazy(() => import("../modules/landing/Pages/Login"));
const Register = lazy(() => import("../modules/landing/Pages/Register"));

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <RedirectRoute />,
            },
            {
                path: "Home",
                element: (
                    <Suspense fallback={
                        <div className="flex h-screen items-center justify-center">
                            <CircularProgress size={60} sx={{ color: '#14B8A6' }} />
                        </div>
                    }>
                        <Landing />
                    </Suspense>
                ),
            },
            {
                path: "Login",
                element: (
                    <Suspense fallback={
                        <div className="flex h-screen items-center justify-center bg-slate-900">
                            <CircularProgress size={60} sx={{ color: '#14B8A6' }} />
                        </div>
                    }>
                        <Login />
                    </Suspense>
                ),
            },
            {
                path: "Register",
                element: (
                    <Suspense fallback={
                        <div className="flex h-screen items-center justify-center bg-slate-900">
                            <CircularProgress size={60} sx={{ color: '#14B8A6' }} />
                        </div>
                    }>
                        <Register />
                    </Suspense>
                ),
            },
            {
                path: "Dashboard",
                element: (
                    <ProtectedRoute>
                        <Suspense fallback={    
                            <div className="flex h-screen items-center justify-center">
                                <CircularProgress size={60} sx={{ color: '#14B8A6' }} />
                            </div>
                        }>
                            <Client />
                        </Suspense>
                    </ProtectedRoute>
                )
            }
        ]
    }
]);

export default router;


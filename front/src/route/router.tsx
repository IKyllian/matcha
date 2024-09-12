import Profile from "front/components/profile/profile";
import Sign from "front/components/sign/sign";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Sign />
    },
    {
        path: "/profile",
        element: <Profile />
    }
])
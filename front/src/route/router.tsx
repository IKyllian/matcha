import Profile from "front/components/profile/profile";
import Register from "front/components/sign/register";
import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import ChatScreen from "front/components/chat/chatScreen";
import Home from "front/components/home/home";
import Settings from "front/components/settings/settings";
import Login from "front/components/sign/login";
import NotificationScreen from "front/components/notifications/notificationScreen";
import ViewScreen from "front/components/views/viewScreen";
import PublicRoute from "front/route/publicRoute";
import ActivateAccount from "front/components/sign/activateAccount";
import ResetPasswordForm from "front/components/sign/resetPasswordForm";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PrivateRoute>
                <Home />
            </PrivateRoute>
        )
    },
    {
        path: "/register",
        element: (
            <PublicRoute>
                <Register />
            </PublicRoute>
        )
    },
    {
        path: "/login",
        element: (
            <PublicRoute>
                <Login />
            </PublicRoute>
        )
    },
    ...["/profile", "/profile/:userId"].map(path => ({
        path,
        element: (
            <PrivateRoute>
                <Profile />
            </PrivateRoute>
        )

    })),
    {
        path: "/settings",
        element: (
            <PrivateRoute>
                <Settings />
            </PrivateRoute>
        )
    },
    ...["/chat", "/chat/:chatId"].map(path => ({
        path,
        element: (
            <PrivateRoute>
                <ChatScreen />
            </PrivateRoute>
        )
    })),
    {
        path: '/notifications',
        element: (
            <PrivateRoute>
                <NotificationScreen />
            </PrivateRoute>
        )
    },
    {
        path: '/vues',
        element: (
            <PrivateRoute>
                <ViewScreen />
            </PrivateRoute>
        )
    },
    {
        path: '/activateAccount/:url_identifier',
        element: (
            <PublicRoute>
                <ActivateAccount />
            </PublicRoute>
        )
    },
    {
        path: '/resetPassword/:url_identifier',
        element: (
            <PublicRoute>
                <ResetPasswordForm />
            </PublicRoute>
        )
    }
])
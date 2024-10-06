import Profile from "front/components/profile/profile";
import Sign from "front/components/sign/sign";
import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./publicRoute";
import ChatScreen from "front/components/chat/chatScreen";
import Home from "front/components/home/home";

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <PublicRoute>
                <Home />
            </PublicRoute>
        )
    },
    {
        path: "/sign",
        element: <Sign />
    },
    ...["/profile", "/profile/:userId"].map(path => ({
        path,
        element: (
            <PublicRoute>
                <Profile />
            </PublicRoute>
        )

    })),
    ...["/chat", "/chat/:chatId"].map(path => ({
        path,
        element: (
            <PublicRoute>
                <ChatScreen />
            </PublicRoute>
        )

    }))
])
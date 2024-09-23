import Profile from "front/components/profile/profile";
import Sign from "front/components/sign/sign";
import { createBrowserRouter } from "react-router-dom";
import PublicRoute from "./publicRoute";
import ChatScreen from "front/components/chat/chatScreen";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Sign />
    },
    {
        path: "/profile",
        element: (
            <PublicRoute>
                <Profile />
            </PublicRoute>)
    },
    ...["/chat", "/chat/:chatId"].map(path => ({

        path,
        element: (
            <PublicRoute>
                <ChatScreen />
            </PublicRoute>
        )

    }))
])
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@pages/login";
import { UsersPage } from "@pages/users";
import { tokenStorage } from "@shared/lib/tokenStorage.ts";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
    const isAuthorized = Boolean(tokenStorage.getAccessToken());
    return isAuthorized ? children : <Navigate to="/login" replace />;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <UsersPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};


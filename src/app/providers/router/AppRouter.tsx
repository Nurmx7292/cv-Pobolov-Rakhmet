import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@pages/login";
import { SignupPage } from "@pages/signup";
import { UsersPage } from "@pages/users";
import { MainLayout } from "@widgets/layout";
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
                <Route path="/signup" element={<SignupPage />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <UsersPage />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};


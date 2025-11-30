import {BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import { LoginPage } from "@pages/login";
import { SignupPage } from "@pages/signup";
import { UsersPage } from "@pages/users";
import { UserSkillsPage } from "@pages/user-skills";
import { MainLayout } from "@widgets/layout";
import { tokenStorage } from "@shared/lib/tokenStorage.ts";
import UserProfile from "@widgets/users/ui/UserProfile/UserProfile";
import AuthToggle from "@features/auth/authToggle/AuthToggle.tsx";

const PrivateRoute = ({children}: { children: JSX.Element }) => {
    const isAuthorized = Boolean(tokenStorage.getAccessToken());
    return isAuthorized ? children : <Navigate to="/auth/login" replace/>;
};

const AuthToggleWrapper = () => {
    const location = useLocation();
    const showAuthToggle = location.pathname === "/auth/login" || location.pathname === "/auth/signup";
    return showAuthToggle ? <AuthToggle /> : null;
};

export const AppRouter = () => {
    return (
        <>

        <BrowserRouter>
            <AuthToggleWrapper/>
            <Routes>
                <Route path="/" element={<Navigate to="/users" replace/>}/>
                <Route path="/auth/login" element={<LoginPage/>}/>
                <Route path="/auth/signup" element={<SignupPage/>}/>
                <Route
                    path="/users"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <UsersPage/>
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users/:userId"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <UserProfile/>
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/users/:userId/skills"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <UserSkillsPage />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
        </>
    );
};


import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "@pages/login";
import { SignupPage } from "@pages/signup";
import { UsersPage } from "@pages/users";
import { UserLanguagesPage } from "@pages/user-languages";
import { MainLayout } from "@widgets/layout";
import { tokenStorage } from "@shared/lib/tokenStorage.ts";
import UserProfile from "@widgets/users/ui/UserProfile/UserProfile";

const PrivateRoute = ({children}: { children: React.JSX.Element }) => {
    const isAuthorized = Boolean(tokenStorage.getAccessToken());
    return isAuthorized ? children : <Navigate to="/auth/login" replace/>;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
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
                    path="/users/:userId/languages"
                    element={
                        <PrivateRoute>
                            <MainLayout>
                                <UserLanguagesPage />
                            </MainLayout>
                        </PrivateRoute>
                    }
                />
            </Routes>
        </BrowserRouter>
    );
};


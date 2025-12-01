import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation} from "react-router-dom";
import { LoginPage } from "@pages/login";
import { SignupPage } from "@pages/signup";
import { ForgotPasswordPage } from "@pages/forgotPassword";
import { ResetPasswordPage } from "@pages/resetPassword";
import { UsersPage } from "@pages/users";
import { UserLanguagesPage } from "@pages/user-languages";
import { CvsPage } from "@pages/cvs";
import { CvDetailsPage } from "@pages/cvs/ui/CvDetailsPage/CvDetailsPage";
import { CvSkillsPage } from "@pages/cvs/ui/CvSkillsPage/CvSkillsPage";
import { CvProjectsPage } from "@pages/cvs/ui/CvProjectsPage/CvProjectsPage";
import { CvPreviewPage } from "@pages/cvs/ui/CvPreviewPage/CvPreviewPage";
import { MainLayout } from "@widgets/layout";
import { tokenStorage } from "@shared/lib/tokenStorage.ts";
import UserProfile from "@widgets/users/ui/UserProfile/UserProfile";
import { UserSkillsPage } from "@pages/user-skills";
import { CvPageLayout } from "@widgets/cvs";
import AuthToggle from "@features/auth/authToggle/AuthToggle.tsx";
import styles from './AppRouter.module.css'
import UserProfileToggle from "@widgets/users/ui/UserProfile/UserProfileToggle.tsx";
import { matchPath } from "react-router-dom";

const PrivateRoute = ({children}: { children: React.JSX.Element }) => {
    const isAuthorized = Boolean(tokenStorage.getAccessToken());
    return isAuthorized ? children : <Navigate to="/auth/login" replace/>;
};

const AuthToggleWrapper = () => {
    const location = useLocation();
    const showAuthToggle = location.pathname === "/auth/login" || location.pathname === "/auth/signup" || location.pathname === "/forgot-password" || location.pathname === "/reset-password";
    return showAuthToggle ? <AuthToggle /> : null;
};

const UserProfileToggleWrapper = () => {
    const location = useLocation();

    const showProfileToggle =
        matchPath("/users/:id", location.pathname)  
        || matchPath("/users/:id/skills", location.pathname)
    || matchPath("/users/:id/languages", location.pathname);

    return showProfileToggle ? <UserProfileToggle /> : null;
}

export const AppRouter = () => {
    return (
        <div className={styles.wrapper}>

            <BrowserRouter>
                <AuthToggleWrapper/>
                <Routes>
                    <Route path="/" element={<Navigate to="/users" replace/>}/>
                    <Route path="/auth/login" element={<LoginPage/>}/>
                    <Route path="/auth/signup" element={<SignupPage/>}/>
                    <Route path="/forgot-password" element={<ForgotPasswordPage/>}/>
                    <Route path="/reset-password" element={<ResetPasswordPage/>}/>
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
                                    <UserProfileToggleWrapper/>
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
                                    <UserProfileToggleWrapper/>
                                    <UserLanguagesPage />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/users/:userId/skills"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <UserProfileToggleWrapper/>
                                    <UserSkillsPage />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/skills"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <UserSkillsPage />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/languages"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <UserLanguagesPage />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cvs"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <CvsPage />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/cvs/:cvId"
                        element={
                            <PrivateRoute>
                                <MainLayout>
                                    <CvPageLayout />
                                </MainLayout>
                            </PrivateRoute>
                        }
                    >
                        <Route index element={<Navigate to="details" replace />} />
                        <Route path="details" element={<CvDetailsPage />} />
                        <Route path="skills" element={<CvSkillsPage />} />
                        <Route path="projects" element={<CvProjectsPage />} />
                        <Route path="preview" element={<CvPreviewPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};
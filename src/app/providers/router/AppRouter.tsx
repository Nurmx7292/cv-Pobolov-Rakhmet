import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {LoginPage} from "@pages/login";
import {SignupPage} from "@pages/signup";
import {UsersPage} from "@pages/users";
import {tokenStorage} from "@shared/lib/tokenStorage.ts";
import UserProfile from "@widgets/users/ui/UserProfile/UserProfile";
import {MainLayout} from "@widgets/layout";

const PrivateRoute = ({children}: { children: JSX.Element }) => {
    const isAuthorized = Boolean(tokenStorage.getAccessToken());
    return isAuthorized ? children : <Navigate to="/login" replace/>;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/auth/login" replace/>}/>
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
            </Routes>
        </BrowserRouter>
    );
};


import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_MUTATION } from "../../api/signupMutation.ts";
import { tokenStorage } from "@shared/lib/tokenStorage.ts";
import styles from "./SignupForm.module.css";
import { Button, IconButton, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LOGIN_QUERY } from "@features/auth/login/api/loginQuery.ts";

interface SignupResponse {
    signup: {
        access_token: string;
        refresh_token: string;
    };
}

interface SignupVariables {
    email: string;
    password: string;
}

export const SignupForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState("");

    const [signup] = useMutation<SignupResponse, SignupVariables>(SIGNUP_MUTATION);
    const [login] = useLazyQuery(LOGIN_QUERY);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordError("");

        await signup({
            variables: { email, password },
        });

        const result = await login({
            variables: { email, password },
        });

        const tokens = result.data?.login;
        if (tokens) {
            tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
        }

        if (tokens?.user?.id) {
            localStorage.setItem("currentUserId", tokens.user.id);
            navigate(`/users/${tokens.user.id}`);
        }
    };

    const handleOnAccountExistsClick = () => {
        navigate("/");
    };

    return (
        <div className={styles.login}>
            <div className={styles.wrapper}>
                <div>Register now</div>
                <div>Welcome! Sign up to continue</div>

                <div>
                    <TextField
                        className={styles.input}
                        label="Email"
                        variant="outlined"
                        value={email}
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={isFocusedEmail ? "example@gmail.com" : ""}
                        InputLabelProps={{ shrink: email !== "" || isFocusedEmail }}
                        onFocus={() => setIsFocusedEmail(true)}
                        onBlur={() => setIsFocusedEmail(false)}
                    />
                </div>

                <div>
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder={isFocusedPassword ? "Enter your password" : ""}
                        InputLabelProps={{ shrink: password !== "" || isFocusedPassword }}
                        onFocus={() => setIsFocusedPassword(true)}
                        onBlur={() => setIsFocusedPassword(false)}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                </div>

                <div>
                    <Button variant="contained" onClick={handleSubmit}>
                        CREATE ACCOUNT
                    </Button>
                </div>

                <div>
                    <Button
                        variant="contained"
                        onClick={handleOnAccountExistsClick}
                        sx={{
                            backgroundColor: "#353535",
                            boxShadow: "none",
                            "&:hover": {
                                backgroundColor: "#3A3A3A",
                                boxShadow: "none",
                            },
                        }}
                    >
                        I HAVE AN ACCOUNT
                    </Button>
                </div>
            </div>
        </div>
    );
};

import React, {useState} from "react";
import {useLazyQuery} from "@apollo/client/react";
import {useNavigate} from "react-router-dom";
import {LOGIN_QUERY} from "../../api/loginQuery.ts";
import {tokenStorage} from "@shared/lib/tokenStorage.ts";
import styles from "./LoginForm.module.css";
import TextField from "@mui/material/TextField";
import {Button, InputAdornment, IconButton} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface LoginResponse {
    login: {
        access_token: string;
        refresh_token: string;
    };
}

interface LoginVariables {
    email: string;
    password: string;
}

export const LoginForm = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [login, {loading, error}] = useLazyQuery<LoginResponse, LoginVariables>(LOGIN_QUERY);

    const togglePasswordVisibility = () => {
        setShowPassword(prev => !prev);
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await login({
            variables: {
                email,
                password,
            },
        });
        const tokens = result.data?.login;
        if (tokens) {
            tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
            navigate("/");
        }
        if (tokens.user.id) {
            localStorage.setItem('currentUserId', tokens.user.id);
        }
        navigate(`/users/${tokens.user.id}`);
    };



    return (
        <div className={styles.login}>

            <div className={styles.wrapper}>
            <h4>
                Welcome back
            </h4>
            <h4>
                Hello again! Log in to continue
            </h4>

            <div>
                <TextField
                    className={styles.input}
                    label="Email"
                    variant="outlined"
                    value={email}
                    type="text"
                    onChange={e => setEmail(e.target.value)}
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
                    onChange={e => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    placeholder={isFocusedPassword ? "Enter your password" : ""}
                    InputLabelProps={{ shrink: password !== "" || isFocusedPassword }}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                />
            </div>
            <div><Button variant="contained" onClick={handleSubmit}>LOG IN</Button></div>
            <div><Button variant="contained"    sx={{
                backgroundColor: "#353535",   // цвет кнопки
                boxShadow: "none",            // убираем тень
                "&:hover": {
                    backgroundColor: "#3A3A3A",
                    boxShadow: "none",          // убираем тень при наведении
                },
            }}>FORGOT PASSWORD</Button></div>
            </div>
        </div>

    );
};


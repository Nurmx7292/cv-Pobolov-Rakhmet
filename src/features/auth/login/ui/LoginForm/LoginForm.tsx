import React, {useState} from "react";
import {useLazyQuery} from "@apollo/client/react";
import {useNavigate, Link} from "react-router-dom";
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
        <div className={styles.container}><p className={styles.text1}>
            Welcome back
        </p>
            <p className={styles.text2}>
                Hello again! Log in to continue
            </p>
            <form onSubmit={handleSubmit} className={styles.container}>
                <TextField
                    className={styles.input}
                    label="Email"
                    variant="outlined"
                    sx={{
                        width: 560,
                        height: 48,
                        "& .MuiInputBase-root": {
                            height: 48,
                        },
                        mt: "15px",
                    }}
                    value={email}
                    type="text"
                    onChange={e => setEmail(e.target.value)}
                    placeholder={isFocusedEmail ? "example@gmail.com" : ""}

                    InputLabelProps={{shrink: email !== "" || isFocusedEmail}}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                />

                <TextField
                    className={styles.input}
                    label="Password"
                    variant="outlined"
                    sx={{
                        width: 560,
                        height: 48,
                        "& .MuiInputBase-root": {
                            height: 48,
                        },
                        mt: "15px"
                    }}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={togglePasswordVisibility} edge="end">
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                    placeholder={isFocusedPassword ? "Enter your password" : ""}
                    InputLabelProps={{shrink: password !== "" || isFocusedPassword}}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                />


                <div>
                    <Button
                        variant="contained"
                        type="submit"
                        sx={{
                            width: 220,
                            height: 48,
                            mt: "60px",
                            fontWeight: "bold",
                        }}
                        onClick={handleSubmit}
                    >
                        LOG IN
                    </Button>
                </div>
            </form>

            <div>
                <Button
                    component={Link}
                    to="/forgot-password"
                    variant="contained"
                    sx={{
                        width: 220,
                        height: 48,
                        backgroundColor: "#353535",
                        color: "#767676",
                        boxShadow: "none",
                        "&:hover": {
                            backgroundColor: "#3A3A3A",
                            boxShadow: "none",
                        },
                    }}
                >
                    FORGOT PASSWORD
                </Button>
            </div>
        </div>

    );
};
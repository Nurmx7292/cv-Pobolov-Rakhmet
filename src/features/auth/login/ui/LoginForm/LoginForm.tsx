import { useState } from "react";
import { useLazyQuery } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { LOGIN_QUERY } from "../../api/loginMutation.ts";
import { tokenStorage } from "@shared/lib/tokenStorage.ts";
import styles from "./LoginForm.module.css";

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
    const [login, { loading, error }] = useLazyQuery<LoginResponse, LoginVariables>(LOGIN_QUERY);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = await login({
            variables: {
                email,
                password,
            },
        });

        const tokens = result.data?.login;

        console.log(result.data)//сохран
        if (tokens) {
            tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
            navigate("/");
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.title}>Sign in</div>
            <input
                className={styles.input}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />
            <input
                className={styles.input}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
            />
            {error && <div>{error.message}</div>}
            <button className={styles.button} type="submit" disabled={loading}>
                {loading ? "Signing in..." : "Sign in"}
            </button>
        </form>
    );
};


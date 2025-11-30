import {useState} from "react";
import {useLazyQuery} from "@apollo/client/react";
import {useNavigate} from "react-router-dom";
import {LOGIN_QUERY} from "../../api/loginQuery.ts";
import {tokenStorage} from "@shared/lib/tokenStorage.ts";
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
    const [login, {loading, error}] = useLazyQuery<LoginResponse, LoginVariables>(LOGIN_QUERY);

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
        <>

            <div>
                Welcome back
            </div>
            <div>
                Hello again! Log in to continue
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.title}>Log in</div>
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
                    {loading ? "logging in..." : "LOG IN"}
                </button>
                <button>FORGOT PASSWORD</button>
            </form>
        </>

    );
};


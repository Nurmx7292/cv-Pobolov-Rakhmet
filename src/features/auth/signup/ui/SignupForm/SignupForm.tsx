import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { SIGNUP_MUTATION } from "../../api/signupMutation.ts";
import { tokenStorage } from "@shared/lib/tokenStorage.ts";
import styles from "./SignupForm.module.css";

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
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [signup, { loading, error }] = useMutation<SignupResponse, SignupVariables>(SIGNUP_MUTATION);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setPasswordError("");

        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }

        const result = await signup({
            variables: {
                email,
                password,
            },
        });
        const tokens = result.data?.signup;
        if (tokens) {
            tokenStorage.setTokens(tokens.access_token, tokens.refresh_token);
            navigate("/");
        }
    };

    const handleLoginClick = ( ) => {
        navigate('/auth/login')
    }


    return (
        <>
            <button onClick={handleLoginClick}>LOG IN</button>
            <button>SIGN UP</button>
            <div>
                Register now
            </div>
            <div>
                Welcome! Sign up to continue
            </div>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.title}>Sign up</div>
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
                <input
                    className={styles.input}
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                />
                {passwordError && <div>{passwordError}</div>}
                {error && <div>{error.message}</div>}
                <button className={styles.button} type="submit" disabled={loading}>
                    {loading ? "Signing up..." : "CREATE ACCOUNT"}
                </button>
                <button onClick={handleLoginClick}>I HAVE AN ACCOUNT</button>
            </form>
        </>

    );
};


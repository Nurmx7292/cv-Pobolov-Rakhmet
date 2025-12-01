import React, {useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from './AuthToggle.module.css'


const AuthToggle = () => {
    const navigate = useNavigate();
    const [authValue, setAuthValue] = useState<'login' | 'signup'>('login');

    return (
        <div class={styles.container}>
            <Tabs
                value={authValue}
                onChange={(e, newValue) => {
                    setAuthValue(newValue);
                    if (newValue === 'signup') {
                        navigate('/auth/signup');
                    } else {
                        navigate('/auth/login');
                    }
                }}
                centered
                TabIndicatorProps={{
                    sx: {
                        backgroundColor: 'red',
                        height: 3,
                    },
                }}
            >
                <Tab label="LOG IN" value="login"     sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: 160,
                }}/>
                <Tab label="SIGN UP" value="signup"     sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: 160,
                }}/>
            </Tabs>
        </div>
    );
};

export default AuthToggle;
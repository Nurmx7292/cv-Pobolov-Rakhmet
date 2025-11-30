import React, {useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AuthToggle = () => {
    const navigate = useNavigate();
    const [authValue, setAuthValue] = useState<'login' | 'signup'>('login');

    return (
        <div>
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
                <Tab label="LOG IN" value="login" />
                <Tab label="SIGN UP" value="signup" />
            </Tabs>
        </div>
    );
};

export default AuthToggle;
import React, {useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";

const UserProfileToggle = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<'profile' | 'skills' | 'languages'>('profile');
    const {userId} = useParams<{ userId: string }>();

    return (
        <div> <Tabs
            value={view}
            onChange={(e, newValue) => {
                setView(newValue);
                if (newValue === 'profile') {
                    navigate(`/users/${userId}`);
                }
                if (newValue === 'skills') {
                    navigate(`/users/${userId}/skills`);
                }
                if (newValue === 'languages') {
                    navigate(`/users/${userId}/languages`);
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
            <Tab label="PROFILE" value="profile"     sx={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "none",
                width: 160,
            }}/>
            <Tab label="SKILLS" value="skills"     sx={{
                fontFamily: "Roboto, sans-serif",
                fontSize: "14px",
                fontWeight: "bold",
                textTransform: "none",
                width: 160,
            }}/>
            <Tab label="LANGUAGES" value="languages"     sx={{
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

export default UserProfileToggle;
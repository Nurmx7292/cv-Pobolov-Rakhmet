import React, {useState} from 'react';
import {Tab, Tabs} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {useParams} from "react-router-dom";
import styles from "./UserProfileToggle.module.css";
import {GET_USER_BY_ID_QUERY} from "@widgets/users/api/getUserByIdQuery";
import {useQuery} from "@apollo/client/react";

const UserProfileToggle = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<'profile' | 'skills' | 'languages'>('profile');
    const {userId} = useParams<{ userId: string }>();

    const {loading, error, data, refetch} = useQuery(GET_USER_BY_ID_QUERY, {
        variables: {id: userId},
        skip: !userId,
        notifyOnNetworkStatusChange: false
    });

    const user = data?.user;
    const email = user?.email;
    const profile = user?.profile;
    const firstName = profile?.first_name || '';
    const lastName = profile?.last_name || '';



    const userLabel = (firstName||lastName) ? `> ${firstName} ${lastName}`: `> ${email}`;

    const skillsLabel = view==='skills' ? " > Skills" : "";
    const languagesLabel = view==="languages" ? " > Languages" : "";

    return (
        <div className={styles.container}>
            <div className={styles.employeeText}>Employees {userLabel} {skillsLabel} {languagesLabel}</div>
            <Tabs
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
                <Tab label="PROFILE" value="profile" sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: 160,
                }}/>
                <Tab label="SKILLS" value="skills" sx={{
                    fontFamily: "Roboto, sans-serif",
                    fontSize: "14px",
                    fontWeight: "bold",
                    textTransform: "none",
                    width: 160,
                }}/>
                <Tab label="LANGUAGES" value="languages" sx={{
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
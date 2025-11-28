import React, {useEffect, useState} from 'react';
import styles from "./UserProfile.module.css";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client/react";
import {GET_USER_BY_ID_QUERY} from "@widgets/users/api/getUserByIdQuery";
import TextField from '@mui/material/TextField';

const UserProfile = () => {
    const [firstNameInputValue, setFirstNameInputValue] = useState('');
    const [lastNameInputValue, setLastNameInputValue] = useState('');

    const {userId} = useParams<{ userId: string }>();

    const {loading, error, data} = useQuery(GET_USER_BY_ID_QUERY, {
        variables: {id: userId},
        skip: !userId,
    });

    const user = data?.user;
    const profile = user?.profile;

    useEffect(() => {
        if (!user) return;

        setFirstNameInputValue(profile?.first_name || '');
        setLastNameInputValue(profile?.last_name || '');
    }, [user, profile]);

    if (loading) return <div>Загрузка профиля...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;
    if (!user) return <div>Пользователь не найден</div>;

    const created_at = user.created_at;
    const email = user.email;

    const date = new Date(+created_at);
    const memberSinceString = date.toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
    });

    return (
        <div className={styles.userProfile}>
            <div>{firstNameInputValue} {lastNameInputValue}</div>
            <div>{email}</div>
            <div>A member since {memberSinceString}</div>

            <TextField
                className={styles.input}
                label="First Name"
                variant="outlined"
                value={firstNameInputValue}
                onChange={e => setFirstNameInputValue(e.target.value)}
                InputLabelProps={{shrink: firstNameInputValue !== ''}}
            />

            <TextField
                className={styles.input}
                label="Last Name"
                variant="outlined"
                value={lastNameInputValue}
                onChange={e => setLastNameInputValue(e.target.value)}
                InputLabelProps={{shrink: lastNameInputValue !== ''}}
            />
        </div>
    );
};

export default UserProfile;

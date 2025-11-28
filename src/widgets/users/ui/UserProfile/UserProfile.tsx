import React from 'react';
import styles from "./UserProfile.module.css";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client/react";
import {GET_USER_BY_ID_QUERY} from "@widgets/users/api/getUserByIdQuery";

const UserProfile = () => {
    const {userId} = useParams<{ userId: string }>();

    const {loading, error, data} = useQuery(GET_USER_BY_ID_QUERY, {
        variables: {id: userId},
        skip: !userId,
    });

    if (loading) return <div>Загрузка профиля...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;
    if (!data?.user) return <div>Пользователь не найден</div>;

    const user = data.user;
    const profile = user.profile;

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
            <div>{profile?.first_name} {profile?.last_name}</div>
            <div>{email}</div>
            <div>A member since {memberSinceString}</div>
        </div>
    );
};

export default UserProfile;

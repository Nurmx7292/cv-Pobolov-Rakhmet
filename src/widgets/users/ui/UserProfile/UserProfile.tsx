import React, {useEffect, useState} from 'react';
import styles from "./UserProfile.module.css";
import {useParams} from "react-router-dom";
import {useQuery} from "@apollo/client/react";
import {GET_USER_BY_ID_QUERY} from "@widgets/users/api/getUserByIdQuery";
import TextField from '@mui/material/TextField';
import {GET_DEPARTMENTS_QUERY} from "@widgets/users/api/getDepartmentsQuery";
import {GET_POSITIONS_QUERY} from "@widgets/users/api/getPositionsQuery";
import {MenuItem} from '@mui/material';

const UserProfile = () => {
    const [firstNameInputValue, setFirstNameInputValue] = useState('');
    const [lastNameInputValue, setLastNameInputValue] = useState('');
    const [departmentInputValue, setDepartmentInputValue] = useState('');
    const [positionInputValue, setPositionInputValue] = useState('');

    const {userId} = useParams<{ userId: string }>();
    const currentUserId = localStorage.getItem('currentUserId');

    const {loading, error, data} = useQuery(GET_USER_BY_ID_QUERY, {
        variables: {id: userId},
        skip: !userId,
    });

    const {data: positionsData} = useQuery(GET_POSITIONS_QUERY);
    const {data: departmentsData} = useQuery(GET_DEPARTMENTS_QUERY);

    let positions = null;
    if (positionsData) {
        positions = positionsData.positions.map((position) => position.name);
        positions.unshift('No position');
    }

    let departments = null;
    if (departmentsData) {
        departments = departmentsData.departments.map((department) => department.name);
        departments.unshift('No department');
    }

    const user = data?.user;
    const profile = user?.profile;

    useEffect(() => {
        if (!user) return;

        setFirstNameInputValue(profile?.first_name || '');
        setLastNameInputValue(profile?.last_name || '');
        setDepartmentInputValue(user?.department_name || '');
        setPositionInputValue(user?.position_name || '');
    }, [user, profile]);

    if (loading) return <div>Загрузка профиля...</div>;
    if (error) return <div>Ошибка загрузки: {error.message}</div>;
    if (!user) return <div>Пользователь не найден</div>;

    let disableInputs = true;
    if (+currentUserId === +userId) {
        disableInputs = false;
    }

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
                value={firstNameInputValue}
                disabled={disableInputs}
                onChange={e => setFirstNameInputValue(e.target.value)}
            />

            <TextField
                className={styles.input}
                label="Last Name"
                value={lastNameInputValue}
                disabled={disableInputs}
                onChange={e => setLastNameInputValue(e.target.value)}
            />

            <TextField
                className={styles.input}
                label="Department"
                select
                value={departmentInputValue}
                disabled={disableInputs}
                onChange={e => setDepartmentInputValue(e.target.value)}
            >
                {departments?.map(department => (
                    <MenuItem key={department} value={department}>
                        {department}
                    </MenuItem>
                ))}
            </TextField>

            <TextField
                className={styles.input}
                label="Position"
                select
                value={positionInputValue}
                disabled={disableInputs}
                onChange={e => setPositionInputValue(e.target.value)}
            >
                {positions?.map(position => (
                    <MenuItem key={position} value={position}>
                        {position}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    );
};

export default UserProfile;

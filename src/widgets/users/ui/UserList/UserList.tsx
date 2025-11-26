import { UserCard, useUsersQuery } from "@entities/user";
import styles from './UserList.module.css';
import React, { useState } from "react";

export const UserList = () => {
    const { data, loading, error } = useUsersQuery();
    const [sortConfig, setSortConfig] = useState({
        key: 'department_name',
        direction: 'ascend'
    });

    if (loading) return <p>Loading users...</p>;
    if (error) return <p>Failed to load users: {error.message}</p>;

    const users = data.users.map(user=>{
        return {
            id: user.id,
            email: user.email ? user.email : "",
            role: user.role,
            department_name: user.department_name,
            position_name: user.position_name,
            first_name: user.profile.first_name ? user.profile.first_name : "",
            last_name: user.profile.last_name ? user.profile.last_name : "",
            avatar: user.profile.avatar
        }
    });

    const sortUsers = (users) => {
        let sortableItems = [...users];
        if (sortConfig.key) {
            sortableItems.sort((a, b) => {
                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];
                const isANull = aValue === null;
                const isBNull = bValue === null;
                if (isANull && isBNull) return 0;
                if (isANull) return 1;
                if (isBNull) return -1;
                if (aValue < bValue) return sortConfig.direction === 'ascend' ? -1 : 1;
                if (aValue > bValue) return sortConfig.direction === 'ascend' ? 1 : -1;
                return 0;
            });
        }
        return sortableItems;
    };

    const requestSort = (key) => {
        let direction = sortConfig.direction;
        let newKey = key;
        if (sortConfig.key === key) direction = sortConfig.direction === 'ascend' ? 'descend' : 'ascend';
        setSortConfig({ key: newKey, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascend' ? ' ▲' : ' ▼';
    };

    const sortedUsers = sortUsers(users);

    return (
        <div>
            <h2>Users</h2>
            <div className={styles.columnTitles}>
                <div onClick={() => requestSort('first_name')}>First Name {getSortIcon('first_name')}</div>
                <div onClick={() => requestSort('last_name')}>Last Name {getSortIcon('last_name')}</div>
                <div onClick={() => requestSort('email')}>Email {getSortIcon('email')}</div>
                <div onClick={() => requestSort('department_name')}>Department {getSortIcon('department_name')}</div>
                <div onClick={() => requestSort('position_name')}>Position {getSortIcon('position_name')}</div>
            </div>
            <div>
                {sortedUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};

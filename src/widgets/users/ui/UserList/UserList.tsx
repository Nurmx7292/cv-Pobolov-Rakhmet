import {UserCard, useUsersQuery} from "@entities/user";
import styles from './UserList.module.css'
import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const UserList = () => {
    const { data, loading, error } = useUsersQuery();
    const [searchString, setSearchString] = useState('');

    const [sortConfig, setSortConfig] = useState({
        key: 'department_name',
        direction: 'ascend'
    });

    const sortUsers = (users) => {
        let sortableItems = [...users];

        if (sortConfig.key) {
            sortableItems.sort((a, b) => {

                const aValue = a[sortConfig.key];
                const bValue = b[sortConfig.key];


                const isANull = aValue === null;
                const isBNull = bValue === null;

                if (isANull && isBNull) {
                    return 0;
                }
                if (isANull) {
                    return 1;
                }
                if (isBNull) {
                    return -1;
                }

                if (aValue < bValue) {
                    return sortConfig.direction === 'ascend' ? -1 : 1;
                }
                if (aValue > bValue) {
                    return sortConfig.direction === 'ascend' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    };


    const requestSort = (key) => {
        let direction = sortConfig.direction;
        let newKey = key;

        if (sortConfig.key === key) {
            direction = sortConfig.direction === 'ascend' ? 'descend' : 'ascend';
        }

        setSortConfig({ key: newKey, direction });
    };

    const getSortIcon = (key) => {
        if (sortConfig.key !== key) return null;
        return sortConfig.direction === 'ascend' ? (
            <ArrowUpwardIcon style={{ fontSize: 16, marginLeft: 4 }} />
        ) : (
            <ArrowDownwardIcon style={{ fontSize: 16, marginLeft: 4 }} />
        );
    };


    if (loading) {
        return <p>Loading users...</p>;
    }

    if (error) {
        return <p>Failed to load users: {error.message}</p>;
    }


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
    })



    const currentUserId = localStorage.getItem('currentUserId');

    const currentUser = users.find((user) => user.id === currentUserId);
    let currentUserElement = null;
    if(currentUser)currentUserElement = <UserCard  user={currentUser}/>;



    const index = users.findIndex(user => user.id === currentUserId);

    let usersWithoutCurrentUser = null;

    if (index !== -1) {
        usersWithoutCurrentUser = [
            ...users.slice(0, index),
            ...users.slice(index + 1),
        ];

    }

    const sortedUsers = sortUsers(usersWithoutCurrentUser);

    let filteredUsers = sortedUsers;
    if (searchString !== '') {
        const lowerSearch = searchString.toLowerCase();
        filteredUsers = sortedUsers.filter((user) => {
            if (
                user.first_name.toLowerCase().includes(lowerSearch) ||
                user.last_name.toLowerCase().includes(lowerSearch) ||
                user.email.toLowerCase().includes(lowerSearch)
            ) return true;
            else return false;
        });
    }

    return (
        <div className={styles.container}>
            <div className={styles.employeeText}>Employees</div>
            <TextField
                placeholder="Search"
                variant="outlined"
                value={searchString}
                onChange={(e) => setSearchString(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" style={{borderColor:'red'}}>
                            <SearchIcon style={{ color: ' white' }} />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    width: 320,
                    mb: 2,
                    "& .MuiOutlinedInput-root": {
                        height: 40,
                        borderRadius: '120px',
                        "& fieldset": {
                            borderColor: "#A0A0A0",
                        },
                        "&:hover fieldset": {
                            borderColor: "#FFFFFF",
                        },
                        "&.Mui-focused, &.Mui-focused fieldset": {
                            borderColor: "#FF0000",
                        },
                    },
                }}
            />



            <div className={styles.columnTitles}>
                <div className={styles.firstName} onClick={() => requestSort('first_name')}>First Name {getSortIcon('first_name')}</div>
                <div className={styles.lastName} onClick={() => requestSort('last_name')}>Last Name {getSortIcon('last_name')}</div>
                <div className={styles.email} onClick={() => requestSort('email')}>Email {getSortIcon('email')}</div>
                <div className={styles.departmentName} onClick={() => requestSort('department_name')}>Department {getSortIcon('department_name')}</div>
                <div className={styles.positionName} onClick={() => requestSort('position_name')}>Position {getSortIcon('position_name')}</div>
            </div>
            <div>

                {currentUserElement}

                {filteredUsers.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
};


// import type {User} from "../../model/types.ts";
// import styles from "./UserCard.module.css";
// import {useNavigate} from "react-router-dom";
// import Avatar from "@shared/components/avatar/ui/Avatar.tsx";
// import {IconButton} from "@mui/material";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
//
//
// interface UserData {
//     id: string;
//     email: string;
//     role: string;
//     department_name: string;
//     position_name: string;
//     first_name: string;
//     last_name: string;
//     avatar: string;
// }
//
// interface Props {
//     user: UserData;
// }
//
// export const UserCard = ({user}: Props) => {
//
//     const currentUserId = localStorage.getItem('currentUserId');
//
//     const navigate = useNavigate();
//
//     console.log(user.id)
//
//     const firstName = user?.first_name ?? "";
//     const lastName = user?.last_name ?? "";
//     const avatar = user?.avatar ?? "";
//     const email = user?.email ?? "";
//     const department_name = user?.department_name ?? "";
//     const position_name = user?.position_name ?? "";
//     const userId = user.id;
//
//     const onProfileClick = (userId) => {
//         navigate(`/users/${userId}`);
//     };
//
//     let userControlElement = currentUserId === userId ? <MoreVertIcon/> : <ChevronRightIcon/>;
//
//
//     return (
//         <article className={styles.card}>
//
//             <div>
//                 <Avatar size={40}
//                         avatarReference={avatar}
//                         firstName={firstName}
//                         lastName={lastName}
//                         email={email}
//                 />
//             </div>
//             <div className={styles.firstName}>{firstName}</div>
//             <div className={styles.lastName}>{lastName}</div>
//             <div className={styles.email}>{email}</div>
//             <div className={styles.departmentName}>{department_name}</div>
//             <div className={styles.positionName}>{position_name}</div>
//             {/*<div className={styles.profile} onClick={()=>onProfileClick(userId)}>{'>'}</div>*/}
//             {/*<IconButton>*/}
//             {/*    <MoreVertIcon />*/}
//             {/*</IconButton>*/}
//             <div className={styles.profile} onClick={() => onProfileClick(userId)}>
//                 <IconButton size="small">
//                     {userControlElement}
//                 </IconButton>
//             </div>
//
//         </article>
//     );
// };
//


import React, { useState, MouseEvent } from "react";
import type { User } from "../../model/types.ts";
import styles from "./UserCard.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "@shared/components/avatar/ui/Avatar.tsx";
import { IconButton, Menu, MenuItem } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";

interface UserData {
    id: string;
    email: string;
    role: string;
    department_name: string;
    position_name: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

interface Props {
    user: UserData;
}

export const UserCard = ({ user }: Props) => {
    const currentUserId = localStorage.getItem("currentUserId");
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event: MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const onProfileClick = (userId: string) => {
        navigate(`/users/${userId}`);
    };

    const handleMenuItemClick = (action: string) => {
        console.log(action); // Здесь можно обрабатывать действия Profile / Update / Delete
        handleMenuClose();
    };

    const isCurrentUser = currentUserId === user.id;

    return (
        <article className={styles.card}>
            <div>
                <Avatar
                    size={40}
                    avatarReference={user.avatar ?? ""}
                    firstName={user.first_name ?? ""}
                    lastName={user.last_name ?? ""}
                    email={user.email ?? ""}
                />
            </div>
            <div className={styles.firstName}>{user.first_name}</div>
            <div className={styles.lastName}>{user.last_name}</div>
            <div className={styles.email}>{user.email}</div>
            <div className={styles.departmentName}>{user.department_name}</div>
            <div className={styles.positionName}>{user.position_name}</div>

            <div className={styles.profile}>
                {isCurrentUser ? (
                    <>
                        <IconButton size="small" onClick={handleMenuOpen}>
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            anchorEl={anchorEl}
                            open={isMenuOpen}
                            onClose={handleMenuClose}
                        >
                            <MenuItem onClick={() => handleMenuItemClick("Profile")}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={() => handleMenuItemClick("Update user")}>
                                Update user
                            </MenuItem>
                            <MenuItem disabled>Delete user</MenuItem>
                        </Menu>
                    </>
                ) : (
                    <IconButton size="small" onClick={() => onProfileClick(user.id)}>
                        <ChevronRightIcon />
                    </IconButton>
                )}
            </div>
        </article>
    );
};

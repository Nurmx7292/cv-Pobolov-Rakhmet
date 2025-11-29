import type {User} from "../../model/types.ts";
import styles from "./UserCard.module.css";
import {useNavigate} from "react-router-dom";
import Avatar from "@shared/components/avatar/ui/Avatar.tsx";
import {IconButton} from "@mui/material";
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

export const UserCard = ({user}: Props) => {

    const currentUserId = localStorage.getItem('currentUserId');

    const navigate = useNavigate();

    console.log(user.id)

    const firstName = user?.first_name ?? "";
    const lastName = user?.last_name ?? "";
    const avatar = user?.avatar ?? "";
    const email = user?.email ?? "";
    const department_name = user?.department_name ?? "";
    const position_name = user?.position_name ?? "";
    const userId = user.id;

    const onProfileClick = (userId) => {
        navigate(`/users/${userId}`);
    };

    let userControlElement = currentUserId === userId ? <MoreVertIcon/> : <ChevronRightIcon/>;


    return (
        <article className={styles.card}>

            <div>
                <Avatar size={40}
                        avatarReference={avatar}
                        firstName={firstName}
                        lastName={lastName}
                        email={email}
                />
            </div>
            <div className={styles.firstName}>{firstName}</div>
            <div className={styles.lastName}>{lastName}</div>
            <div className={styles.email}>{email}</div>
            <div className={styles.departmentName}>{department_name}</div>
            <div className={styles.positionName}>{position_name}</div>
            {/*<div className={styles.profile} onClick={()=>onProfileClick(userId)}>{'>'}</div>*/}
            {/*<IconButton>*/}
            {/*    <MoreVertIcon />*/}
            {/*</IconButton>*/}
            <div className={styles.profile} onClick={() => onProfileClick(userId)}>
                <IconButton size="small">
                    {userControlElement}
                </IconButton>
            </div>

        </article>
    );
};


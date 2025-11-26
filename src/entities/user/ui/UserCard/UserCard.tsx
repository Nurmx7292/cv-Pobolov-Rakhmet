import type { User } from "../../model/types.ts";
import styles from "./UserCard.module.css";

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
    const firstName = user?.first_name ?? "";
    const lastName = user?.last_name ?? "";
    const avatar = user?.avatar ?? "";
    const email = user?.email ?? "";
    const department_name = user?.department_name ?? "";
    const position_name = user?.position_name ?? "";


    const avatarAltText = firstName ? firstName.toUpperCase().split('')[0] : (lastName ? lastName.toUpperCase().split('')[0] : email.toUpperCase().split('')[0])


    const avatarElement = avatar ? <div className={styles.avatar}><img src={avatar}/></div> : <div className={styles.avatar}><p>{avatarAltText}</p></div>

    return (
        <article className={styles.card}>
            <div className={styles.avatar}>{avatarElement}</div>
            <div className={styles.firstName}>{firstName}</div>
            <div className={styles.lastName}>{lastName}</div>
            <div className={styles.email}>{email}</div>
            <div className={styles.departmentName}>{department_name || "No department"}</div>
            <div className={styles.positionName}>{position_name || "No position"}</div>
        </article>
    );
};


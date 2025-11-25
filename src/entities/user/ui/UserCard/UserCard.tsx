import type { User } from "../../model/types.ts";
import styles from "./UserCard.module.css";

interface Props {
    user: User;
}

export const UserCard = ({ user }: Props) => {
    const firstName = user?.profile?.first_name ?? "";
    const lastName = user?.profile?.last_name ?? "";
    const email = user?.email ?? "";
    const role = user?.role ?? "";
    const department_name = user?.department_name ?? "";
    const position_name = user?.position_name ?? "";


    const avatarAltText = firstName ? firstName.toUpperCase().split('')[0] : (lastName ? lastName.toUpperCase().split('')[0] : email.toUpperCase().split('')[0])



    return (
        <article className={styles.card}>
            <div className={styles.avatar}><p>{avatarAltText}</p></div>
            <div className={styles.firstName}>{firstName}</div>
            <div className={styles.lastName}>{lastName}</div>
            <div className={styles.email}>{email}</div>
            <div className={styles.role}>{role}</div>
            <div className={styles.departmentName}>{department_name || "No department"}</div>
            <div className={styles.positionName}>{position_name || "No position"}</div>
        </article>
    );
};


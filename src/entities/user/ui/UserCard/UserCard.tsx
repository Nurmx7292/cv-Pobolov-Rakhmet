import type { User } from "../../model/types.ts";
import styles from "./UserCard.module.css";

interface Props {
    user: User;
}

export const UserCard = ({ user }: Props) => {
    const firstName = user.profile?.first_name ?? "";
    const lastName = user.profile?.last_name ?? "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "No name";

    return (
        <article className={styles.card}>
            <div className={styles.name}>{fullName}</div>
            <div className={styles.meta}>{user.email}</div>
            <div className={styles.meta}>{user.role}</div>
            <div className={styles.meta}>{user.department_name || "No department"}</div>
            <div className={styles.meta}>{user.position_name || "No position"}</div>
        </article>
    );
};


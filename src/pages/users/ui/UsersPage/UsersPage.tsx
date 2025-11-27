import { UserList } from "@widgets/users";
import styles from "./UsersPage.module.css";

export const UsersPage = () => {
    return (
        <section className={styles.layout}>
            <section className={styles.users}>
                <UserList />
            </section>
        </section>
    );
};


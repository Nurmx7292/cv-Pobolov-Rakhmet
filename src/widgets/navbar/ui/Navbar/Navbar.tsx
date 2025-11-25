import { useNavigate } from "react-router-dom";
import { tokenStorage } from "@shared/lib/tokenStorage.ts";
import styles from "./Navbar.module.css";

export const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        tokenStorage.clearTokens();
        navigate("/login");
    };

    return (
        <sidebar>

                <button className={styles.button} onClick={handleLogout}>
                    Logout
                </button>

            <ul>
                <li>Employees</li>
                <li>Skills</li>
                <li>Languages</li>
                <li>Cvs</li>
                <li>Profile</li>
            </ul>
        </sidebar>
    );
};


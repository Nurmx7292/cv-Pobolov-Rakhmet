import { Box, Avatar, Typography, useTheme } from "@mui/material";
import styles from "./UserProfile.module.css";

interface UserProfileProps {
    isCollapsed: boolean;
}

export const UserProfile = ({ isCollapsed }: UserProfileProps) => {
    const theme = useTheme();

    return (
        <Box
            className={`${styles.profileBox} ${
                isCollapsed ? styles.profileBoxCollapsed : ""
            }`}
        >
            <Avatar
                className={`${styles.avatar} ${isCollapsed ? styles.avatarCollapsed : ""}`}
                sx={{
                    bgcolor: theme.palette.primary.main,
                }}
            >
                T
            </Avatar>
            {!isCollapsed && (
                <Box className={styles.emailBox}>
                    <Typography
                        variant="body2"
                        className={styles.emailText}
                        sx={{
                            color: theme.palette.text.primary,
                        }}
                    >
                        testacc5@gmail.com
                    </Typography>
                </Box>
            )}
        </Box>
    );
};


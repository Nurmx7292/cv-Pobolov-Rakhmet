import { useState } from "react";
import { Box, Avatar, Typography, useTheme } from "@mui/material";
import { UserMenu } from "./UserMenu/UserMenu";
import styles from "./UserProfileNav.module.css";
import { useQuery } from "@apollo/client/react";
import {GET_USER_BY_ID_QUERY} from "@widgets/users/api/getUserByIdQuery.ts";



interface UserProfileProps {
    isCollapsed: boolean;
}

export const UserProfileNav = ({ isCollapsed }: UserProfileProps) => {

    const currentUserId = localStorage.getItem("currentUserId");

    const {loading, error, data} = useQuery(GET_USER_BY_ID_QUERY, {
        variables: {id: currentUserId},
        skip: !currentUserId,
        notifyOnNetworkStatusChange: false
    });

    const user = data?.user;
    const profile = user?.profile;

    const email = user?.email ?? "";
    const firstName = profile?.first_name ?? "";
    const lastName = profile?.last_name ?? "";
    const avatar = profile?.avatar;

    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Box
                className={`${styles.profileBox} ${isCollapsed ? styles.profileBoxCollapsed : ""}`}
                onClick={handleClick}
                tabIndex={0}
                role="button"
                sx={{
                    "&:hover": {
                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? "rgba(255,255,255,0.08)"
                                : "rgba(0,0,0,0.05)",
                    },
                }}
            >
                <Avatar
                    className={`${styles.avatar} ${isCollapsed ? styles.avatarCollapsed : ""}`}
                    sx={{
                        bgcolor: theme.palette.primary.main,
                    }}
                >
                    T
                </Avatar>
                <Box className={styles.emailBox}>
                    <Typography
                        variant="body2"
                        className={styles.emailText}
                        sx={{
                            color: theme.palette.text.primary,
                            opacity: isCollapsed ? 0 : 1,
                            maxWidth: isCollapsed ? 0 : "140px",
                            transition: "opacity 0.2s ease, max-width 0.2s ease",
                        }}
                    >
                        {(firstName||lastName) ? `${firstName} ${lastName}`: email}
                    </Typography>
                </Box>
            </Box>    
            <UserMenu anchorEl={anchorEl} open={open} onClose={handleClose} />
        </>
    );
};


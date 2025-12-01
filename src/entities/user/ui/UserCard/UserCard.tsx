
import React, { useState, MouseEvent } from "react";
import styles from "./UserCard.module.css";
import { useNavigate } from "react-router-dom";
import Avatar from "@shared/components/avatar/ui/Avatar.tsx";
import { IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import UpdateUserDialog from "@entities/user/ui/UpdateUserDialog/UpdateUserDialog.tsx";
import CloseIcon from "@mui/icons-material/Close";


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
    const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);

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

    const handleUpdateClick = () => {
        setIsUpdateDialogOpen(true);
        handleMenuClose();
    };

    const handleDialogClose = () => {
        setIsUpdateDialogOpen(false);
    };

    const isCurrentUser = currentUserId === user.id;

    return (
        <div className={styles.container}>
            <div className={styles.cell}>
                <Avatar
                    size={40}
                    avatarReference={user.avatar ?? ""}
                    firstName={user.first_name ?? ""}
                    lastName={user.last_name ?? ""}
                    email={user.email ?? ""}
                />
            </div>
            <div className={`${styles.firstName} ${styles.cell}`}>{user.first_name}</div>
            <div className={`${styles.lastName} ${styles.cell}`}>{user.last_name}</div>
            <div className={`${styles.email} ${styles.cell}`}>{user.email}</div>
            <div className={`${styles.departmentName} ${styles.cell}`}>{user.department_name}</div>
            <div className={`${styles.positionName} ${styles.cell}`}>{user.position_name}</div>

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
                            <MenuItem onClick={() => onProfileClick(user.id)}>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={handleUpdateClick}>
                                Update user
                            </MenuItem>
                            <MenuItem disabled>Delete user</MenuItem>
                        </Menu>

                        <Dialog open={isUpdateDialogOpen} onClose={handleDialogClose}
                                PaperProps={{
                                    sx: {
                                        width: 950,
                                        height: 540,
                                        maxWidth: 950,
                                    }
                                }}>

                            <DialogTitle>Update User</DialogTitle>
                            <IconButton
                                aria-label="close"
                                onClick={handleDialogClose}
                                sx={{
                                    position: 'absolute',
                                    right: 8,
                                    top: 8,
                                    color: (theme) => theme.palette.grey[500],
                                }}
                            >
                                <CloseIcon />
                            </IconButton>
                            <DialogContent>

                                <UpdateUserDialog handleDialogClose={handleDialogClose}/>

                            </DialogContent>
                        </Dialog>
                    </>
                ) : (
                    <IconButton size="small" onClick={() => onProfileClick(user.id)}>
                        <ChevronRightIcon />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

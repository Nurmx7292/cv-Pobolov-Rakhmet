import { useParams } from "react-router-dom";
import { useMemo, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
    useProfileLanguages,
    useAddProfileLanguage,
    useUpdateProfileLanguage,
    useDeleteProfileLanguage,
    type LanguageProficiency,
} from "@entities/profile";
import { UserLanguagesLayout } from "@widgets/users/ui/UserLanguagesLayout/UserLanguagesLayout";
import { useNotification } from "@shared/lib/notifications";

export const UserLanguagesPage = () => {
    const { userId } = useParams<{ userId: string }>();
    const { data, loading, error, refetch } = useProfileLanguages(userId);
    const [addProfileLanguage, { loading: adding, error: addError }] = useAddProfileLanguage();
    const [updateProfileLanguage, { loading: updating, error: updateError }] = useUpdateProfileLanguage();
    const [deleteProfileLanguage, { loading: deleting, error: deleteError }] = useDeleteProfileLanguage();
    const { showNotification, NotificationComponent } = useNotification();

    const currentUserId = localStorage.getItem("currentUserId");

    const languages = useMemo<LanguageProficiency[]>(() => {
        if (!data?.profile?.languages) {
            return [];
        }
        return data.profile.languages;
    }, [data?.profile?.languages]);

    const isEditable = useMemo(() => {
        return userId === currentUserId || false;
    }, [userId, currentUserId]);

    const handleAddLanguage = useCallback(
        async (name: string, proficiency: string) => {
            if (!userId) return;
            try {
                await addProfileLanguage({
                    variables: {
                        userId,
                        name,
                        proficiency,
                    },
                });
                await refetch();
                showNotification("Language was added", "success");
            } catch (err) {
                console.error("Failed to add language:", err);
                showNotification("Failed to add language", "error");
            }
        },
        [addProfileLanguage, refetch, userId, showNotification],
    );

    const handleUpdateLanguage = useCallback(
        async (name: string, proficiency: string) => {
            if (!userId) return;
            try {
                await updateProfileLanguage({
                    variables: {
                        userId,
                        name,
                        proficiency,
                    },
                });
                await refetch();
                showNotification("Language was updated", "success");
            } catch (err) {
                console.error("Failed to update language:", err);
                showNotification("Failed to update language", "error");
            }
        },
        [updateProfileLanguage, refetch, userId, showNotification],
    );

    const handleDeleteLanguages = useCallback(
        async (names: string[]) => {
            if (!userId || !names.length) return;
            try {
                await deleteProfileLanguage({
                    variables: {
                        userId,
                        name: names,
                    },
                });
                await refetch();
                showNotification("Language was deleted", "success");
            } catch (err) {
                console.error("Failed to delete languages:", err);
                showNotification("Failed to delete language", "error");
            }
        },
        [deleteProfileLanguage, refetch, userId, showNotification],
    );

    if (loading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6" color="error">
                    Failed to load languages: {error.message}
                </Typography>
            </Box>
        );
    }

    if (!userId) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6">User ID not found</Typography>
            </Box>
        );
    }

    return (
        <>
            <UserLanguagesLayout
                languages={languages}
                isEditable={isEditable}
                onAddLanguage={handleAddLanguage}
                onUpdateLanguage={handleUpdateLanguage}
                onDeleteLanguages={handleDeleteLanguages}
                adding={adding}
                updating={updating}
                deleting={deleting}
                addError={addError}
                updateError={updateError}
                deleteError={deleteError}
            />
            <NotificationComponent />
        </>
    );
};


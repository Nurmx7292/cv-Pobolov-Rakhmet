import { useOutletContext } from "react-router-dom";
import { Typography, Box } from "@mui/material";
import { CvForm, type CvPageContextValue } from "@widgets/cvs";
import { useUpdateCv } from "@entities/cv";
import { useNotification } from "@shared/lib/notifications";

export const CvDetailsPage = () => {
    const { cv, refetch } = useOutletContext<CvPageContextValue>();
    const [updateCv, { loading, error }] = useUpdateCv();
    const { showNotification, NotificationComponent } = useNotification();

    const currentUserId = localStorage.getItem("currentUserId");
    const isEditable = cv?.user?.id === currentUserId;

    const handleSubmit = async (data: { name: string; education: string; description: string }) => {
        if (!cv) return;
        try {
            await updateCv({
                variables: {
                    cv: {
                        cvId: cv.id,
                        name: data.name,
                        education: data.education,
                        description: data.description,
                    },
                },
            });
            await refetch();
            showNotification("CV was updated", "success");
        } catch (err) {
            console.error("Failed to update CV:", err);
            showNotification("Failed to update CV", "error");
        }
    };

    if (!cv) {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "400px",
                }}
            >
                <Typography variant="h6">CV not found</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box sx={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <Box sx={{ width: "100%", maxWidth: "852px" }}>
                    <CvForm
                        initialData={{
                            name: cv.name,
                            education: cv.education,
                            description: cv.description,
                        }}
                        onSubmit={handleSubmit}
                        loading={loading}
                        error={error}
                        disabled={!isEditable}
                        maxWidth="852px"
                        btnWidth="50%"
                    />
                </Box>
            </Box>
            <NotificationComponent />
        </>
    );
};

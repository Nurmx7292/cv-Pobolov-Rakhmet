import { useState } from "react";
import { useUpdateCv } from "@entities/cv";
import { useNotification } from "@shared/lib/notifications";
import { CvFormDialog } from "../CvFormDialog/CvFormDialog";
import { CvForm } from "../CvForm/CvForm";
import type { CvListItem } from "@entities/cv";

interface UpdateCvDialogProps {
    open: boolean;
    onClose: () => void;
    cv: CvListItem;
    onSuccess?: () => void;
}

export const UpdateCvDialog = ({
    open,
    onClose,
    cv,
    onSuccess,
}: UpdateCvDialogProps) => {
    const [updateCv, { loading, error }] = useUpdateCv();
    const { showNotification, NotificationComponent } = useNotification();

    const handleSubmit = async (data: { name: string; education: string; description: string }) => {
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
            showNotification("CV was updated", "success");
            onSuccess?.();
            onClose();
        } catch (err) {
            console.error("Failed to update CV:", err);
            showNotification("Failed to update CV", "error");
        }
    };

    return (
        <>
            <CvFormDialog open={open} onClose={onClose} variant="update">
                <CvForm
                    initialData={{
                        name: cv.name,
                        education: cv.education,
                        description: cv.description,
                    }}
                    onSubmit={handleSubmit}
                    onCancel={onClose}
                    loading={loading}
                    error={error}
                />
            </CvFormDialog>
            <NotificationComponent />
        </>
    );
};


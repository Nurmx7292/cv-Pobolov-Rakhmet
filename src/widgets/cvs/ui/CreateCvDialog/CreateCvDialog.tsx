import { useState } from "react";
import { useCreateCv } from "@entities/cv";
import { useNotification } from "@shared/lib/notifications";
import { CvFormDialog } from "../CvFormDialog/CvFormDialog";
import { CvForm } from "../CvForm/CvForm";

interface CreateCvDialogProps {
    open: boolean;
    onClose: () => void;
    userId: string;
}

export const CreateCvDialog = ({
    open,
    onClose,
    userId,
}: CreateCvDialogProps) => {
    const [createCv, { loading, error }] = useCreateCv();
    const { showNotification, NotificationComponent } = useNotification();

    const handleSubmit = async (data: { name: string; education: string; description: string }) => {
        try {
            await createCv({
                variables: {
                    cv: {
                        userId,
                        name: data.name,
                        education: data.education,
                        description: data.description,
                    },
                },
            });
            showNotification("CV was created", "success");
            onClose();
        } catch (err) {
            console.error("Failed to create CV:", err);
            showNotification("Failed to create CV", "error");
        }
    };

    return (
        <>
            <CvFormDialog open={open} onClose={onClose} variant="add">
                <CvForm
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


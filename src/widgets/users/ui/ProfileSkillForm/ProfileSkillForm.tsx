import { useState, FormEvent, useEffect } from "react";
import { Stack, Alert } from "@mui/material";
import { SkillMasterySelect } from "@features/skills";
import { FormButtons } from "@shared/ui";

interface ProfileSkillFormProps {
    skillId: string;
    initialMastery: number;
    onSubmit: (skillId: string, mastery: number) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: Error | null;
}

export const ProfileSkillForm = ({
    skillId,
    initialMastery,
    onSubmit,
    onCancel,
    loading = false,
    error,
}: ProfileSkillFormProps) => {
    const [mastery, setMastery] = useState(initialMastery);

    useEffect(() => {
        setMastery(initialMastery);
    }, [initialMastery]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await onSubmit(skillId, mastery);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <SkillMasterySelect value={mastery} onChange={setMastery} disabled={loading} />
                <FormButtons
                    title="Update"
                    loading={loading}
                    disabled={loading}
                    onCancel={onCancel}
                />
            </Stack>
        </form>
    );
};


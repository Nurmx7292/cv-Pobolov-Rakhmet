import { useState, FormEvent } from "react";
import { Stack, CircularProgress, Alert } from "@mui/material";
import { SkillSelect } from "@features/skills";
import { SkillMasterySelect } from "@features/skills";
import { FormButtons } from "@shared/ui";

interface AddProfileSkillFormProps {
    userId: string;
    existingSkillIds: string[];
    onSubmit: (skillId: string, mastery: number) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: Error | null;
}

export const AddProfileSkillForm = ({
    userId,
    existingSkillIds,
    onSubmit,
    onCancel,
    loading = false,
    error,
}: AddProfileSkillFormProps) => {
    const [skillId, setSkillId] = useState("");
    const [mastery, setMastery] = useState(20);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!skillId) {
            return;
        }
        await onSubmit(skillId, mastery);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <SkillSelect
                    value={skillId}
                    onChange={setSkillId}
                    excludeIds={existingSkillIds}
                    label="Skill"
                    disabled={loading}
                />
                <SkillMasterySelect value={mastery} onChange={setMastery} disabled={loading} />
                <FormButtons
                    title="Add"
                    loading={loading}
                    disabled={!skillId || loading}
                    onCancel={onCancel}
                />
            </Stack>
        </form>
    );
};


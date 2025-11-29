import { useState } from "react";
import type { FormEvent } from "react";
import { Stack, Alert } from "@mui/material";
import { SkillSelect, SkillMasterySelect } from "@features/skills/ui";
import { FormButtons } from "@shared/ui";

interface AddProfileSkillFormProps {
    existingSkillIds: string[];
    onSubmit: (name: string, categoryId: string, mastery: number) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: Error | null;
}

export const AddProfileSkillForm = ({
    existingSkillIds,
    onSubmit,
    onCancel,
    loading = false,
    error,
}: AddProfileSkillFormProps) => {
    const [skillValue, setSkillValue] = useState("");
    const [mastery, setMastery] = useState(20);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!skillValue) {
            return;
        }
        const [name, categoryId] = skillValue.split(":");
        await onSubmit(name, categoryId, mastery);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <SkillSelect
                    value={skillValue}
                    onChange={setSkillValue}
                    excludeIds={existingSkillIds}
                    label="Skill"
                    disabled={loading}
                />
                <SkillMasterySelect value={mastery} onChange={setMastery} disabled={loading} />
                <FormButtons
                    title="Add"
                    loading={loading}
                    disabled={!skillValue || loading}
                    onCancel={onCancel}
                />
            </Stack>
        </form>
    );
};


import { useState, useMemo } from "react";
import type { FormEvent } from "react";
import { Stack, Alert } from "@mui/material";
import { SkillSelect, SkillMasterySelect, masteryNumberToEnum } from "@features/skills/ui";
import { useSkillOptions } from "@entities/skill";
import { FormButtons } from "@shared/ui";

interface AddCvSkillFormProps {
    existingSkillNames: string[];
    onSubmit: (name: string, categoryId: string, mastery: string) => Promise<void>;
    onCancel: () => void;
    loading?: boolean;
    error?: Error | null;
}

export const AddCvSkillForm = ({
    existingSkillNames,
    onSubmit,
    onCancel,
    loading = false,
    error,
}: AddCvSkillFormProps) => {
    const [skillValue, setSkillValue] = useState("");
    const [mastery, setMastery] = useState(20);
    const { skills } = useSkillOptions();

    const excludeIds = useMemo(() => {
        return skills
            .filter((skill) => existingSkillNames.includes(skill.name))
            .map((skill) => skill.id);
    }, [skills, existingSkillNames]);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!skillValue) {
            return;
        }
        const [name, categoryIdStr] = skillValue.split(":");
        const categoryId = categoryIdStr === "-1" || categoryIdStr === "" ? "" : categoryIdStr;
        const masteryEnum = masteryNumberToEnum(mastery);
        await onSubmit(name, categoryId || "", masteryEnum);
    };

    return (
        <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
                {error && <Alert severity="error">{error.message}</Alert>}
                <SkillSelect
                    value={skillValue}
                    onChange={setSkillValue}
                    excludeIds={excludeIds}
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


import { useMemo } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_SKILLS, type SkillOption, type SkillsResponse } from "./getSkills";

export const useSkillOptions = () => {
    const { data, loading, error } = useQuery<SkillsResponse>(GET_SKILLS);
    const skills = data?.skills ?? [];

    const skillsMap = useMemo(() => {
        return skills.reduce<Record<string, SkillOption>>((acc, skill) => {
            acc[skill.id] = skill;
            return acc;
        }, {});
    }, [skills]);

    return {
        skills,
        skillsMap,
        loading,
        error,
    };
};



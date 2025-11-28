import { gql } from "@apollo/client";

export const UPDATE_PROFILE_SKILL = gql`
    mutation UpdateProfileSkill($skillId: ID!, $mastery: Int!) {
        updateProfileSkill(skill: { skillId: $skillId, mastery: $mastery }) {
            id
            full_name
            skills {
                id
                name
                mastery
                category {
                    id
                    name
                }
            }
        }
    }
`;

export interface UpdateProfileSkillResponse {
    updateProfileSkill: {
        id: string;
        full_name?: string | null;
        skills: Array<{
            id: string;
            name: string;
            mastery: number;
            category: {
                id: string;
                name: string;
            } | null;
        }>;
    };
}

export interface UpdateProfileSkillVariables {
    skillId: string;
    mastery: number;
}


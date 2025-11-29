import { gql } from "@apollo/client";

export const ADD_PROFILE_SKILL = gql`
    mutation AddProfileSkill($skillId: ID!, $mastery: Int!) {
        addProfileSkill(skill: { skillId: $skillId, mastery: $mastery }) {
            id
            full_name
            skills {
                name
                categoryId
                mastery
            }
        }
    }
`;

export interface AddProfileSkillResponse {
    addProfileSkill: {
        id: string;
        full_name?: string | null;
        skills: Array<{
            name: string;
            categoryId: string | null;
            mastery: string;
        }>;
    };
}

export interface AddProfileSkillVariables {
    skillId: string;
    mastery: number;
}


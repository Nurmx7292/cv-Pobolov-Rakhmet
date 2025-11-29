import { gql } from "@apollo/client";

export const UPDATE_PROFILE_SKILL = gql`
    mutation UpdateProfileSkill($userId: ID!, $name: String!, $mastery: Mastery!) {
        updateProfileSkill(skill: { userId: $userId, name: $name, mastery: $mastery }) {
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

export interface UpdateProfileSkillResponse {
    updateProfileSkill: {
        id: string;
        full_name?: string | null;
        skills: Array<{
            name: string;
            categoryId: string | null;
            mastery: string;
        }>;
    };
}

export interface UpdateProfileSkillVariables {
    userId: string;
    name: string;
    mastery: string;
}


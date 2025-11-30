import { gql } from "@apollo/client";

export const ADD_PROFILE_SKILL = gql`
    mutation AddProfileSkill($userId: ID!, $name: String!, $categoryId: ID, $mastery: Mastery!) {
        addProfileSkill(skill: { userId: $userId, name: $name, categoryId: $categoryId, mastery: $mastery }) {
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
    userId: string;
    name: string;
    categoryId?: string;
    mastery: string;
}


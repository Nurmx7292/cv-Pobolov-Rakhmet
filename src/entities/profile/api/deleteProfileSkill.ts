import { gql } from "@apollo/client";

export const DELETE_PROFILE_SKILL = gql`
    mutation DeleteProfileSkill($userId: ID!, $name: [String!]!) {
        deleteProfileSkill(skill: { userId: $userId, name: $name }) {
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

export interface DeleteProfileSkillResponse {
    deleteProfileSkill: {
        id: string;
        full_name?: string | null;
        skills: Array<{
            name: string;
            categoryId: string | null;
            mastery: string;
        }>;
    };
}

export interface DeleteProfileSkillVariables {
    userId: string;
    name: string[];
}


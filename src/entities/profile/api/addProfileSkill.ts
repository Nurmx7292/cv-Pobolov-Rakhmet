    import { gql } from "@apollo/client";

export const ADD_PROFILE_SKILL = gql`
    mutation AddProfileSkill($skillId: ID!, $mastery: Int!) {
        addProfileSkill(skill: { skillId: $skillId, mastery: $mastery }) {
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

export interface AddProfileSkillResponse {
    addProfileSkill: {
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

export interface AddProfileSkillVariables {
    skillId: string;
    mastery: number;
}


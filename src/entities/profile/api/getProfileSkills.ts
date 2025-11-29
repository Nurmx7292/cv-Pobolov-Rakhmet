import { gql } from "@apollo/client";

export const GET_PROFILE_SKILLS = gql`
    query ProfileSkills($userId: ID!) {
        profile(userId: $userId) {
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

export interface ProfileSkill {
    name: string;
    categoryId: string | null;
    mastery: string;
}

export interface ProfileSkillsResponse {
    profile: {
        id: string;
        full_name?: string | null;
        skills: ProfileSkill[];
    } | null;
}

export interface ProfileSkillsVariables {
    userId: string;
}



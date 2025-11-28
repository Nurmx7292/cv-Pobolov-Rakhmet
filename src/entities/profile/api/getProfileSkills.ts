import { gql } from "@apollo/client";

export const GET_PROFILE_SKILLS = gql`
    query ProfileSkills($userId: ID!) {
        profile(userId: $userId) {
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

export interface ProfileSkillCategory {
    id: string;
    name: string;
}

export interface ProfileSkill {
    id: string;
    name: string;
    mastery: number;
    category: ProfileSkillCategory;
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



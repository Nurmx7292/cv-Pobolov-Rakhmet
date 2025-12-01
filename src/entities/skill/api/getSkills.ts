import { gql } from "@apollo/client";

export const GET_SKILLS = gql`
    query Skills {
        skills {
            id
            name
            category {
                id
                name
            }
        }
    }
`;

export interface SkillOptionCategory {
    id: string;
    name: string;
}

export interface SkillOption {
    id: string;
    name: string;
    category: SkillOptionCategory;
}

export interface SkillsResponse {
    skills: SkillOption[];
}



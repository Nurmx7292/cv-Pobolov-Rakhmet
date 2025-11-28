import { gql } from "@apollo/client";

export const GET_SKILL_CATEGORIES = gql`
    query SkillCategories {
        skillCategories {
            id
            name
        }
    }
`;

export interface SkillCategory {
    id: string;
    name: string;
}

export interface SkillCategoriesResponse {
    skillCategories: SkillCategory[];
}



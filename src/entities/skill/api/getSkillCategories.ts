import { gql } from "@apollo/client";

export const GET_SKILL_CATEGORIES = gql`
    query SkillCategories {
        skillCategories {
            id
            name
            order
            parent {
                id
                name
            }
            children {
                id
                name
            }
        }
    }
`;

export interface SkillCategory {
    id: string;
    name: string;
    order: number;
    parent: SkillCategory | null;
    children: SkillCategory[];
}

export interface SkillCategoriesResponse {
    skillCategories: SkillCategory[];
}



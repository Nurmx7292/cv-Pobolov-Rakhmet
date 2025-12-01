import { gql } from "@apollo/client";

export const UPDATE_CV_SKILL = gql`
    mutation UpdateCvSkill($cvId: ID!, $name: String!, $categoryId: ID, $mastery: Mastery!) {
        updateCvSkill(skill: { cvId: $cvId, name: $name, categoryId: $categoryId, mastery: $mastery }) {
            id
        }
    }
`;

export interface UpdateCvSkillResponse {
    updateCvSkill: {
        id: string;
    };
}

export interface UpdateCvSkillVariables {
    cvId: string;
    name: string;
    categoryId?: string | null;
    mastery: string;
}


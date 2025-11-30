import { gql } from "@apollo/client";

export const ADD_CV_SKILL = gql`
    mutation AddCvSkill($cvId: ID!, $name: String!, $categoryId: String!, $mastery: Mastery!) {
        addCvSkill(skill: { cvId: $cvId, name: $name, categoryId: $categoryId, mastery: $mastery }) {
            id
        }
    }
`;

export interface AddCvSkillResponse {
    addCvSkill: {
        id: string;
    };
}

export interface AddCvSkillVariables {
    cvId: string;
    name: string;
    categoryId: string;
    mastery: string;
}


import { gql } from "@apollo/client";

export const DELETE_CV_SKILL = gql`
    mutation DeleteCvSkill($cvId: ID!, $name: [String!]!) {
        deleteCvSkill(skill: { cvId: $cvId, name: $name }) {
            id
        }
    }
`;

export interface DeleteCvSkillResponse {
    deleteCvSkill: {
        id: string;
    };
}

export interface DeleteCvSkillVariables {
    cvId: string;
    name: string[];
}


import { gql } from "@apollo/client";

export const ADD_CV_PROJECT = gql`
    mutation AddCvProject($project: AddCvProjectInput!) {
        addCvProject(project: $project) {
            id
        }
    }
`;

export interface AddCvProjectResponse {
    addCvProject: {
        id: string;
    };
}

export interface AddCvProjectVariables {
    project: {
        cvId: string;
        projectId: string;
        start_date: string;
        end_date: string | null;
        roles: string[];
        responsibilities: string[];
    };
}


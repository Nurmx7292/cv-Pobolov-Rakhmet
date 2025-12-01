import { gql } from "@apollo/client";

export const UPDATE_CV_PROJECT = gql`
    mutation UpdateCvProject($project: UpdateCvProjectInput!) {
        updateCvProject(project: $project) {
            id
        }
    }
`;

export interface UpdateCvProjectResponse {
    updateCvProject: {
        id: string;
    };
}

export interface UpdateCvProjectVariables {
    project: {
        cvId: string;
        projectId: string;
        start_date: string;
        end_date: string | null;
        roles: string[];
        responsibilities: string[];
    };
}


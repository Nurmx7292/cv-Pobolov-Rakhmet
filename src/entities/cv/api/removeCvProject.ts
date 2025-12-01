import { gql } from "@apollo/client";

export const REMOVE_CV_PROJECT = gql`
    mutation RemoveCvProject($project: RemoveCvProjectInput!) {
        removeCvProject(project: $project) {
            id
        }
    }
`;

export interface RemoveCvProjectResponse {
    removeCvProject: {
        id: string;
    };
}

export interface RemoveCvProjectVariables {
    project: {
        cvId: string;
        projectId: string;
    };
}


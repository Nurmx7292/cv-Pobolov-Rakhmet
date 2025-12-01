import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
    query Projects {
        projects {
            id
            name
            domain
            start_date
            end_date
            description
            environment
        }
    }
`;

export interface Project {
    id: string;
    name: string;
    domain: string;
    start_date: string;
    end_date: string | null;
    description: string;
    environment: string[];
}

export interface ProjectsResponse {
    projects: Project[];
}


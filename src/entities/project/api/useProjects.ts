import { useQuery } from "@apollo/client/react";
import { GET_PROJECTS, type ProjectsResponse } from "./getProjects.ts";

export const useProjects = () => {
    return useQuery<ProjectsResponse>(GET_PROJECTS);
};


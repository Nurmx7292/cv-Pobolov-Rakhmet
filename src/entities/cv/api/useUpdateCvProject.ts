import { useMutation } from "@apollo/client/react";
import {
    UPDATE_CV_PROJECT,
    type UpdateCvProjectResponse,
    type UpdateCvProjectVariables,
} from "./updateCvProject.ts";

export const useUpdateCvProject = () => {
    return useMutation<UpdateCvProjectResponse, UpdateCvProjectVariables>(
        UPDATE_CV_PROJECT,
    );
};


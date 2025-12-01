import { useMutation } from "@apollo/client/react";
import {
    ADD_CV_PROJECT,
    type AddCvProjectResponse,
    type AddCvProjectVariables,
} from "./addCvProject.ts";

export const useAddCvProject = () => {
    return useMutation<AddCvProjectResponse, AddCvProjectVariables>(
        ADD_CV_PROJECT,
    );
};


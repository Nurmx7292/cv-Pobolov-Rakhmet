import { useMutation } from "@apollo/client/react";
import {
    REMOVE_CV_PROJECT,
    type RemoveCvProjectResponse,
    type RemoveCvProjectVariables,
} from "./removeCvProject.ts";

export const useRemoveCvProject = () => {
    return useMutation<RemoveCvProjectResponse, RemoveCvProjectVariables>(
        REMOVE_CV_PROJECT,
    );
};


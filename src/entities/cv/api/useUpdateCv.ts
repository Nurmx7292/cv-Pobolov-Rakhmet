import { useMutation } from "@apollo/client/react";
import {
    UPDATE_CV,
    type UpdateCvResponse,
    type UpdateCvVariables,
} from "./updateCv.ts";

export const useUpdateCv = () => {
    return useMutation<UpdateCvResponse, UpdateCvVariables>(UPDATE_CV);
};


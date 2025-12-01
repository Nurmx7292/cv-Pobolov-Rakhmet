import { useMutation } from "@apollo/client/react";
import {
    DELETE_CV,
    type DeleteCvResponse,
    type DeleteCvVariables,
} from "./deleteCv.ts";
import { GET_CVS } from "./getCvs.ts";

export const useDeleteCv = () => {
    return useMutation<DeleteCvResponse, DeleteCvVariables>(DELETE_CV, {
        refetchQueries: [{ query: GET_CVS }],
        awaitRefetchQueries: true,
    });
};


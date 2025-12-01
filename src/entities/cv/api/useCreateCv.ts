import { useMutation } from "@apollo/client/react";
import {
    CREATE_CV,
    type CreateCvResponse,
    type CreateCvVariables,
} from "./createCv.ts";
import { GET_CVS } from "./getCvs.ts";

export const useCreateCv = () => {
    return useMutation<CreateCvResponse, CreateCvVariables>(CREATE_CV, {
        refetchQueries: [{ query: GET_CVS }],
        awaitRefetchQueries: true,
    });
};


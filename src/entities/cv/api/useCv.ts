import { useQuery } from "@apollo/client/react";
import {
    GET_CV,
    type CvResponse,
    type CvVariables,
} from "./getCv.ts";

export const useCv = (cvId: string | undefined) => {
    return useQuery<CvResponse, CvVariables>(
        GET_CV,
        {
            variables: { cvId: cvId! },
            skip: !cvId,
        },
    );
};


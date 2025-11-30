import { useQuery } from "@apollo/client/react";
import { GET_CVS, type CvsResponse } from "./getCvs.ts";

export const useCvs = () => {
    return useQuery<CvsResponse>(GET_CVS);
};


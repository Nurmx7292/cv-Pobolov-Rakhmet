import { useQuery } from "@apollo/client/react";
import { GET_LANGUAGES, type LanguagesResponse } from "./getLanguages.ts";

export const useLanguages = () => {
    return useQuery<LanguagesResponse>(GET_LANGUAGES);
};


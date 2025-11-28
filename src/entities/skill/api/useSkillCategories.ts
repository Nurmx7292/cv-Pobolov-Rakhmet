import { useQuery } from "@apollo/client";
import {
    GET_SKILL_CATEGORIES,
    type SkillCategoriesResponse,
} from "./getSkillCategories";

export const useSkillCategories = () => {
    return useQuery<SkillCategoriesResponse>(GET_SKILL_CATEGORIES);
};



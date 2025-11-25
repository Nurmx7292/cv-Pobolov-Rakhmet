const DEFAULT_GRAPHQL_URL = "https://cv-project-js.inno.ws/api/graphql";

const graphqlUrl = import.meta.env.VITE_GRAPHQL_API_URL ?? DEFAULT_GRAPHQL_URL;

export const env = {
    GRAPHQL_API_URL: graphqlUrl,
};


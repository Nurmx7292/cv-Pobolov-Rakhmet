import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import { env } from "@shared/config/env";
import { tokenStorage } from "@shared/lib/tokenStorage";

const httpLink = new HttpLink({
    uri: env.GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
    const token = tokenStorage.getAccessToken();

    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : undefined,
        },
    };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        graphQLErrors.forEach((graphQLError) => {
            if (
                graphQLError.message === "Unauthorized" ||
                graphQLError.extensions?.code === "UNAUTHENTICATED"
            ) {
                tokenStorage.clearTokens();
            }
        });
    }

    if (
        networkError &&
        "statusCode" in networkError &&
        (networkError.statusCode === 401 || networkError.statusCode === 403)
    ) {
        tokenStorage.clearTokens();
    }
});

export const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});


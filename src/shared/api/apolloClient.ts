import {
    ApolloClient,
    HttpLink,
    InMemoryCache,
    from,
    ApolloLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { env } from "@shared/config/env";
import { tokenStorage } from "@shared/lib/tokenStorage";

const httpLink = new HttpLink({
    uri: env.GRAPHQL_API_URL,
});

const authLink = new ApolloLink((operation, forward) => {
    const token = tokenStorage.getAccessToken();

    const operationContext = operation.getContext();
    const contextHeaders = operationContext.headers ?? {};

    operation.setContext(({ headers = {} }) => ({
        headers: {
            ...headers,
            ...contextHeaders,
            Authorization:
                contextHeaders.Authorization ??
                (token ? `Bearer ${token}` : undefined),
        },
    }));

    return forward(operation);
});

const errorLink = onError(
    ({ graphQLErrors, networkError, operation }) => {
        if (graphQLErrors) {
            graphQLErrors.forEach((graphQLError) => {
                console.error("GraphQL Error:", {
                    message: graphQLError.message,
                    locations: graphQLError.locations,
                    path: graphQLError.path,
                    extensions: graphQLError.extensions,
                    operation: operation.operationName,
                    variables: operation.variables,
                });

                if (
                    graphQLError.message === "Unauthorized" ||
                    graphQLError.extensions?.code === "UNAUTHENTICATED"
                ) {
                    tokenStorage.clearTokens();
                }
            });
        }

        if (networkError) {
            console.error("Network Error:", {
                message: networkError.message,
                statusCode:
                    "statusCode" in networkError
                        ? networkError.statusCode
                        : undefined,
                operation: operation.operationName,
                variables: operation.variables,
            });

            if (
                "statusCode" in networkError &&
                (networkError.statusCode === 401 ||
                    networkError.statusCode === 403)
            ) {
                tokenStorage.clearTokens();
            }
        }
    }
);

export const apolloClient = new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
});

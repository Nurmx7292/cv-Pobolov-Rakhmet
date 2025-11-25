import { ApolloProvider } from "@apollo/client/react";
import type { ReactNode } from "react";
import { apolloClient } from "@shared/api/apolloClient";

interface AppProvidersProps {
    children: ReactNode;
}

export const WithApolloProvider = ({ children }: AppProvidersProps) => {
    return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
};


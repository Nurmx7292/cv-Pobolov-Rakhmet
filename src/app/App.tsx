import { WithApolloProvider } from "./providers/WithApolloProvider.tsx";
import { AppRouter } from "./providers/router/AppRouter.tsx";

export const App = () => {
    return (
        <WithApolloProvider>
            <AppRouter />
        </WithApolloProvider>
    );
};


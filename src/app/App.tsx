import { WithApolloProvider } from "./providers/WithApolloProvider.tsx";
import { WithThemeProvider } from "./providers/WithThemeProvider.tsx";
import { AppRouter } from "./providers/router/AppRouter.tsx";

export const App = () => {
    return (
        <WithThemeProvider>
            <WithApolloProvider>
                <AppRouter />
            </WithApolloProvider>
        </WithThemeProvider>
    );
};


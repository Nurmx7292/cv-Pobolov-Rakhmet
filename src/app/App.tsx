import { WithApolloProvider } from "./providers/WithApolloProvider.tsx";
import { WithThemeProvider } from "./providers/WithThemeProvider.tsx";
import { AppRouter } from "./providers/router/AppRouter.tsx";
import { NotificationProvider } from "@shared/lib/notifications";

export const App = () => {
    return (
        <WithThemeProvider>
            <NotificationProvider>
                <WithApolloProvider>
                    <AppRouter />
                </WithApolloProvider>
            </NotificationProvider>
        </WithThemeProvider>
    );
};


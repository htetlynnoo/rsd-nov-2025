import { ThemeProvider } from "../components/ThemeProvider";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider, useQueryClient } from "react-query";

const queryClient = new QueryClient();

export default function RootLayout() {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <Stack>
                    <Stack.Screen
                        name="(home)"
                        options={{ title: "Home", headerShown: false }}
                    />
                    <Stack.Screen
                        name="add"
                        options={{ title: "Add Post", presentation: "modal" }}
                    />
                </Stack>
            </ThemeProvider>
        </QueryClientProvider>
    );
}

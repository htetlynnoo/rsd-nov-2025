import React from "react";
import { TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useTheme } from "./ThemeProvider";

export const ThemeSwitchButton = () => {
    const { isDark, toggleTheme } = useTheme();

    return (
        <TouchableOpacity onPress={toggleTheme}>
            {isDark ? (
                <Ionicons name="sunny-outline" size={64} color="white" />
            ) : (
                <Ionicons name="moon-outline" size={48} color="Dark" />
            )}
        </TouchableOpacity>
    );
};

import { Text, View } from "react-native";
import { Link } from "expo-router";
import { ThemeSwitchButton } from "../../components/ThemeSwitchButton";
import { StyleSheet } from "react-native";

export default function Settings() {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <ThemeSwitchButton />
        </View>
    );
}

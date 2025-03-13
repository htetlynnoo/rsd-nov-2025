import { View, TouchableOpacity, StyleSheet } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { useMutation, useQueryClient } from "react-query";
import Text from "./Text";
import { useTheme } from "@react-navigation/native";

import type { ItemType } from "../types/ItemType";
import { formatDistance } from "date-fns";
const styles = StyleSheet.create({
    card: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    cardHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    author: {
        flexDirection: "row",
        gap: 5,
        alignItems: "center",
    },
    time: {
        color: "gray",
    },
    authorName: {
        fontWeight: "bold",
        fontSize: 16,
    },
    content: {
        fontSize: 16,
        lineHeight: 26,
    },
});

async function deleteItem(id: number) {
    const res = await fetch(`http://localhost:8080/posts/${id}`, {
        method: "DELETE",
    });

    if (!res.ok) {
        throw new Error("Failed to delete item");
    }

    return res.json();
}

export default function Item({ item }: { item: ItemType }) {
    const queryClient = useQueryClient();
    const { colors } = useTheme();

    const remove = useMutation(deleteItem, {
        onMutate: async id => {
            await queryClient.cancelQueries("posts");
            await queryClient.setQueryData<ItemType[] | undefined>(
                "posts",
                old => {
                    return old?.filter(item => item.id !== id);
                }
            );
        },
    });

    return (
        <View style={[styles.card, { borderColor: colors.border }]}>
            <View style={styles.cardHeader}>
                <View style={styles.author}>
                    <Ionicons name="person-circle" size={32} color="#FFA725" />
                    <Text style={styles.authorName}>{item.user.name}</Text>
                    <Text style={styles.time}>
                        {formatDistance(new Date(), item.created)}
                    </Text>
                </View>
                <TouchableOpacity onPress={() => remove.mutate(item.id)}>
                    <Ionicons name="trash-outline" color="gray" size={18} />
                </TouchableOpacity>
            </View>
            <View>
                <Text style={styles.content}>{item.content}</Text>
            </View>
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginTop: 10,
                }}
            >
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity>
                        <Ionicons name="heart-outline" size={18} color="red" />
                    </TouchableOpacity>
                    <Text style={{ color: "gray" }}>12</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity>
                        <Ionicons
                            name="chatbubble-outline"
                            size={18}
                            color="green"
                        />
                    </TouchableOpacity>
                    <Text style={{ color: "gray" }}>5</Text>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity>
                        <Ionicons
                            name="share-social-outline"
                            size={18}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", gap: 8 }}>
                    <TouchableOpacity>
                        <Ionicons
                            name="ellipsis-vertical-outline"
                            size={18}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

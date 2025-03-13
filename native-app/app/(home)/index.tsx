import { Text, ScrollView } from "react-native";
import { useQuery, useQueryClient } from "react-query";

import Item from "../../components/item";

import type { ItemType } from "../../types/ItemType";

async function fetchItems(): Promise<ItemType[]> {
    const res = await fetch("http://localhost:8080/posts");

    if (!res.ok) {
        throw new Error("Network res is not ok");
    }

    return res.json();
}

export default function Index() {
    const { data, error, isLoading } = useQuery<ItemType[], Error>(
        "posts",
        fetchItems
    );

    if (isLoading) return <Text>Loading ......</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
    if (!data) return <Text>no data</Text>;

    return (
        <ScrollView>
            {data.map(item => (
                <Item key={item.id} item={item} />
            ))}
        </ScrollView>
    );
}

import React from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";

import { ExpoRoot, Link, router } from "expo-router";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient, useMutation } from "react-query";
import Text from "../components/Text";

import type { ItemType } from "../types/ItemType";
import { red } from "react-native-reanimated/lib/typescript/Colors";

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    input: {
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        padding: 10,
        fontSize: 18,
    },
    button: {
        backgroundColor: "blue",
        padding: 10,
        alignItems: "center",
    },
    buttonText: {
        color: "white",
    },
});

const postContent = async (content: string) => {
    const res = await fetch("http://localhost:8080/posts", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
    });

    if (!res.ok) {
        throw new Error("Network res was not ok");
    } // error pya khine htrr top succcess m phit yin error pya mhrpl //

    return res.json();
};

export default function Add() {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<{ content: string }>();

    const queryClient = useQueryClient();

    const onSubmit = (data: { content: string }) => {
        add.mutate(data.content); //content htl mhr shi tk value ko add mutate function khaaw lite tl //
        router.push("../");
    };

    const add = useMutation(postContent, {
        onSuccess: async item => {
            await queryClient.cancelQueries("posts");
            await queryClient.setQueryData<ItemType[] | undefined>(
                "posts",
                old => {
                    return old ? [item, ...old] : [item];
                }
            );
        },
        onError: error => {
            console.error("Error posting content:", error);
        },
    });

    return (
        <View style={styles.container}>
            <Controller
                control={control}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={[
                            styles.input,
                            errors.content && {
                                borderColor: "red",
                            },
                        ]}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        value={value}
                        placeholder="Enter content"
                        multiline
                    />
                )}
                name="content" //key anay nk thu ka youk twrr tl  "content" : value //
                defaultValue=""
            />
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />

            <View style={{ marginTop: 10 }}>
                <Link href="../" style={{ textAlign: "center" }}>
                    <Text>Cancel</Text>
                </Link>
            </View>
        </View>
    );
}

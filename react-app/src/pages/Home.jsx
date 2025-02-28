import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
} from "@tanstack/react-query";
import Item from "../components/Item";
import { Typography } from "@mui/material";

const api = "http://localhost:8080/posts";
async function fetchPosts() {
    const res = await fetch(api);

    return res.json();
}

async function deletePost(id) {
    const res = await fetch(`${api}/${id}`, {
        method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to delete post");
}

export default function Home() {
    const { data, error, isLoading } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    });
    const queryClient = useQueryClient();

    const remove = useMutation({
        mutationFn: deletePost,
        onMutate: id => {
            queryClient.setQueryData(["posts"], old => {
                return old.filter(post => {
                    return post.id != id;
                });
            });
        },
    });

    if (error) {
        return <Typography>{error.message}</Typography>;
    }

    if (isLoading) {
        return <Typography>Loading .....</Typography>;
    }

    return (
        <>
            {data.map(post => {
                return (
                    <Item key={post.id} post={post} remove={remove.mutate} />
                );
            })}
        </>
    );
}

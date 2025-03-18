import {
    Card,
    CardContent,
    Box,
    IconButton,
    Button,
    Typography,
    Avatar,
    ButtonGroup,
    Icon,
} from "@mui/material";

import { useApp } from "../AppProvider";

import { Delete as DeleteIcon } from "@mui/icons-material";
import { blue } from "@mui/material/colors";

import {
    FavoriteBorderOutlined as LikeIcon,
    Favorite as LikedIcon,
    ChatBubbleOutline as CommentIcon,
} from "@mui/icons-material";

export default function Item({ post, remove }) {
    const { auth } = useApp();
    return (
        <Card sx={{ mb: 3 }}>
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}
                >
                    <Box sx={{ display: "flex", mb: 2, gap: 2 }}>
                        <Avatar
                            sx={{
                                width: 32,
                                height: 32,
                                background: blue[500],
                            }}
                        ></Avatar>
                        <Typography sx={{ fontWeight: "bold" }}>
                            {post.user.name}
                        </Typography>
                    </Box>
                    {auth && auth.id === post.user.id && (
                        <IconButton
                            size="small"
                            onClick={() => remove(post.id)}
                        >
                            <DeleteIcon sx={{ fontSize: "24" }} />
                        </IconButton>
                    )}
                </Box>

                <Typography>{post.content}</Typography>

                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        justifyContent: "flex-end",
                        mt: 2,
                    }}
                >
                    <ButtonGroup>
                        <IconButton size="small">
                            <LikeIcon color="error" sx={{ fontSize: 21 }} />
                        </IconButton>
                        <Button variant="text" size="small">
                            8
                        </Button>
                    </ButtonGroup>
                    <ButtonGroup>
                        <IconButton size="small">
                            <CommentIcon
                                color="success"
                                sx={{ fontSize: 21 }}
                            />
                        </IconButton>
                        <Button variant="text" size="small">
                            4
                        </Button>
                    </ButtonGroup>
                </Box>
            </CardContent>
        </Card>
    );
}

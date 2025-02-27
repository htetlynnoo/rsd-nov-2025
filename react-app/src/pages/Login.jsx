import { useForm } from "react-hook-form";
import { Box, Typography, OutlinedInput, Button } from "@mui/material";
import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";

export default function Login() {
    const { setAuth } = useApp();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm();

    const submitLogin = () => {
        setAuth(true);
        navigate("/");
    };

    return (
        <Box>
            <Typography variant="h3">Login</Typography>
            <form onSubmit={handleSubmit(submitLogin)}>
                <OutlinedInput
                    fullWidth
                    placeholder="username"
                    {...register("username", { required: true })}
                    sx={{ mt: 2 }}
                />
                {errors.username && (
                    <Typography color="error">
                        This field is required
                    </Typography>
                )}
                <OutlinedInput
                    fullWidth
                    type="password"
                    placeholder="password"
                    {...register("password", { required: true })}
                    sx={{ mt: 2 }}
                />
                {errors.password && (
                    <Typography color="error">
                        This field is required
                    </Typography>
                )}
                <Button
                    type="submit"
                    fullWidth
                    sx={{ mt: 2 }}
                    variant="contained"
                >
                    Login
                </Button>
            </form>
        </Box>
    );
}

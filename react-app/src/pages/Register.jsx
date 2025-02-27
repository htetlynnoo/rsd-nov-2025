import { useForm } from "react-hook-form";
import { Box, Typography, OutlinedInput, Button } from "@mui/material";
import { useApp } from "../AppProvider";
import { useNavigate } from "react-router";

export default function Register() {
    const { setAuth } = useApp();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,

        formState: { errors },
    } = useForm();

    const submitRegister = () => {
        navigate("/login");
    };

    return (
        <Box>
            <Typography variant="h3">Register</Typography>
            <form onSubmit={handleSubmit(submitRegister)}>
                <OutlinedInput
                    fullWidth
                    placeholder="name"
                    {...register("name", { required: true })}
                    sx={{ mt: 2 }}
                />
                {errors.name && (
                    <Typography color="error">
                        This field is required
                    </Typography>
                )}
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
                    placeholder="bio"
                    {...register("bio")}
                    sx={{ mt: 2 }}
                />

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
                    Register
                </Button>
            </form>
        </Box>
    );
}

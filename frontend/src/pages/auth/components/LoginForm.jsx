import { Box, Link, Paper, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AppTextField from "../../../components/AppTextField";
import PrimaryButton from "../../../components/PrimaryButton";

import { useAuth } from "../../../hooks/useAuth";

export default function LoginForm() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const user = await login(data);

      toast.success("Login successful!");

      if (user.role === "ADMIN") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Invalid email or password."
      );
    }
  };

  return (
    <Paper
      elevation={4}
      sx={{
        maxWidth: 450,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
      }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
      >
        Welcome Back
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        mb={3}
      >
        Sign in to continue
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AppTextField
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />

        <AppTextField
          label="Password"
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />

        <Box mt={2}>
          <PrimaryButton
            type="submit"
            fullWidth
            loading={isSubmitting}
          >
            Login
          </PrimaryButton>
        </Box>
      </Box>

      <Typography
        align="center"
        mt={3}
      >
        Don't have an account?{" "}
        <Link
          component="button"
          underline="hover"
          onClick={() => navigate("/register")}
        >
          Register
        </Link>
      </Typography>
    </Paper>
  );
}
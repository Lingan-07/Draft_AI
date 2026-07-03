import { Box, Link, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AppTextField from "../../../components/AppTextField";
import PrimaryButton from "../../../components/PrimaryButton";

import { registerUser } from "../../../api/authApi";

export default function RegisterForm() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await registerUser(data);

      toast.success("Registration successful!");

      navigate("/", {
        replace: true,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          "Registration failed."
      );
    }
  };

  return (
    <Box>
      <Typography
        variant="h4"
        fontWeight="bold"
        align="center"
        gutterBottom
      >
        Create Account
      </Typography>

      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        mb={3}
      >
        Register to start using AI Draft Assistant
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AppTextField
          label="Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 3,
              message: "Name must be at least 3 characters",
            },
            maxLength: {
              value: 100,
              message: "Name cannot exceed 100 characters",
            },
          })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <AppTextField
          label="Email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email address",
            },
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
            Register
          </PrimaryButton>
        </Box>
      </Box>

      <Typography
        align="center"
        mt={3}
      >
        Already have an account?{" "}
        <Link
          component="button"
          underline="hover"
          onClick={() => navigate("/")}
        >
          Login
        </Link>
      </Typography>
    </Box>
  );
}
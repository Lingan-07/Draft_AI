import { Box, Card } from "@mui/material";
import {
  Controller,
  useForm,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AppTextField from "../../../components/AppTextField";
import AppSelect from "../../../components/AppSelect";
import AppTextArea from "../../../components/AppTextArea";
import PrimaryButton from "../../../components/PrimaryButton";
import SecondaryButton from "../../../components/SecondaryButton";

import { createDraft } from "../../../api/draftApi";

const DraftForm = ({ template }) => {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      title: template?.template_name ?? "",
      message_type: template?.message_type ?? "",
      tone: template?.default_tone ?? "",
      rough_points: template?.prompt_text ?? "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const draft = await createDraft(data);

      toast.success("Draft created successfully.");

      navigate(`/drafts/${draft.id}`);
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Failed to create draft."
      );
    }
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        p: 3,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <AppTextField
          label="Draft Title"
          {...register("title", {
            required: "Title is required",
            minLength: {
              value: 3,
              message:
                "Title must be at least 3 characters",
            },
          })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />

        <Controller
          name="message_type"
          control={control}
          rules={{
            required: "Message type is required",
          }}
          render={({ field }) => (
            <AppSelect
              label="Message Type"
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              inputRef={field.ref}
              error={!!errors.message_type}
              helperText={
                errors.message_type?.message
              }
              options={[
                {
                  value: "EMAIL",
                  label: "Email",
                },
                {
                  value: "MESSAGE",
                  label: "Message",
                },
              ]}
            />
          )}
        />

        <Controller
          name="tone"
          control={control}
          rules={{
            required: "Tone is required",
          }}
          render={({ field }) => (
            <AppSelect
              label="Tone"
              value={field.value}
              onChange={field.onChange}
              name={field.name}
              inputRef={field.ref}
              error={!!errors.tone}
              helperText={errors.tone?.message}
              options={[
                {
                  value: "Professional",
                  label: "Professional",
                },
                {
                  value: "Formal",
                  label: "Formal",
                },
                {
                  value: "Friendly",
                  label: "Friendly",
                },
                {
                  value: "Persuasive",
                  label: "Persuasive",
                },
              ]}
            />
          )}
        />

        <AppTextArea
          label="Key Points / Requirements"
          rows={8}
          {...register("rough_points", {
            required:
              "Please enter the key points",
            minLength: {
              value: 10,
              message:
                "Enter at least 10 characters",
            },
          })}
          error={!!errors.rough_points}
          helperText={
            errors.rough_points?.message
          }
        />

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            gap: 2,
            mt: 3,
          }}
        >
          <SecondaryButton
            type="button"
            onClick={() => reset()}
          >
            Clear
          </SecondaryButton>

          <PrimaryButton
            type="submit"
            loading={isSubmitting}
          >
            Create Draft
          </PrimaryButton>
        </Box>
      </Box>
    </Card>
  );
};

export default DraftForm;
import { useCallback, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, Card } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import PageHeader from "../../components/PageHeader";

import AppTextField from "../../components/AppTextField";
import AppTextArea from "../../components/AppTextArea";
import AppSelect from "../../components/AppSelect";

import PrimaryButton from "../../components/PrimaryButton";
import SecondaryButton from "../../components/SecondaryButton";

import {
  createTemplate,
  updateTemplate,
  getTemplate,
} from "../../api/templateApi";

const TemplateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = Boolean(id);

  const {
    control,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm({
    defaultValues: {
      template_name: "",
      message_type: "",
      default_tone: "",
      prompt_text: "",
    },
  });

  const loadTemplate = useCallback(async () => {
    if (!isEdit) return;

    try {
      const data = await getTemplate(id);
      reset(data);
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Failed to load template."
      );
    }
  }, [id, isEdit, reset]);

  useEffect(() => {
    loadTemplate();
  }, [loadTemplate]);

  const onSubmit = async (data) => {
    try {
      if (isEdit) {
        await updateTemplate(id, data);

        toast.success(
          "Template updated successfully."
        );
      } else {
        await createTemplate(data);

        toast.success(
          "Template created successfully."
        );
      }

      navigate("/admin/templates");
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Operation failed."
      );
    }
  };

  return (
    <Box>
      <PageHeader
        title={
          isEdit
            ? "Edit Template"
            : "Create Template"
        }
      />

      <Card
        elevation={0}
        sx={{
          mt: 3,
          p: 4,
          maxWidth: 900,
          borderRadius: 4,
          bgcolor: "background.paper",
          border: 1,
          borderColor: "divider",
        }}
      >
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Controller
            name="template_name"
            control={control}
            rules={{
              required: "Template name is required",
            }}
            render={({ field }) => (
              <AppTextField
                {...field}
                label="Template Name"
                error={!!errors.template_name}
                helperText={
                  errors.template_name?.message
                }
              />
            )}
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
            name="default_tone"
            control={control}
            rules={{
              required: "Tone is required",
            }}
            render={({ field }) => (
              <AppSelect
                label="Default Tone"
                value={field.value}
                onChange={field.onChange}
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

          <Controller
            name="prompt_text"
            control={control}
            rules={{
              required: "Prompt is required",
            }}
            render={({ field }) => (
              <AppTextArea
                {...field}
                rows={10}
                label="Prompt"
                error={!!errors.prompt_text}
                helperText={
                  errors.prompt_text?.message
                }
              />
            )}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
              mt: 4,
            }}
          >
            <SecondaryButton
              type="button"
              onClick={() =>
                navigate("/admin/templates")
              }
            >
              Cancel
            </SecondaryButton>

            <PrimaryButton
              loading={isSubmitting}
              type="submit"
            >
              {isEdit
                ? "Update Template"
                : "Create Template"}
            </PrimaryButton>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default TemplateForm;
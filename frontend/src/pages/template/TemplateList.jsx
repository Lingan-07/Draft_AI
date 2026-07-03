import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import toast from "react-hot-toast";

import PageHeader from "../../components/PageHeader";
import { getTemplates } from "../../api/templateApi";
import styles from "./Styles";

const TemplateList = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTemplates = useCallback(async () => {
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Failed to load templates."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTemplates();
  }, [loadTemplates]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        mt={8}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader title="Templates" />

      {templates.length === 0 ? (
        <Typography
          textAlign="center"
          color="text.secondary"
          mt={8}
        >
          No templates available.
        </Typography>
      ) : (
        <Grid
          container
          spacing={3}
          sx={styles.list_grid}
        >
          {templates.map((template) => (
            <Grid
              key={template.id}
              size={{
                xs: 12,
                sm: 6,
                md: 4,
              }}
            >
              <Card
                elevation={0}
                sx={styles.list_card}
              >
                <CardContent
                  sx={styles.list_cardcontent}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    gutterBottom
                  >
                    {template.template_name}
                  </Typography>

                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    flexWrap="wrap"
                    mb={2}
                  >
                    <Chip
                      label={template.message_type}
                      color="primary"
                      size="small"
                    />

                    <Chip
                      label={template.default_tone}
                      color="success"
                      size="small"
                    />

                    <Chip
                      label={
                        template.is_active
                          ? "Active"
                          : "Inactive"
                      }
                      color={
                        template.is_active
                          ? "success"
                          : "default"
                      }
                      size="small"
                    />
                  </Stack>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={styles.list_typography_prompt}
                  >
                    {template.prompt_text}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={styles.list_typography_created}
                  >
                    Created on{" "}
                    {new Date(
                      template.created_at
                    ).toLocaleDateString()}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={styles.list_button}
                    onClick={() =>
                      navigate(
                        "/drafts/create",
                        {
                          state: {
                            template,
                          },
                        }
                      )
                    }
                  >
                    Create Draft
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TemplateList;
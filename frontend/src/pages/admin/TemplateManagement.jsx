import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

import AddRoundedIcon from "@mui/icons-material/AddRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

import toast from "react-hot-toast";

import PageHeader from "../../components/PageHeader";

import {
  getTemplates,
  deleteTemplate,
} from "../../api/templateApi";

const TemplateManagement = () => {
  const navigate = useNavigate();

  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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

  const handleDelete = async () => {
    try {
      await deleteTemplate(selectedTemplate.id);

      toast.success("Template deleted.");

      setDeleteDialog(false);

      loadTemplates();
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Delete failed."
      );
    }
  };

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
      <PageHeader title="Manage Templates"/>

      <Box
        display="flex"
        justifyContent="flex-end"
        mb={3}
        sx={{pt:3}}
      >
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          onClick={() =>
            navigate("/admin/templates/new")
          }
        >
          New Template
        </Button>
      </Box>

      <Grid container spacing={3} sx={{pt:3}}>
        {templates.map((template) => (
          <Grid
            key={template.id}
            size={{ xs: 12, md: 6 }}
          >
            <Card
              elevation={0}
              sx={{
                border: "1px solid #E5E7EB",
                borderRadius: 2,
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  fontWeight={700}
                >
                  {template.template_name}
                </Typography>

                <Stack
                  direction="row"
                  spacing={1}
                  mt={2}
                  mb={2}
                  sx={{gap:1, pt:1, pb:1}}
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
                    size="small"
                  />
                </Stack>

                <Typography
                  color="text.secondary"
                >
                  {template.prompt_text}
                </Typography>

                <Stack
                  direction="row"
                  spacing={2}
                  sx={{pt:2}}
                >
                  <Button
                    startIcon={<EditRoundedIcon />}
                    onClick={() =>
                      navigate(
                        `/admin/templates/${template.id}/edit`
                      )
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    color="error"
                    startIcon={<DeleteRoundedIcon />}
                    onClick={() => {
                      setSelectedTemplate(
                        template
                      );
                      setDeleteDialog(true);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={deleteDialog}
        onClose={() =>
          setDeleteDialog(false)
        }
      >
        <DialogTitle>
          Delete Template
        </DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete
            this template?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button
            onClick={() =>
              setDeleteDialog(false)
            }
          >
            Cancel
          </Button>

          <Button
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TemplateManagement;
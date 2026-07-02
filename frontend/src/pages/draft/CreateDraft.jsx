import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import DraftForm from "./components/DraftForm";

const CreateDraft = () => {
  const location = useLocation();

  const template = location.state?.template;

  return (
    <Box>
      <PageHeader title="Create New Draft" />

      <Box sx={{ mt: 3 }}>
        <DraftForm template={template} />
      </Box>
    </Box>
  );
};

export default CreateDraft;
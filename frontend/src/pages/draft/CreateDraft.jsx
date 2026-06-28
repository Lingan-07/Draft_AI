import { Box } from "@mui/material";

import PageHeader from "../../components/common/PageHeader";
import DraftForm from "../../components/draft/DraftForm";

const CreateDraft = () => {
  return (
    <Box>
      <PageHeader title="Create New Draft" />

      <Box
        sx={{
          mt: 3,
        }}
      >
        <DraftForm />
      </Box>
    </Box>
  );
};

export default CreateDraft;
import { Box } from "@mui/material";
import { useLocation } from "react-router-dom";

import PageHeader from "../../components/PageHeader";
import DraftForm from "./components/DraftForm";
import styles from "./components/Styles";

const CreateDraft = () => {
  const location = useLocation();

  const template = location.state?.template;

  return (
    <Box>
      <PageHeader title="Create New Draft" />

      <Box sx={styles.create_box}>
        <DraftForm template={template} />
      </Box>
    </Box>
  );
};

export default CreateDraft;
import { Box, Card } from "@mui/material";

import AppTextField from "../common/AppTextField";
import AppSelect from "../common/AppSelect";
import AppTextArea from "../common/AppTextArea";

import PrimaryButton from "../common/PrimaryButton";
import SecondaryButton from "../common/SecondaryButton";

const DraftForm = () => {
  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 4,
        border: "1px solid #E5E7EB",
        p: 2,
      }}
    >
      <AppTextField
        label="Draft Title"
      />

      <AppTextField
        label="Recipient"
      />

      <AppSelect
        label="Message Type"
        value=""
        options={[
          {
            value: "Email",
            label: "Email",
          },
          {
            value: "Message",
            label: "Message",
          },
          {
            value: "LinkedIn",
            label: "LinkedIn",
          },
        ]}
      />

      <AppSelect
        label="Tone"
        value=""
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

      <AppTextArea
        label="Key Points / Requirements"
        rows={8}
      />

      <Box sx={{
        display: "flex",
        justifyContent: "flex-end",
        mt: 3,
        gap: 3}}
      >
        <SecondaryButton>
          Clear
        </SecondaryButton>

        <PrimaryButton>
          Generate Draft
        </PrimaryButton>
      </Box>
    </Card>
  );
};

export default DraftForm;
import { useState } from "react";

import {
  Button,
  Card,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";

import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import CompressRoundedIcon from "@mui/icons-material/CompressRounded";
import UnfoldMoreRoundedIcon from "@mui/icons-material/UnfoldMoreRounded";
import HistoryRoundedIcon from "@mui/icons-material/HistoryRounded";

import AppSelect from "../../../components/AppSelect";
import styles from "./Styles";

const DraftActionCard = ({
  loading,
  tone,
  onGenerate,
  onRewrite,
  onImprove,
  onExpand,
  onShorten,
  onChangeTone,
  onHistory,
}) => {
  const [selectedTone, setSelectedTone] = useState(tone);

  return (
    <Card
      elevation={0}
      sx={styles.actioncard_card}
    >
      <CardContent sx={styles.actioncard_cardcontent}>
        <Typography
          variant="h6"
          fontWeight={700}
          mb={3}
        >
          AI Actions
        </Typography>

        <Stack spacing={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<AutoAwesomeRoundedIcon />}
            onClick={onGenerate}
            disabled={loading}
          >
            Generate
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            onClick={onRewrite}
            disabled={loading}
          >
            Rewrite
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<TrendingUpRoundedIcon />}
            onClick={onImprove}
            disabled={loading}
          >
            Improve
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<UnfoldMoreRoundedIcon />}
            onClick={onExpand}
            disabled={loading}
          >
            Expand
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<CompressRoundedIcon />}
            onClick={onShorten}
            disabled={loading}
          >
            Shorten
          </Button>
        </Stack>

        <Divider sx={styles.divider} />

        <Typography
          variant="subtitle2"
          mb={2}
        >
          Change Tone
        </Typography>

        <AppSelect
          label="Tone"
          value={selectedTone}
          onChange={(e) =>
            setSelectedTone(e.target.value)
          }
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

        <Button
          fullWidth
          sx={styles.actioncard_button}
          variant="contained"
          onClick={() => onChangeTone(selectedTone)}
          disabled={loading}
        >
          Apply Tone
        </Button>

        <Divider sx={styles.actioncard_divider} />

        <Button
          fullWidth
          variant="text"
          startIcon={<HistoryRoundedIcon />}
          onClick={onHistory}
        >
          Version History
        </Button>
      </CardContent>
    </Card>
  );
};

export default DraftActionCard;
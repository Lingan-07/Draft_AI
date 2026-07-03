import { Card, CardContent, Typography, Box } from "@mui/material";
import styles from "./Styles";

const StatCard = ({ title, value, icon, color = "#2563EB" }) => {
  return (
    <Card
      elevation={0}
      sx={styles.statcard_card}
    >
      <CardContent
        sx={styles.statcard_cardcontent}
      >
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            mb={1}
          >
            {title}
          </Typography>

          <Typography
            variant="h4"
            fontWeight={700}
          >
            {value}
          </Typography>
        </Box>

        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            bgcolor: `${color}20`,
            color,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StatCard;
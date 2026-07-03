import { Box, Container, Paper, Typography } from "@mui/material";
import styles from "./Styles";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={styles.auth_box}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={styles.auth_paper}
        >
          {/* Left Side */}
          <Box
            sx={styles.auth_left_side}
          >
            <Typography
              variant="h3"
              fontWeight="bold"
              gutterBottom
            >
              AI Draft Assistant
            </Typography>

            <Typography
              variant="h6"
              align="center"
            >
              Generate professional emails and messages in seconds using AI.
            </Typography>
          </Box>

          {/* Right Side */}
          <Box
            sx={styles.auth_right_side}
          >
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
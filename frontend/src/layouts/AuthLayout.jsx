import { Box, Container, Paper, Typography } from "@mui/material";

export default function AuthLayout({ children }) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
        color: "text.primary",
        p: 2,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            overflow: "hidden",
            borderRadius: 4,
            display: "flex",
            minHeight: "650px",
          }}
        >
          {/* Left Side */}
          <Box
            sx={{
              width: "50%",
              bgcolor: "primary.main",
              color: "white",
              display: {
                xs: "none",
                md: "flex",
              },
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: 6,
            }}
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
            sx={{
              flex: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              p: 5,
            }}
          >
            {children}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
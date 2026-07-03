import { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import toast from "react-hot-toast";

import PageHeader from "../../components/PageHeader";
import styles from "./Styles";
import { getProfile } from "../../api/profileApi";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadProfile = useCallback(async () => {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      toast.error(
        error.response?.data?.detail ??
          "Failed to load profile."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

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

  if (!profile) {
    return null;
  }

  return (
    <Box>
      <PageHeader title="My Profile" />

      <Card
        elevation={0}
        sx={styles.card}
      >
        <CardContent sx={styles.cardcontent}>
          <Stack
            spacing={3}
            alignItems="center"
          >
          <Box sx={styles.box}>
            <Avatar
              sx={styles.avatar}
            >
              {profile.name.charAt(0).toUpperCase()}
            </Avatar>

            <Typography
              variant="h5"
              fontWeight={700}
              sx={styles.typography}
            >
              {profile.name}
            </Typography>
          </Box>
            <Typography color="text.secondary">
              {profile.email}
            </Typography>

            <Chip
              label={profile.role}
              color="primary"
            />

            <Divider flexItem />

            <Stack
              spacing={2}
              width="100%"
            >
              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Name
                </Typography>

                <Typography>
                  {profile.name}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Email
                </Typography>

                <Typography>
                  {profile.email}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Role
                </Typography>

                <Typography>
                  {profile.role}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="body2"
                  color="text.secondary"
                >
                  Account Status
                </Typography>

                <Chip
                  label={
                    profile.is_active
                      ? "Active"
                      : "Inactive"
                  }
                  color={
                    profile.is_active
                      ? "success"
                      : "default"
                  }
                  size="small"
                />
              </Box>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
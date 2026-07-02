import api from "./axios";

export const getUserDashboard = async () => {
  const response = await api.get("/dashboard");
  return response.data;
};

export const getAdminDashboard = async () => {
  const response = await api.get("/admin/dashboard");
  return response.data;
};
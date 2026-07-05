import api from "./axios";

export const createDraft = async (data) => {
  const response = await api.post("/drafts", data);
  return response.data;
};

export const getAllDrafts = async (search = "") => {
  const response = await api.get("/drafts", {
    params: {
      search,
    },
  });

  return response.data;
};

export const getDraft = async (id) => {
  const response = await api.get(`/drafts/${id}`);
  return response.data;
};

export const updateDraft = async (id, data) => {
  const response = await api.put(`/drafts/${id}`, data);
  return response.data;
};

export const deleteDraft = async (id) => {
  const response = await api.delete(`/drafts/${id}`);
  return response.data;
};

export const generateDraft = async (id) => {
  const response = await api.post(`/drafts/${id}/generate`);
  return response.data;
};

export const rewriteDraft = async (id) => {
  const response = await api.post(`/drafts/${id}/rewrite`);
  return response.data;
};

export const improveDraft = async (id) => {
  const response = await api.post(`/drafts/${id}/improve`);
  return response.data;
};

export const expandDraft = async (id) => {
  const response = await api.post(`/drafts/${id}/expand`);
  return response.data;
};

export const shortenDraft = async (id) => {
  const response = await api.post(`/drafts/${id}/shorten`);
  return response.data;
};

export const changeTone = async (id, tone) => {
  const response = await api.post(`/drafts/${id}/change-tone`, {
    tone,
  });

  return response.data;
};

export const getDraftVersions = async (id) => {
  const response = await api.get(`/drafts/${id}/versions`);
  return response.data;
};

export const reuseDraft = async (id) => {
  const response = await api.post(`/drafts/${id}/reuse`);
  return response.data;
};
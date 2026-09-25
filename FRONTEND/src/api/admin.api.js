import axiosInstance from "../utils/axiosInstance";

export const getAdminStats = async () => {
  const { data } = await axiosInstance.get("/api/admin/stats");
  return data.stats;
};

export const getAllSystemUrls = async (search = "") => {
  const params = search ? `?search=${encodeURIComponent(search)}` : "";
  const { data } = await axiosInstance.get(`/api/admin/urls${params}`);
  return data.urls;
};

export const deleteSystemUrl = async (id) => {
  const { data } = await axiosInstance.delete(`/api/admin/urls/${id}`);
  return data;
};

export const getAllUsers = async () => {
  const { data } = await axiosInstance.get("/api/admin/users");
  return data.users;
};

export const updateUserRole = async (id, role) => {
  const { data } = await axiosInstance.patch(`/api/admin/users/${id}/role`, { role });
  return data.user;
};

export const deleteAdminUser = async (id) => {
  const { data } = await axiosInstance.delete(`/api/admin/users/${id}`);
  return data;
};

import wrapAsync from "../utils/tryCatchWrapper.js";
import {
  getPlatformStatsDao,
  getAllSystemUrlsDao,
  deleteSystemUrlDao,
  getAllUsersWithMetricsDao,
  updateUserRoleDao,
  deleteUserDao,
} from "../dao/admin.dao.js";

export const getAdminStats = wrapAsync(async (req, res) => {
  const stats = await getPlatformStatsDao();
  res.status(200).json({ message: "success", stats });
});

export const getAllSystemUrls = wrapAsync(async (req, res) => {
  const { search } = req.query;
  const urls = await getAllSystemUrlsDao({ search: search || "" });
  res.status(200).json({ message: "success", urls });
});

export const deleteSystemUrl = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const deletedUrl = await deleteSystemUrlDao(id);
  if (!deletedUrl) {
    return res.status(404).json({ message: "URL not found" });
  }
  res.status(200).json({ message: "URL deleted successfully", id });
});

export const getAllUsers = wrapAsync(async (req, res) => {
  const users = await getAllUsersWithMetricsDao();
  res.status(200).json({ message: "success", users });
});

export const updateUserRole = wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;

  if (!["user", "admin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role specified" });
  }

  // Prevent admin from demoting themselves if they are the only admin or current user
  if (req.user._id.toString() === id && role !== "admin") {
    return res.status(400).json({ message: "You cannot remove your own admin privileges" });
  }

  const updatedUser = await updateUserRoleDao(id, role);
  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User role updated successfully", user: updatedUser });
});

export const deleteUser = wrapAsync(async (req, res) => {
  const { id } = req.params;

  if (req.user._id.toString() === id) {
    return res.status(400).json({ message: "You cannot delete your own admin account" });
  }

  const deletedUser = await deleteUserDao(id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.status(200).json({ message: "User and their URLs deleted successfully", id });
});

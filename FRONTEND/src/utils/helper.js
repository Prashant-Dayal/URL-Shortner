import { redirect } from "@tanstack/react-router";
import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";

export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const response = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    const user = response?.user || response;
    if (!user) return redirect({ to: "/auth" });
    store.dispatch(login(user));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return redirect({ to: "/auth" });
    return true;
  } catch (error) {
    console.error("Auth check failed:", error);
    return redirect({ to: "/auth" });
  }
};

export const checkAdminAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const response = await queryClient.ensureQueryData({
      queryKey: ["currentUser"],
      queryFn: getCurrentUser,
    });
    const user = response?.user || response;
    if (!user) return redirect({ to: "/auth" });
    store.dispatch(login(user));

    const currentUser = store.getState().auth.user;
    if (!currentUser || currentUser.role !== "admin") {
      return redirect({ to: "/dashboard" });
    }
    return true;
  } catch (error) {
    console.error("Admin auth check failed:", error);
    return redirect({ to: "/auth" });
  }
};

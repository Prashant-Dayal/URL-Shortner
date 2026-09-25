import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "./routeTree";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import { checkAdminAuth } from "../utils/helper";

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminDashboardPage,
  beforeLoad: checkAdminAuth,
});

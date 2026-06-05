import { lazy, Suspense } from "react";
import { useAuth } from "../../context/AuthContext";

const RegularDashboard = lazy(() => import("./RegularDashboard"));
const TechnicalDashboard = lazy(() => import("./TechnicalDashboard"));
const AdminDashboard = lazy(() => import("./AdminDashboard"));

export default function DashboardRouter() {
  const { user } = useAuth();

  let DashboardComponent;

  switch (user.role) {
    case "technical":
      DashboardComponent = <TechnicalDashboard />;
      break;

    case "admin":
      DashboardComponent = <AdminDashboard />;
      break;

    default:
      DashboardComponent = <RegularDashboard />;
      break;
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-64 w-full items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      }
    >
      {DashboardComponent}
    </Suspense>
  );
}

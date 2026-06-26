import DashboardLayout from "./layouts/DashboardLayout";
import UserDashboard from "./pages/dashboard/UserDashboard";

function App() {
  return (
    <DashboardLayout>
      <UserDashboard />
    </DashboardLayout>
  );
}

export default App;
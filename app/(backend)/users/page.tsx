import PageHeader from "@/components/backend/layout/PageHeader";
import { Users } from "lucide-react";
import AllUsers from "@/features/backend/users/AllUsers";
import { getUsers } from "@/server/queries/users";
import { adminGuard } from "@/server/auth/adminGuard";

const UsersPage = async () => {
  // Check if the user is an admin
  await adminGuard();
  const { users, total } = await getUsers();
  return (
    <div>
      <PageHeader title="Users" icon={Users} />
      <AllUsers users={users} total={total} />
    </div>
  );
};

export default UsersPage;

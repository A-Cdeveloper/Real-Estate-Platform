import PageHeader from "@/components/backend/layout/PageHeader";
import { Users } from "lucide-react";
import AllUsers from "@/features/backend/users/AllUsers";
import { getUsers } from "@/server/queries/users";
import { adminGuard } from "@/server/auth/adminGuard";
import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";

const UsersPage = async () => {
  // Check if the user is an admin
  await adminGuard();
  const { users, total } = await getUsers();
  const currentUser = await getCurrentUserFromSession();
  return (
    <div>
      <PageHeader title="Users" icon={Users} />
      <AllUsers users={users} total={total} currentUser={currentUser} />
    </div>
  );
};

export default UsersPage;

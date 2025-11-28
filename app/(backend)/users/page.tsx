import PageHeader from "@/components/backend/layout/PageHeader";
import { Users } from "lucide-react";
import AllUsers from "@/features/backend/users/AllUsers";
import { getUsers } from "@/server/queries/users";

const UsersPage = async () => {
  const { users, total } = await getUsers();
  return (
    <div>
      <PageHeader title="Users" icon={Users} />
      <AllUsers users={users} total={total} />
    </div>
  );
};

export default UsersPage;

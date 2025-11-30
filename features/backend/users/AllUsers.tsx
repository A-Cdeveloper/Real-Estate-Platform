import GenericTable from "@/components/shared/GenericTable";
import { CurrentUser, UserWithProperties } from "@/types/user";
import AddNewUser from "./add-edit/AddNewUser";
import { getColumns } from "./table/columns";

const AllUsers = ({
  users,
  total,
  currentUser,
}: {
  users: UserWithProperties[];
  total: number;
  currentUser: CurrentUser | null;
}) => {
  return (
    <div className="space-y-4 w-full xl:w-3/4">
      <div className="flex items-center justify-between">
        <span className="text-sm">Total: {total}</span>
        <AddNewUser />
      </div>

      <GenericTable
        data={users}
        columns={getColumns(currentUser)}
        className="text-sm text-muted-foreground w-full"
      />
    </div>
  );
};

export default AllUsers;

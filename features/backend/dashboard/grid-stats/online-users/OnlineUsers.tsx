import { getOnlineUsers } from "@/server/queries/dashboard-grid";
import OnlineUsersTable from "./OnlineUsersTable";

const OnlineUsers = async () => {
  const onlineUsers = await getOnlineUsers();

  return <OnlineUsersTable onlineUsers={onlineUsers} />;
};

export default OnlineUsers;

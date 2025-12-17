import GridCard from "../shared/GridCard";
import OnlineUsers from "./OnlineUsers";

/**
 * Server component for online users card
 * Can be converted to fetch data when needed
 */
const OnlineUsersCard = async () => {
  return (
    <GridCard title="Users online" subtitle="Users online">
      <OnlineUsers />
    </GridCard>
  );
};

export default OnlineUsersCard;


import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatLongDate } from "@/lib/utils/date";
import { Calendar, LucideIcon, User2 } from "lucide-react";
import { CurrentUser } from "@/types/user";

/**
 * ProfileCard component
 * Displays a profile card with a title and icon
 */
const ProfileCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: LucideIcon;
  children: React.ReactNode;
}) => {
  return (
    <Card className="py-6 px-1 flex-1 h-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg border-b pb-2">
          <Icon className="size-4" aria-hidden="true" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">{children}</div>
      </CardContent>
    </Card>
  );
};

/**
 * ProfileCardItem component
 * Displays an item in a profile card
 */
const ProfileCardItem = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-medium text-muted-foreground">{title}</p>
      {children}
    </div>
  );
};

/**
 * ProfileCards component
 * Server component that displays user profile cards
 * @param currentUser - The current user data
 */
const ProfileCards = ({ currentUser }: { currentUser: CurrentUser }) => {
  return (
    <div className="w-full xl:w-2/3 flex flex-col lg:flex-row gap-4">
      {/* Account Information Card */}
      <div className="w-full lg:w-1/2">
        <ProfileCard title="Account Information" icon={User2}>
          <ProfileCardItem title="Full Name">
            <p className="text-base font-semibold">
              {currentUser.name || "Not set"}
            </p>
          </ProfileCardItem>
          <ProfileCardItem title="Email Address">
            <p className="text-base font-semibold">{currentUser.email}</p>
          </ProfileCardItem>
          <ProfileCardItem title="Role">
            <Badge variant="outline" className="w-fit">
              {currentUser.role.charAt(0) +
                currentUser.role.slice(1).toLowerCase()}
            </Badge>
          </ProfileCardItem>
        </ProfileCard>
      </div>

      {/* Activity Information Card */}
      <div className="w-full lg:w-1/2">
        <ProfileCard title="Activity Information" icon={Calendar}>
          <ProfileCardItem title="Created At">
            <p className="text-base">{formatLongDate(currentUser.createdAt)}</p>
          </ProfileCardItem>
          <ProfileCardItem title="Last Login">
            <p className="text-base">
              {currentUser.lastLogin
                ? formatLongDate(currentUser.lastLogin)
                : "Never"}
            </p>
          </ProfileCardItem>
          <ProfileCardItem title="Account Status">
            <Badge variant="outline" className="w-fit">
              {currentUser.isActive ? "Online" : "Offline"}
            </Badge>
          </ProfileCardItem>
        </ProfileCard>
      </div>
    </div>
  );
};

export default ProfileCards;

import PageHeader from "@/components/backend/layout/PageHeader";
import { Bell } from "lucide-react";
import AllNotifications from "@/features/backend/notifications/AllNotifications";
import { getAllNotifications } from "@/server/queries/notifications";
import { getCurrentUserFromSession } from "@/server/auth/getCurrentUserFromSession";
import { adminGuard } from "@/server/auth/adminGuard";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const NotificationsPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // Check if the user is an admin
  await adminGuard();
  const params = await searchParams;
  const currentUser = await getCurrentUserFromSession();

  if (!currentUser) {
    return null;
  }

  const { notifications, total, page, totalPages } = await getAllNotifications({
    page: Number(params.page) || 1,
    sort: (params.sort as string) || "createdAt_desc",
    includeRead: true,
    userId: currentUser.id,
  });

  return (
    <div>
      <PageHeader title="Notifications" icon={Bell} />
      <AllNotifications
        notifications={notifications}
        total={total}
        totalPages={totalPages}
        page={page}
        sort={(params.sort as string) || "createdAt_desc"}
      />
    </div>
  );
};

export default NotificationsPage;

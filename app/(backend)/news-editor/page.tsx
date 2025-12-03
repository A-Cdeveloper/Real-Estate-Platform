import PageHeader from "@/components/backend/layout/PageHeader";
import { adminGuard } from "@/server/auth/adminGuard";
import { Book } from "lucide-react";
import AllNews from "@/features/backend/news/AllNews";
import { getAllNews } from "@/server/queries/news";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

/**
 * NewsPage component
 * Displays the news page
 * @returns The NewsPage component
 */

const NewsEditorPage = async ({
  searchParams,
}: {
  searchParams: SearchParams;
}) => {
  // Check if the user is an admin
  await adminGuard();
  const params = await searchParams;
  const { news, total, page, totalPages } = await getAllNews({
    page: Number(params.page) || 1,
    limit: Number(params.limit) || 10,
    sort: (params.sort as string) || "createdAt_desc",
  });
  return (
    <div>
      <PageHeader title="News" icon={Book} />
      <AllNews
        news={news}
        total={total}
        totalPages={totalPages}
        page={+page}
        sort={(params.sort as string) || "createdAt_desc"}
      />
    </div>
  );
};

export default NewsEditorPage;

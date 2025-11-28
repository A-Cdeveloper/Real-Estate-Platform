import PageHeader from "@/components/backend/layout/PageHeader";
import { Book } from "lucide-react";

/**
 * NewsPage component
 * Displays the news page
 * @returns The NewsPage component
 */

const NewsEditorPage = () => {
  return (
    <div>
      <PageHeader title="News" icon={Book} />
    </div>
  );
};

export default NewsEditorPage;

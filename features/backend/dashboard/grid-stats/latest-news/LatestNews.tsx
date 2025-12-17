import { getLatestNews } from "@/server/queries/news";
import LatestNewsTable from "./LatestNewsTable";

const LatestNews = async () => {
  const latestNews = await getLatestNews();

  return <LatestNewsTable latestNews={latestNews} />;
};

export default LatestNews;

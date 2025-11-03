import NewsListItem from "@/components/frontend/news/NewsListItem";

const AllNewsPage = () => {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-12">
      <div className="lg:col-span-1">
        <div className="sticky top-8">
          <h2 className="text-3xl font-nunito font-bold text-foreground mb-6">
            News
          </h2>
          <div className="space-y-4">
            <NewsListItem />
            <NewsListItem />
            <NewsListItem />
            <NewsListItem />
            <NewsListItem />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllNewsPage;

type ProprietesFilterProps = {
  start: number;
  end: number;
  total: number;
};

const ProprietesFilter = ({ start, end, total }: ProprietesFilterProps) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <p className="text-muted-foreground font-nunito-sans">
        Showing {start}-{end} of total {total} results
      </p>
      <div className="flex items-center gap-2">
        <select className="px-4 py-2 border border-input rounded-md bg-background font-nunito-sans text-primary focus:outline-none focus:ring-2 focus:ring-ring">
          <option>Most Popular</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </div>
  );
};

export default ProprietesFilter;

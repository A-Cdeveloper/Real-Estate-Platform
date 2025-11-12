type ProprietesFilterProps = {
  start: number;
  end: number;
  total: number;
};

const ProprietesFilter = ({ start, end, total }: ProprietesFilterProps) => {
  return (
    <div className="flex justify-end items-center mb-8 border-y border-border/50 rounded-lg p-2 my-6">
      <p className="text-muted-foreground font-nunito-sans">
        Showing {start}-{end} of total {total} results
      </p>
    </div>
  );
};

export default ProprietesFilter;

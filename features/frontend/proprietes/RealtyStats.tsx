import { Typography } from "@/components/ui/typography";
import { getPropertyStats } from "@/server/queries/properties";
import { cn } from "@/lib/utils";

const StatWidget = ({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "flex h-full flex-col items-center justify-center gap-3 rounded-2xl bg-linear-to-br p-6 text-white text-center shadow-lg",
        className
      )}
    >
      <Typography className="mt-2 text-4xl font-extrabold text-white">
        {value}
      </Typography>
      <Typography
        variant="small"
        className="uppercase tracking-widest text-[16px] text-white/80"
      >
        {label}
      </Typography>
    </div>
  );
};

const RealtyStats = async () => {
  const marketStats = await getPropertyStats();
  const { approvedCount, avgPricePerSqm, addedLastWeek } = marketStats;

  return (
    <div className="mt-0 lg:mt-15">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 sm:grid-rows-1 lg:grid-cols-2 lg:grid-rows-2 h-full">
        <StatWidget
          label="Total Listings"
          value={approvedCount.toString()}
          className="from-blue-500 via-blue-600 to-indigo-500"
        />
        <StatWidget
          label="Avg. Price / m²"
          value={`€${avgPricePerSqm.toLocaleString()}`}
          className="from-emerald-500 via-emerald-600 to-teal-500"
        />
        <StatWidget
          label="Last Week"
          value={addedLastWeek.toString()}
          className="from-amber-500 via-orange-500 to-red-500"
        />
      </div>
    </div>
  );
};

export default RealtyStats;

import { Building, CheckCircle2, Scale, Users } from "lucide-react";
import React from "react";

const GeneralStats = () => {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 max-w-5xl">
      {/* Total properties */}
      <div className="rounded-lg border bg-primary/5 p-4 shadow-sm flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Building className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Total Properties
          </div>
          <div className="text-2xl font-semibold tracking-tight">123</div>
          <div className="text-xs text-muted-foreground">
            +8 in the last 7 days
          </div>
        </div>
      </div>

      {/* Approved properties */}
      <div className="rounded-lg border bg-emerald-500/5 p-4 shadow-sm flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
          <CheckCircle2 className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Approved
          </div>
          <div className="text-2xl font-semibold tracking-tight">98</div>
          <div className="text-xs text-muted-foreground">
            Visible on frontend
          </div>
        </div>
      </div>

      {/* Average price per m² */}
      <div className="rounded-lg border bg-amber-500/5 p-4 shadow-sm flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500/15 text-amber-500">
          <Scale className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Avg price / m²
          </div>
          <div className="text-2xl font-semibold tracking-tight">€1,350</div>
          <div className="text-xs text-muted-foreground">
            For approved properties
          </div>
        </div>
      </div>

      {/* Users */}
      <div className="rounded-lg border bg-sky-500/5 p-4 shadow-sm flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-500/15 text-sky-500">
          <Users className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-xs font-semibold uppercase text-muted-foreground">
            Users
          </div>
          <div className="text-2xl font-semibold tracking-tight">14</div>
          <div className="text-xs text-muted-foreground">
            3 admins • 11 agents
          </div>
        </div>
      </div>
    </section>
  );
};

export default GeneralStats;

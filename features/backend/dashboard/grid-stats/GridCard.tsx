// Simple card component for grid layout
const GridCard = ({ number }: { number: number }) => (
  <div className="rounded-lg border bg-card p-6 shadow-sm h-full">
    <div className="flex items-center justify-between mb-2">
      <h2 className="text-sm font-medium">Card {number}</h2>
      <span className="text-xs text-muted-foreground">Drag & resize me</span>
    </div>
    <div className="rounded-md border border-dashed border-border/60 p-2 text-xs text-muted-foreground">
      Content placeholder for card {number}
    </div>
  </div>
);

export default GridCard;

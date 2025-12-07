import { Spinner } from "@/components/shared/ui/Spinner";

export default function Loading() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-12 h-screen">
      <div className="flex justify-center items-center py-12 h-full">
        <Spinner className="size-8" />
      </div>
    </section>
  );
}

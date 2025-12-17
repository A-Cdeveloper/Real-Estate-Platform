"use client";

import { Info } from "lucide-react";
import GenericTable from "@/components/shared/ui/GenericTable";
import GridCard from "../shared/GridCard";
import { getColumns } from "./columns";
import { News } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Link from "next/link";

/**
 * Client component that displays latest news table with a grid card wrapper
 * Receives data as props from server component
 * Displays latest news data in a table format
 */
const LatestNewsTable = ({ latestNews }: { latestNews: News[] }) => {
  const isEmpty = latestNews.length === 0;

  return (
    <GridCard
      title="Latest news"
      subtitle={`${latestNews.length === 1 ? "1 news" : `${latestNews.length} news`}`}
      headerExtra={
        !isEmpty && (
          <Button
            variant="ghost"
            className="w-fit border-2 border-muted-foreground/20"
            asChild
          >
            <Link href="/news-editor">See all news</Link>
          </Button>
        )
      }
    >
      {isEmpty ? (
        <div className="text-sm text-muted-foreground py-6 px-3 mx-auto flex items-center gap-2">
          <Info className="size-4" aria-hidden="true" />
          <span>No latest news</span>
        </div>
      ) : (
        <GenericTable
          data={latestNews}
          columns={getColumns()}
          showHeader={false}
          className="text-[13px] text-muted-foreground w-full"
        />
      )}
    </GridCard>
  );
};

export default LatestNewsTable;

"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { getPageUrl } from "@/lib/utils/pagination";
import { useRouter } from "next/navigation";

type PaginationControlsProps = {
  currentPage: number;
  totalPages: number;
  baseUrl?: string;
  queryParams?: Record<string, string>;
};

export default function PaginationControls({
  currentPage,
  totalPages,
  baseUrl = "",
  queryParams,
}: PaginationControlsProps) {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    router.push(href);
  };

  return (
    <Pagination className="border-t border-border/30 py-4 flex justify-end">
      <PaginationContent>
        {/* Previous Button */}
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1
                ? getPageUrl(currentPage - 1, baseUrl, queryParams)
                : getPageUrl(1, baseUrl, queryParams)
            }
            hidden={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(
                currentPage > 1
                  ? getPageUrl(currentPage - 1, baseUrl, queryParams)
                  : getPageUrl(1, baseUrl, queryParams)
              );
            }}
            aria-label="Go to previous page"
          />
        </PaginationItem>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, index) => {
          const pageNumber = index + 1;
          const href = getPageUrl(pageNumber, baseUrl, queryParams);
          return (
            <PaginationItem key={index}>
              <PaginationLink
                href={href}
                isActive={pageNumber === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(href);
                }}
                aria-label={`Go to page ${pageNumber}`}
                aria-current={pageNumber === currentPage ? "page" : undefined}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {/* Next Button */}
        <PaginationItem>
          <PaginationNext
            href={
              currentPage < totalPages
                ? getPageUrl(currentPage + 1, baseUrl, queryParams)
                : getPageUrl(totalPages, baseUrl, queryParams)
            }
            hidden={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(
                currentPage < totalPages
                  ? getPageUrl(currentPage + 1, baseUrl, queryParams)
                  : getPageUrl(totalPages, baseUrl, queryParams)
              );
            }}
            aria-label="Go to next page"
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

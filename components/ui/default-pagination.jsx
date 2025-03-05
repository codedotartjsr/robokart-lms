import { Icon } from "@iconify/react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";

const DefaultPagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;
  
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);
  
    return (
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              aria-label="Go to first page"
            >
              <Icon icon="bi:skip-backward-fill" />
            </PaginationLink>
          </PaginationItem>
  
          {startPage > 1 && (
            <PaginationItem>
              {startPage > 2 && <PaginationEllipsis />}
            </PaginationItem>
          )}
  
          {[...Array((endPage - startPage) + 1)].map((_, index) => (
            <PaginationItem key={startPage + index}>
              <PaginationLink
                onClick={() => onPageChange(startPage + index)}
                isActive={currentPage === (startPage + index)}
              >
                {startPage + index}
              </PaginationLink>
            </PaginationItem>
          ))}
  
          {endPage < totalPages && (
            <PaginationItem>
              {endPage < totalPages - 1 && <PaginationEllipsis />}
            </PaginationItem>
          )}
  
          <PaginationItem>
            <PaginationLink
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage === totalPages}
              aria-label="Go to last page"
            >
              <Icon icon="bi:skip-forward-fill" />
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    );
  };

export default DefaultPagination;

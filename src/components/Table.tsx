"use client";

import { useState, useEffect } from "react";
import Button from "./Button";

const NUM_PER_PAGE = 10;

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}

function getPaginationRange(
  currentPage: number,
  totalPages: number,
  maxVisible: number = 5,
): (number | "...")[] {
  if (totalPages <= maxVisible) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const sideCount = Math.floor((maxVisible - 3) / 2);
  const range: (number | "...")[] = [];

  range.push(1);

  if (currentPage <= sideCount + 2) {
    for (let i = 2; i <= maxVisible - 2; i++) {
      range.push(i);
    }
    range.push("...");
    range.push(totalPages);
  } else if (currentPage >= totalPages - sideCount - 1) {
    range.push("...");
    for (let i = totalPages - (maxVisible - 3); i <= totalPages; i++) {
      range.push(i);
    }
  } else {
    range.push("...");
    for (let i = currentPage - sideCount; i <= currentPage + sideCount; i++) {
      range.push(i);
    }
    range.push("...");
    range.push(totalPages);
  }

  return range;
}

type Column = string | { name: string; className?: string; width?: string };

export default function Table({
  columns,
  data,
  getRow,
  showPagination = false,
}: {
  columns: Column[];
  data: any[];
  getRow: (row: any, index: number, numPerPage: number) => React.ReactNode;
  showPagination?: boolean;
}) {
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const numPerPage = NUM_PER_PAGE;
  const totalPages = Math.ceil(data.length / numPerPage);
  const maxVisible = isMobile ? 3 : 5;
  const paginationRange = getPaginationRange(page, totalPages, maxVisible);

  return (
    <table className="block md:table w-full md:table-fixed">
      <thead className="hidden md:table-header-group">
        <tr className="border-b border-grey-100">
          {columns.map((column, index) => {
            const name = typeof column === "string" ? column : column.name;
            const width = typeof column === "string" ? undefined : column.width;
            const className =
              typeof column === "string" ? undefined : column.className;
            return (
              <th
                key={index}
                className={`text-preset-5 font-normal text-grey-500 pb-[12px] ${width || ""} ${className || ""}`}
              >
                {name}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody className="block md:table-row-group">
        {(showPagination
          ? data.slice((page - 1) * numPerPage, page * numPerPage)
          : data
        ).map((t, index) => getRow(t, index, numPerPage))}
      </tbody>
      {showPagination && totalPages > 1 && (
        <tfoot className="block md:table-footer-group w-full">
          <tr className="block md:table-row w-full">
            <td colSpan={columns.length} className="block md:table-cell w-full">
              <div className="flex flex-row justify-between items-center pt-[24px]">
                <Button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  variant="outlined"
                  disabled={page === 1}
                  size="small"
                  className="md:w-auto md:h-auto md:py-[8px] md:px-[16px]"
                >
                  <span className="md:hidden">←</span>
                  <span className="hidden md:inline">← Prev</span>
                </Button>

                <div className="flex flex-row gap-[8px] items-center">
                  {paginationRange.map((item, index) =>
                    item === "..." ? (
                      <span
                        key={`ellipsis-${index}`}
                        className="px-[8px] text-grey-500 text-preset-4"
                      >
                        ...
                      </span>
                    ) : (
                      <Button
                        key={item}
                        label={String(item)}
                        onClick={() => setPage(item)}
                        variant="outlined"
                        size="small"
                        active={page === item}
                      />
                    ),
                  )}
                </div>

                <Button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  variant="outlined"
                  disabled={page === totalPages}
                  size="small"
                  className="md:w-auto md:h-auto md:py-[8px] md:px-[16px]"
                >
                  <span className="md:hidden">→</span>
                  <span className="hidden md:inline">Next →</span>
                </Button>
              </div>
            </td>
          </tr>
        </tfoot>
      )}
    </table>
  );
}

import type { Dispatch, SetStateAction } from "react";

import IconCaretLeft from "@/assets/images/icon-caret-left.svg";
import IconCaretRight from "@/assets/images/icon-caret-right.svg";
import Button from "@/design-system/Button";

export default function Pagination({
  page,
  setPage,
  paginationRange,
  totalPages,
}: {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  paginationRange: (number | "...")[];
  totalPages: number;
}) {
  const activeClass = "bg-grey-900 text-white border-grey-900";
  return (
    <div className="flex flex-row justify-between items-center pt-[24px]">
      {page === 1 ? (
        <div />
      ) : (
        <Button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          variant="pagination"
          size="small"
          className="md:w-auto md:h-auto md:py-[8px] md:px-[16px]"
          label={
            <div className="flex flex-row items-center gap-[8px]">
              <IconCaretLeft
                className="w-[6px] h-[11px] shrink-0"
                aria-hidden
              />
              <span className="hidden md:inline">Prev</span>
            </div>
          }
        />
      )}

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
              variant="pagination"
              size="small"
              className={page === item ? activeClass : ""}
            />
          ),
        )}
      </div>

      {page === totalPages ? (
        <div />
      ) : (
        <Button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          variant="pagination"
          size="small"
          className="md:w-auto md:h-auto md:py-[8px] md:px-[16px]"
          label={
            <div className="flex flex-row items-center gap-[8px]">
              <span className="hidden md:inline">Next</span>
              <IconCaretRight
                className="w-[6px] h-[11px] shrink-0"
                aria-hidden
              />
            </div>
          }
        />
      )}
    </div>
  );
}

const NUM_PER_PAGE = 10;

export default function Table({
  columns,
  data,
  getRow,
  showPagination = false,
}: {
  columns: string[];
  data: any[];
  getRow: (row: any, index: number, numPerPage: number) => React.ReactNode;
  showPagination?: boolean;
}) {
  const page = 1;
  // const [page, setPage] = useState(1);
  // const [shownTransactions, setShownTransactions] = useState(1);

  const numPerPage = 10;

  return (
    <table className="w-full">
      <thead>
        <tr className="hidden md:flex w-full flex-row gap-[32px] justify-between border-b-1 border-[#F2F2F2] pb-[12px] my-[24px]">
          {columns.map((column) => (
            <th className="flex-2 text-preset-5 font-normal text-left">
              {column}
            </th>
          ))}
          {/* <th className="flex-2 text-preset-5">Recipient / Sender</th>
          <th className="w-[80px] lg:w-[120px] text-preset-5">Category</th>
          <th className="w-[80px] lg:w-[120px] text-preset-5">
            Transaction Date
          </th>
          <th className="text-preset-5 flex-1">Amount</th> */}
          {/* <div className="w-full border-b-1 border-[#F2F2F2] my-[20px]"></div> */}
        </tr>
      </thead>
      <tbody>
        {(showPagination
          ? data.slice((page - 1) * numPerPage, page * numPerPage)
          : data
        ).map((t, index) => getRow(t, index, numPerPage))}
      </tbody>
      {showPagination && (
        <div className="flex flex-row justify-between">
          <button className="text-preset-5">Previous</button>
          <button className="text-preset-5">Next</button>
        </div>
      )}
    </table>
  );
}

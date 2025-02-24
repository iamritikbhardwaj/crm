import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTable, useSortBy, usePagination, useFilters } from "react-table";

function CustomTable({ dataa, columnss, button, path, size, hideFilter }) {
  // Use useMemo to ensure columns and data are memoized and don't cause unnecessary re-renders
  const data = useMemo(() => dataa, [dataa]);
  const columns = useMemo(() => columnss, [columnss]);
  const navigate = useNavigate();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    pageCount,
    pageIndex,
    pageSize,
    gotoPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data,
      initialState: {
        pageSize: 10,
        pageIndex: 0,
      },
    },
    useFilters,
    useSortBy,
    usePagination
  );  

  return (
    <div
      className={`w-fit flex-col mx-auto justify-center text-center ${
        size ? size : "text-sm"
      }`}
    >

      <div className="w-[1/4] flex flex-col items-end  mx-auto">
        <button
          onClick={() => {
            navigate(path);
          }}
          className={`bg-slate-800 ${
            button ? "" : "hidden"
          } text-white p-2 rounded-lg mx-2 hover:bg-slate-300`}
        >
          {"+"}
        </button>
      </div>
      <div className="w-1/2 flex justify-center items-center mx-auto">
        <table
          className="w-auto rounded-lg border border-slate-400 overflow-auto"
          {...getTableProps()}
        >
          <thead className="bg-slate-800 p-2 text-white md:px-3 md:py-2 md:text-sm">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className="p-2 border-2 whitespace-nowrap"
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    {!hideFilter && (<div className="mb-2">
                    <input
                     className="text-black p-1 w-3/4 font-normal rounded-lg"
                      value={column.filterValue}
                      onChange={e => {column.setFilter(e.target.value)
                      console.log(column.filterValue)}}  // Update filter value
                      placeholder={`Search ${column.id}`}
                    />
                  </div>)}
                    {column.render("Header")}
                    {column.isSorted && (
                      <span>{column.isSortedDesc ? " 🔼 " : " 🔽 "}</span>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr
                  className="border-2 border-slate-400 mx-1 hover:bg-slate-200"
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell) => (
                    <td
                      className="hover:bg-slate-300 border whitespace-nowrap py-2 px-1 border-slate-300"
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {!hideFilter && (
        <div className="flex justify-center my-0 md:my-4">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300"
          >
            {"<"}
          </button>
          <span className="mx-2">{` ${pageIndex + 1} of ${pageCount}`}</span>
          <span>
            Page Size:{" "}
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
            >
              {[10, 15, 20, 25, 30].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
            className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300"
          >
            {">>"}
          </button>
        </div>
      )}
    </div>
  );
}

export { CustomTable };

export const DefaultColumnFilter = ({
  column: { filterValue, preFilteredRows, setFilter },
}) => {
  const count = preFilteredRows.length;
  return (
    <input
      value={filterValue || ''}
      onChange={(e) => setFilter(e.target.value || undefined)} // Filter by input
      placeholder={`Search ${count} records...`}
    />
  );
};

import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy, usePagination } from 'react-table';

function CustomTable({ dataa, columnss, button, path }) {
  // Use useMemo to ensure columns and data are memoized and don't cause unnecessary re-renders
  const data = useMemo(() => dataa, [dataa]);
  const columns = useMemo(() => columnss, [columnss]);
  const navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow, canNextPage,
    canPreviousPage,
    nextPage,
    previousPage,
    pageCount,
    pageIndex,
    pageSize,
    gotoPage,
    setPageSize, setFilter} = useTable(
    {
      columns,
      data,
      initialState: {
          pageSize: 15,
          pageIndex: 0
      }
    },
    useSortBy, usePagination
  );

  return (
    <div className="w-full flex-col justify-center text-center text-xl">
      <div className="w-[1/4] flex flex-col items-end justify-end sm:mx-8 md:mx-24">
      <div className="flex justify-center my-0 md:my-4">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage} className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300">First Page</button>
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300"
        >
          Previous
        </button>
        <span>{` ${pageIndex + 1} of ${pageCount}`}</span>
        <input className='border border-slate-400 p-2 mx-3 w-16' type='number' id='pageSize'></input>
        <button onClick={() => setPageSize(Number(document.getElementById('pageSize').value))} className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300">Go</button>
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300"
        >
          Next
        </button>
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage} className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300">Last Page</button>
        <button
          onClick={() => { navigate(path) }
          }
          className="bg-slate-800 text-white p-2 rounded-lg mx-2 hover:bg-slate-300"
        >
          {button}
        </button>
      </div>
        
      </div>
      <table
        className="w-[91%] rounded-lg border md:mx-10 border-slate-400 max-h-[50vh] overflow-auto"
        {...getTableProps()}
      >
        <thead className="bg-slate-800 text-white px-1 py-2 md:px-5 md:py-2 md:text-lg">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="py-2 px-3 md:px-10"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {column.isSorted && (
                    <span>{column.isSortedDesc ? ' 🔼 ' : ' 🔽 '}</span>
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
                className="border-b border-slate-400 mx-2 hover:bg-slate-200"
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => (
                  <td className="hover:bg-slate-300" {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      
    </div>
  );
}

export { CustomTable };

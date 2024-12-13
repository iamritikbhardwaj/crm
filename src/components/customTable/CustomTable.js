import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTable, useSortBy } from 'react-table';

function CustomTable({ dataa, columnss, button, path }) {
  // Use useMemo to ensure columns and data are memoized and don't cause unnecessary re-renders
  const data = useMemo(() => dataa, [dataa]);
  const columns = useMemo(() => columnss, [columnss]);
  const navigate = useNavigate();

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
    },
    useSortBy
  );

  return (
    <div className="w-full flex-col justify-center text-center">
      <div className="w-[1/4] flex flex-col items-end justify-end mx-24">
        <button
          onClick={() => { navigate(path) }
          }
          className="bg-slate-800 text-white p-2 rounded-lg text-center mx-2 my-4 hover:bg-slate-300"
        >
          {button}
        </button>
      </div>
      <table
        className="w-full rounded-lg border md:mx-10 border-slate-400 max-h-[50vh] overflow-auto"
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
          {rows.map((row) => {
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

import React from "react";
import { useTable } from "react-table";

import { Button } from "components/Form";
import EditableCell from "./EditableCell";

import { IRecord } from "lib/state";
import { getTotal } from "lib/money";

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
};

interface IProps {
  columns: any;
  records: IRecord[];

  updateMyData: any;
  addRow: any;
}
// Be sure to pass our updateMyData and the skipPageReset option
const CustomTable = ({
  columns,
  records: data,
  updateMyData,
  addRow,
}: IProps) => {
  // For this example, we're using pagination to illustrate how to stop
  // the current page from resetting when our data changes
  // Otherwise, nothing is different here.
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
      defaultColumn,

      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    });

  // Render the UI for your table
  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>

      <div className="mt-4 flex justify-between">
        <Button
          dense
          onClick={(e) => {
            e.preventDefault();
            addRow();
          }}
        >
          Neuer Eintrag
        </Button>

        <p style={{ margin: 0 }}>
          Gesamtbetrag: <output>{getTotal(data)}</output>
        </p>
      </div>
    </>
  );
};

export default CustomTable;

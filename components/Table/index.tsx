import React, { useMemo } from "react";
import { IRecord } from "lib/state";

import EditableMoneyCell from "./EditableMoneyCell";
import CustomTable from "./Table";

const newEmptyRow = () => ({
  description: "",
  amount: "",
});
const Table = ({
  records,
  updateRecords,
}: {
  records: IRecord[];

  updateRecords: any;
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Beschreibung",
        accessor: "description",
      },
      {
        Header: "Betrag",
        accessor: "amount",

        Cell: EditableMoneyCell,
      },
    ],
    []
  );

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    updateRecords((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          };
        }
        return row;
      })
    );
  };
  const addRow = () => {
    updateRecords((old) => [...old, newEmptyRow()]);
  };

  return (
    <CustomTable
      columns={columns}
      records={records}
      updateMyData={updateMyData}
      addRow={addRow}
    />
  );
};
export default Table;

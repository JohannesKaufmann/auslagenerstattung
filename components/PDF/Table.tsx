import { View } from "@react-pdf/renderer";
import { Heading } from "./Heading";
import { formatAmount, getTotal } from "lib/money";
import TableCell from "./TableCell";

// The "amount" column should be about 80px wide, which is enough for 10k€.
const AMOUNT_WIDTH = "80px";

const Record = ({ description, amount }) => (
  <View style={{ display: "flex", flexDirection: "row" }}>
    <TableCell position="leftEdge" type="bodyCell" style={{ flexGrow: 1 }}>
      {description}
    </TableCell>
    <TableCell
      position="rightEdge"
      type="bodyCell"
      style={{ flexShrink: 0, width: AMOUNT_WIDTH, textAlign: "right" }}
    >
      {formatAmount(amount)}
    </TableCell>
  </View>
);

const filterForFilledRecords = (record) => {
  const allEmpty = Object.values(record).every(
    (field) => field === "" || field === 0
  );

  return !allEmpty;
};

export const RecordsTable = ({ records }) => (
  <View style={{ marginVertical: 16 }}>
    <View
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      <TableCell position="leftEdge" type="headerCell" style={{ flexGrow: 1 }}>
        <Heading>Beschreibung</Heading>
      </TableCell>
      <TableCell
        position="rightEdge"
        type="headerCell"
        style={{
          width: AMOUNT_WIDTH,

          textAlign: "right",
        }}
      >
        <Heading>Betrag</Heading>
      </TableCell>
    </View>
    {records.filter(filterForFilledRecords).map((record, index) => {
      return <Record key={index} {...record} />;
    })}

    <TableCell
      position="rightEdge"
      type="headerCell"
      style={{
        textAlign: "right",
        // We don't want the border for the total amount
        borderBottom: 0,
      }}
    >
      Gesamtbetrag: {getTotal(records)}
    </TableCell>
  </View>
);

import { Text, View } from "@react-pdf/renderer";
import { HEADING_COLOR } from "./Heading";
import { getTotal } from "lib/money";

const AMOUNT_WIDTH = "80px";

const TABLE_CELL_COLOR = "rgba(50, 65, 85, 1)";

const TABLE_PADDING = 8;
const TABLE_EDGE_PADDING = 4;

const TABLE_BORDER_COLOR_CELL = "rgba(226, 232, 240, 1)";
const TABLE_BORDER_COLOR_HEADER = "rgba(203, 213, 225, 1)";

const TABLE_BORDER = `1px solid ${TABLE_BORDER_COLOR_CELL}`;

const Record = ({ description, amount }) => (
  <View style={{ display: "flex", flexDirection: "row" }}>
    <Text
      style={{
        flexGrow: 1,

        color: TABLE_CELL_COLOR,
        padding: TABLE_PADDING,
        paddingLeft: TABLE_EDGE_PADDING,
        borderBottom: TABLE_BORDER,
      }}
    >
      {description}
    </Text>
    <Text
      style={{
        flexShrink: 0,
        width: AMOUNT_WIDTH,
        textAlign: "right",

        color: TABLE_CELL_COLOR,
        padding: TABLE_PADDING,
        paddingRight: TABLE_EDGE_PADDING,
        // borderLeft: TABLE_BORDER,
        borderBottom: TABLE_BORDER,
      }}
    >
      {amount}
    </Text>
  </View>
);

export const RecordsTable = ({ records }) => (
  <View style={{ marginVertical: 16 }}>
    {/* <Heading>Auflistung</Heading> */}

    <View
      style={{
        display: "flex",
        flexDirection: "row",

        // paddingBottom: 4,
        // borderBottom: TABLE_BORDER,
        //  "1px solid rgb(243, 243, 243)",
      }}
    >
      <Text
        style={{
          flexGrow: 1,
          // fontWeight: "bold",

          textTransform: "uppercase",
          fontSize: 10,
          letterSpacing: 0.3,
          color: HEADING_COLOR,

          // color: TABLE_HEADER_COLOR,
          padding: TABLE_PADDING,
          paddingLeft: TABLE_EDGE_PADDING,
          borderBottom: TABLE_BORDER,
          borderBottomColor: TABLE_BORDER_COLOR_HEADER,
        }}
      >
        Beschreibung
      </Text>
      <Text
        style={{
          width: AMOUNT_WIDTH,

          textAlign: "right",

          textTransform: "uppercase",
          fontSize: 10,
          letterSpacing: 0.3,
          color: HEADING_COLOR,

          // color: TABLE_HEADER_COLOR,
          padding: TABLE_PADDING,
          paddingRight: TABLE_EDGE_PADDING,
          // borderLeft: TABLE_BORDER,
          borderBottom: TABLE_BORDER,
          borderBottomColor: TABLE_BORDER_COLOR_HEADER,
          // borderLeft: "1px solid rgb(243, 243, 243)",
        }}
      >
        Betrag
      </Text>
    </View>
    {records
      .filter((record) => {
        const allEmpty = Object.values(record).every((field) => field === "");
        return !allEmpty;
      })
      .map((record, index) => {
        return <Record key={index} {...record} />;
      })}

    <Text
      style={{
        // fontFamily: "monospace",
        fontWeight: "bold",

        textAlign: "right",
        padding: TABLE_PADDING,
        paddingRight: TABLE_EDGE_PADDING,
      }}
    >
      Gesamtbetrag: {getTotal(records)}
    </Text>
  </View>
);

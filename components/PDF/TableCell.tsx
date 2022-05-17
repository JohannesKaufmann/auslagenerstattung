import React, { ReactNode } from "react";

import { Text } from "@react-pdf/renderer";
import { Style } from "@react-pdf/types";

type IType = "bodyCell" | "headerCell";
type IPosition = "leftEdge" | "middle" | "rightEdge";

interface IProps {
  type: IType;
  position: IPosition;

  style?: Style;
  children: ReactNode;
}

const TABLE_CELL_COLOR = "rgba(50, 65, 85, 1)";

const TABLE_PADDING = 8;
const TABLE_EDGE_PADDING = 4;

const TABLE_BORDER_COLOR_CELL = "rgba(226, 232, 240, 1)";
const TABLE_BORDER_COLOR_HEADER = "rgba(203, 213, 225, 1)";

const getPaddingStyles = (position: IPosition): Style => {
  if (position === "leftEdge") {
    return {
      padding: TABLE_PADDING,
      paddingLeft: TABLE_EDGE_PADDING,
    };
  } else if (position === "rightEdge") {
    return {
      padding: TABLE_PADDING,
      paddingRight: TABLE_EDGE_PADDING,
    };
  }

  return {
    padding: TABLE_PADDING,
  };
};

const getBorderStyles = (type: IType): Style => {
  return {
    borderBottomWidth: 1,
    borderBottomStyle: "solid",
    borderBottomColor:
      type === "headerCell"
        ? TABLE_BORDER_COLOR_HEADER
        : TABLE_BORDER_COLOR_CELL,
  };
};

const TableCell = ({ children, type, position, style, ...rest }: IProps) => {
  return (
    <Text
      {...rest}
      style={{
        ...getPaddingStyles(position),
        ...getBorderStyles(type),
        color: TABLE_CELL_COLOR,

        // give them the ability to override the style
        ...style,
      }}
    >
      {children}
    </Text>
  );
};
export default TableCell;

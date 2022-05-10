import { Text } from "@react-pdf/renderer";

export const HEADING_COLOR = "rgba(100, 116, 139, 1)";
export const Heading = ({ children }) => (
  <Text
    style={{
      textTransform: "uppercase",
      fontSize: 10,
      letterSpacing: 0.3,
      color: HEADING_COLOR,
      paddingBottom: 4,
    }}
  >
    {children}
  </Text>
);

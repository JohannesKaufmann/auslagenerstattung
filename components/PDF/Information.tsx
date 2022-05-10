import { Text, View } from "@react-pdf/renderer";
import { Heading } from "./Heading";

export const Information = ({ company, recipient }) => (
  <View
    style={{
      display: "flex",
      flexDirection: "row",
      marginTop: 32,
      marginBottom: 16,
    }}
  >
    <View style={{ width: "50%" }}>
      <Heading>Firma</Heading>

      <Text>{company.name}</Text>
      <Text>{company.street}</Text>
      <Text>
        {company.zipcode} {company.city}
      </Text>
    </View>

    <View style={{ width: "50%" }}>
      <Heading>Empfänger</Heading>

      <Text>{recipient.account_owner}</Text>

      <Text>
        {recipient.iban} {recipient.bic && `(${recipient.bic})`}
      </Text>
    </View>
  </View>
);

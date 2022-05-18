import { Text, View } from "@react-pdf/renderer";
import { placeholders } from "lib/state";
import { Heading } from "./Heading";

// Value renders the "value" attribute. However if it is empty,
// it renders the "placeholder" attribute with a grey color.
const Value = ({ value, placeholder }) => {
  if (value !== "") {
    return <Text>{value}</Text>;
  }

  // Fallback to rendering a placeholder
  return (
    <Text
      style={{
        color: "rgba(209, 213, 219, 1)",
        fontStyle: "italic",
      }}
    >
      {placeholder}
    </Text>
  );
};

export const Information = ({ company, recipient }) => {
  const SPACER = <Text> </Text>;

  return (
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

        <Value value={company.name} placeholder={placeholders.company.name} />
        <Value
          value={company.street}
          placeholder={placeholders.company.street}
        />

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Value
            value={company.zipcode}
            placeholder={placeholders.company.zipcode}
          />
          {SPACER}
          <Value value={company.city} placeholder={placeholders.company.city} />
        </View>
      </View>

      <View style={{ width: "50%" }}>
        <Heading>Empfänger</Heading>
        <Value
          value={recipient.account_owner}
          placeholder={placeholders.recipient.account_owner}
        />

        <View style={{ display: "flex", flexDirection: "row" }}>
          <Value value={recipient.iban} placeholder={"IBAN"} />
          {SPACER}
          <Value
            value={recipient.bic ? `(${recipient.bic})` : ""}
            placeholder={`(BIC)`}
          />
        </View>
      </View>
    </View>
  );
};

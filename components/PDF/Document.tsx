import {
  Font,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { IDocument } from "lib/state";

import { Information } from "./Information";
import { RecordsTable } from "./Table";

Font.register({
  family: "OpenSans",
  fonts: [
    {
      src: "/fonts/OpenSans-Regular.ttf",
      fontStyle: "normal",
      fontWeight: 400,
    },
    {
      src: "/fonts/OpenSans-Italic.ttf",
      fontStyle: "italic",
      fontWeight: 400,
    },
    {
      src: "/fonts/OpenSans-SemiBold.ttf",
      fontStyle: "normal",
      fontWeight: "semibold",
    },
  ],
});

const PAGE_MARGIN = 32;
const styles = StyleSheet.create({
  page: {
    padding: PAGE_MARGIN,

    fontFamily: "OpenSans",
    fontSize: 12,
    color: "rgba(50, 65, 85, 1)",
  },

  pageNumber: {
    position: "absolute",
    bottom: 4,
    right: 4,
    fontSize: 10,
    color: "gray",
  },
});

const PageNumber = () => (
  <Text
    style={styles.pageNumber}
    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
    fixed
  />
);

const Title = ({ children }) => (
  <Text
    style={{
      fontSize: 16,
      textAlign: "center",
      color: "rgba(15, 23, 43, 1)",
    }}
  >
    {children}
  </Text>
);
const TodaysDate = () => {
  const today = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  return (
    <Text
      style={{ position: "absolute", top: PAGE_MARGIN, right: PAGE_MARGIN }}
    >
      {today.toLocaleDateString("de-DE", options)}
    </Text>
  );
};

const PDFDocument = ({ document }: { document: IDocument }) => {
  const images = document.attachments
    .map((a) => a.pages)
    .flat()
    .map((p) => p.img_object_url);

  return (
    // @ts-ignore
    <Document>
      {/* @ts-ignore */}
      <Page size="A4" style={styles.page}>
        <Title>Auslagenerstattung</Title>
        <TodaysDate />

        <Information
          company={document.company}
          recipient={document.recipient}
        />

        <RecordsTable records={document.records} />

        {document.signature !== null && (
          <View>
            <Image style={{ width: "40%" }} src={document.signature} />
            <Text>{document.recipient.account_owner}</Text>
          </View>
        )}

        <PageNumber />
      </Page>

      {images.map((image) => (
        // @ts-ignore
        <Page key={image}>
          <Image src={image} style={{ objectFit: "scale-down" }} />

          <PageNumber />
        </Page>
      ))}
    </Document>
  );
};
export default PDFDocument;

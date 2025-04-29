"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image as PDFImage,
} from "@react-pdf/renderer";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    position: "relative",
    height: "100%",
  },
  header: {
    marginBottom: 20,
    borderBottom: "1 solid #000",
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 12,
    fontWeight: "bold",
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    marginBottom: 5,
  },
  prescriptionItem: {
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1 solid #eee",
  },
  footer: {
    position: "absolute",
    bottom: 40,
    right: 40,
    width: "100%",
    textAlign: "right",
  },
  signatureLine: {
    borderTop: "1 solid #000",
    width: 150,
    paddingTop: 10,
    marginLeft: "auto",
  },
});

const PrescriptionPDF = ({
  patientName,
  age,
  date,
  doctorInfo,
  medications,
}) => (
  <Document>
    <Page size="letter" style={styles.page}>
      {/* Header with Logo */}
      <View style={styles.header}>
        <PDFImage style={styles.logo} src="/ESI_SBA_LOGO.jpeg" />

        <PDFImage style={styles.logo} src="/Logo.png" />
      </View>

      {/* Doctor Information */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 15,
        }}
      >
        <View>
          <Text style={styles.subtitle}>Doctor:</Text>
          <Text style={styles.text}>{doctorInfo.name}</Text>
          <Text style={styles.text}>{doctorInfo.specialty}</Text>
        </View>
        <View>
          <Text style={styles.text}>{doctorInfo.clinic}</Text>
          <Text style={styles.text}>{doctorInfo.address}</Text>
          <Text style={styles.text}>{doctorInfo.phone}</Text>
        </View>
      </View>

      {/* Patient Information */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View>
          <Text style={styles.subtitle}>Patient:</Text>
          <Text style={styles.text}>{patientName}</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Age:</Text>
          <Text style={styles.text}>{age} years</Text>
        </View>
        <View>
          <Text style={styles.subtitle}>Date:</Text>
          <Text style={styles.text}>{date}</Text>
        </View>
      </View>

      {/* Medications Section */}
      <View style={styles.section}>
        <Text style={{ ...styles.title, textAlign: "left" }}>
          PRESCRIBED MEDICATIONS
        </Text>
        {medications.map((med, index) => (
          <View key={index} style={styles.prescriptionItem}>
            <Text style={styles.subtitle}>{med.name}</Text>
            <Text style={styles.text}>{med.details || "As directed"}</Text>
          </View>
        ))}
      </View>

      {/* Footer Signature - Fixed at bottom */}
      <View style={styles.footer}>
        <View style={styles.signatureLine}>
          <Text style={{ textAlign: "center" }}>Doctor's Signature</Text>
        </View>
      </View>
    </Page>
  </Document>
);

export default PrescriptionPDF;

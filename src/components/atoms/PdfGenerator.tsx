import React from 'react';
import { Document as DocumentRenderer, Page as PageRenderer, Text, View, StyleSheet } from '@react-pdf/renderer';
//import { Document } from 'react-pdf';
// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const BasicDocument = () => (
  <DocumentRenderer>
    <PageRenderer size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </PageRenderer>
  </DocumentRenderer>
);
/*
const Test = () => {
  return (
    <Document
      configuration={{
        size: 'a5',
        orientation: 'landscape',
        pagination: {
          format: 'page #page of #count',
          formatPage: '#page',
          formatCount: '#count',
        },
        isAsync: true,
      }}
      header={<div>header</div>}
      footer={<div>footer</div>}
      screen={<div>screen</div>}
      onLoaded={() => window.print(<MyDocument />)}
    >
      <MyDocument />
    </Document>
  );
};*/
export default BasicDocument;

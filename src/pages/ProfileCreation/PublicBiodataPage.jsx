import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AppLayout from "../../components/layout/AppLayout";

const PublicBiodataPage = () => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <Text style={styles.text}>Public Biodata Page</Text>
        <Text style={styles.subtext}>This page is being converted to React Native</Text>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtext: {
    fontSize: 16,
    color: "#666",
  },
});

export default PublicBiodataPage;

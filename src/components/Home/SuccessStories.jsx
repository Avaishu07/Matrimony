import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const SuccessStories = () => {
  const stories = [
    {
      couple: "Anita & Rohit",
      story:
        "We matched instantly through the platform and got married within six months. The support team made the journey simple and secure.",
    },
    {
      couple: "Neha & Arjun",
      story:
        "Detailed profiles and trust features helped us connect quickly. We are grateful for the meaningful conversations we had here.",
    },
    {
      couple: "Pooja & Karan",
      story:
        "The personalised recommendations were spot on. We found each other despite living in different cities.",
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Success Stories</Text>
          <Text style={styles.subtitle}>
            Real couples who found their perfect match on our platform. Your story could be next.
          </Text>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.storiesContainer}
        >
          {stories.map((item, index) => (
            <View key={index} style={styles.storyCard}>
              <Text style={styles.coupleName}>{item.couple}</Text>
              <Text style={styles.storyText}>{item.story}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF9F5",
    minHeight: 400,
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  content: {
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
  storiesContainer: {
    gap: 32,
    paddingHorizontal: 8,
  },
  storyCard: {
    width: 320,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#FED7AA",
    padding: 24,
    gap: 16,
  },
  coupleName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#1F2937",
  },
  storyText: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
  },
});

export default SuccessStories;

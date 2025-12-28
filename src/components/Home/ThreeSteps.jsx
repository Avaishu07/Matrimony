import React from "react";
import { View, Text, Image, StyleSheet, ScrollView } from "react-native";

const steps = [
  {
    image: require("../../assets/home/3easyStep/createProfile.webp"),
    title: "Create your profile",
    description:
      "Sign up for free, add your details, and upload your photo to get started.",
  },
  {
    image: require("../../assets/home/3easyStep/connectImg.webp"),
    title: "Search & Discover Matches",
    description:
      "Explore verified profiles that match your preferences and interests.",
  },
  {
    image: require("../../assets/home/3easyStep/connectImg.webp"),
    title: "Connect & Start Your Journey",
    description:
      "Send interest, chat securely, and take the first step toward your happily ever after.",
  },
];

const ThreeSteps = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>How It Works</Text>
      <Text style={styles.subheading}>
        Find your perfect match in three simple steps
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.stepsContainer}
      >
        {steps.map((step, index) => (
          <View key={index} style={styles.stepCard}>
            <View style={styles.imageContainer}>
              <Image source={step.image} style={styles.image} resizeMode="cover" />
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{index + 1}</Text>
              </View>
            </View>
            <Text style={styles.stepTitle}>{step.title}</Text>
            <Text style={styles.stepDescription}>{step.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 64,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  subheading: {
    fontSize: 18,
    color: "#6B7280",
    marginBottom: 48,
    textAlign: "center",
  },
  stepsContainer: {
    gap: 24,
    paddingHorizontal: 8,
  },
  stepCard: {
    width: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  stepNumber: {
    position: "absolute",
    top: -10,
    right: -10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F97316",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 4,
    borderColor: "#FFFFFF",
  },
  stepNumberText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
  },
});

export default ThreeSteps;

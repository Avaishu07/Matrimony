import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Animated } from "react-native";

const WhyChooseUs = () => {
  const features = [
    {
      title: "Verified Profiles",
      description:
        "All profiles are thoroughly verified to ensure authenticity and trust. We verify identity, education, and background details.",
    },
    {
      title: "Advanced Matching",
      description:
        "Our intelligent algorithm matches you based on compatibility, values, interests, and lifestyle preferences.",
    },
    {
      title: "Privacy & Security",
      description:
        "Your personal information is protected with industry-leading security measures. Your privacy is our priority.",
    },
    {
      title: "24/7 Support",
      description:
        "Our dedicated support team is available round the clock to assist you in your journey to find your perfect match.",
    },
    {
      title: "Success Stories",
      description:
        "Join thousands of happy couples who found their life partners through our platform. Your success story could be next.",
    },
    {
      title: "Easy to Use",
      description:
        "Simple, intuitive interface that makes it easy to search, connect, and communicate with potential matches.",
    },
  ];

  const [pressedIndex, setPressedIndex] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainTitle}>Why Choose Us</Text>
        <Text style={styles.subtitle}>
          Discover what makes us the trusted choice for finding your life partner
        </Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
          decelerationRate="fast"
          snapToInterval={320}
          snapToAlignment="start"
        >
          {features.map((feature, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.featureCard,
                pressedIndex === index && styles.featureCardPressed,
              ]}
              onPressIn={() => setPressedIndex(index)}
              onPressOut={() => setPressedIndex(null)}
              activeOpacity={0.9}
            >
              <Text
                style={[
                  styles.featureTitle,
                  pressedIndex === index && styles.featureTitlePressed,
                ]}
              >
                {feature.title}
              </Text>
              <Text
                style={[
                  styles.featureDescription,
                  pressedIndex === index && styles.featureDescriptionPressed,
                ]}
              >
                {feature.description}
              </Text>
              <View
                style={[
                  styles.underline,
                  pressedIndex === index && styles.underlineVisible,
                ]}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F9FAFB",
    paddingVertical: 64,
    paddingHorizontal: 24,
  },
  content: {
    maxWidth: 1200,
    alignSelf: "center",
    width: "100%",
  },
  mainTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 48,
  },
  scrollContent: {
    gap: 24,
    paddingHorizontal: 8,
  },
  featureCard: {
    width: 300,
    paddingVertical: 32,
    paddingHorizontal: 28,
    borderRadius: 20,
    backgroundColor: "transparent",
    alignItems: "center",
  },
  featureCardPressed: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 8,
    transform: [{ translateY: -8 }, { scale: 1.01 }],
  },
  featureTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  featureTitlePressed: {
    color: "#F97316",
  },
  featureDescription: {
    fontSize: 16,
    color: "#4B5563",
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 16,
  },
  featureDescriptionPressed: {
    color: "#374151",
  },
  underline: {
    width: 60,
    height: 2,
    backgroundColor: "#F97316",
    alignSelf: "center",
    transform: [{ scaleX: 0 }],
  },
  underlineVisible: {
    transform: [{ scaleX: 1 }],
  },
});

export default WhyChooseUs;

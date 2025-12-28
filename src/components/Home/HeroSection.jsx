import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const HeroSection = () => {
  const navigation = useNavigation();
  const title = "SEARCH YOUR LIFE PARTNER";

  return (
    <View style={styles.container}>
      {/* Background Image - Using static image instead of video for React Native */}
      <ImageBackground
        source={require("../../assets/home/heroBg.jpg")}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Dark Overlay */}
        <View style={styles.overlay} />

        {/* Content */}
        <View style={styles.content}>
          {/* Animated Heading */}
          <Text style={styles.title}>
            {title}
          </Text>

          {/* CTA Button */}
          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate("SearchProfiles")}
          >
            <Text style={styles.ctaButtonText}>Find Your Match</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.6,
    width: "100%",
    overflow: "hidden",
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  content: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 80,
    paddingHorizontal: 16,
    zIndex: 10,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 4,
    marginBottom: 32,
    fontFamily: "serif",
  },
  ctaButton: {
    backgroundColor: "#FF8A41",
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default HeroSection;

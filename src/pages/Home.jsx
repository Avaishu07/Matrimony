import React from "react";
import { View, StyleSheet } from "react-native";
import ThreeSteps from "../components/Home/ThreeSteps";
import WhyChooseUs from "../components/Home/WhyChooseUs";
import SuccessStories from "../components/Home/SuccessStories";
import PricingPlans from "../components/Home/PricingPlans";
import HeroSection from "../components/Home/HeroSection";
import AppLayout from "../components/layout/AppLayout";

const Home = () => {
  return (
    <AppLayout>
      <View style={styles.container}>
        <HeroSection />
        <ThreeSteps />
        <WhyChooseUs />
        <SuccessStories />
        <PricingPlans />
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 64,
  },
});

export default Home;

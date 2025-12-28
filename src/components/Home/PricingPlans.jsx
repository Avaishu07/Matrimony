import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import PlanCard from "../../pages/MembershipPlans/PlanCard";

const PricingPlans = () => {
  const [billing, setBilling] = useState("monthly");

  const plans = ["Basic", "Premium", "Elite", "Platinum"];

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Membership Plans</Text>
          <Text style={styles.subtitle}>
            Choose the perfect plan for your journey to find your life partner
          </Text>
        </View>

        {/* Billing Toggle */}
        <View style={styles.billingToggle}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              billing === "monthly" && styles.toggleButtonActive,
            ]}
            onPress={() => setBilling("monthly")}
          >
            <Text
              style={[
                styles.toggleButtonText,
                billing === "monthly" && styles.toggleButtonTextActive,
              ]}
            >
              Monthly
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              billing === "yearly" && styles.toggleButtonActive,
            ]}
            onPress={() => setBilling("yearly")}
          >
            <Text
              style={[
                styles.toggleButtonText,
                billing === "yearly" && styles.toggleButtonTextActive,
              ]}
            >
              Yearly
            </Text>
            <View style={styles.saveBadge}>
              <Text style={styles.saveBadgeText}>Save 20%</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Plan Cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.plansContainer}
        >
          {plans.map((planName) => (
            <PlanCard key={planName} planName={planName} billing={billing} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
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
    fontSize: 36,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 12,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#6B7280",
    textAlign: "center",
  },
  billingToggle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
    marginBottom: 40,
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#E5E7EB",
  },
  toggleButtonActive: {
    backgroundColor: "#FF7A00",
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  toggleButtonTextActive: {
    color: "#FFFFFF",
  },
  saveBadge: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  saveBadgeText: {
    fontSize: 10,
    color: "#FF7A00",
    fontWeight: "600",
  },
  plansContainer: {
    gap: 24,
    paddingHorizontal: 8,
  },
});

export default PricingPlans;

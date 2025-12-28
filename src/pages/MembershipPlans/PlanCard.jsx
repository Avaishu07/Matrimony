import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const planData = {
  Basic: {
    price: 15,
    features: [
      "Access up to 50 profiles",
      "Message via platform",
      "Basic search filters",
      "Public visibility",
      "Standard support",
    ],
  },
  Premium: {
    price: 39,
    tag: "Most Popular",
    features: [
      "Unlimited profile access",
      "Advanced matchmaking filters",
      "Priority search visibility",
      "Profile verification badge",
      "Dedicated relationship manager",
      "Video call feature",
      "24/7 premium support",
    ],
  },
  Elite: {
    price: 79,
    features: [
      "Everything in Premium",
      "Exclusive matchmaking assistance",
      "Personalized recommendations",
      "Access to elite community",
      "Enhanced privacy controls",
    ],
  },
  Platinum: {
    price: 159,
    features: [
      "24/7 personal relationship manager",
      "Direct meeting coordination",
      "Exclusive verified circle",
      "Premium support anytime",
      "Success guarantee",
    ],
  },
};

const PlanCard = ({ planName, billing }) => {
  const plan = planData[planName];

  const price =
    billing === "monthly"
      ? plan.price
      : Math.round(plan.price * 12 * 0.8); // 20% discount yearly

  const priceLabel = billing === "monthly" ? "/month" : "/year";

  return (
    <View
      style={[
        styles.card,
        plan.tag && styles.cardHighlighted,
      ]}
    >
      {plan.tag && (
        <View style={styles.tagContainer}>
          <Text style={styles.tagText}>{plan.tag}</Text>
        </View>
      )}

      <Text style={styles.planName}>{planName}</Text>

      {/* Price */}
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price}</Text>
        <Text style={styles.priceLabel}>{priceLabel}</Text>
      </View>

      {/* Features */}
      <View style={styles.featuresContainer}>
        {plan.features.map((feature, idx) => (
          <View key={idx} style={styles.featureItem}>
            <Icon name="check-circle" size={16} color="#00C851" />
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>

      {/* Button */}
      <TouchableOpacity
        style={[
          styles.button,
          plan.tag ? styles.buttonPrimary : styles.buttonSecondary,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            plan.tag ? styles.buttonTextPrimary : styles.buttonTextSecondary,
          ]}
        >
          Choose {planName}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 280,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHighlighted: {
    borderColor: "#FF7A00",
    borderWidth: 2,
  },
  tagContainer: {
    position: "absolute",
    top: -12,
    alignSelf: "center",
    backgroundColor: "#FF7A00",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 20,
  },
  tagText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
  },
  planName: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
    color: "#111827",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF7A00",
  },
  priceLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginLeft: 4,
  },
  featuresContainer: {
    width: "100%",
    marginBottom: 24,
    minHeight: 160,
  },
  featureItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  featureText: {
    fontSize: 14,
    color: "#374151",
    flex: 1,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#FF7A00",
  },
  buttonSecondary: {
    borderWidth: 1,
    borderColor: "#FF7A00",
    backgroundColor: "transparent",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextPrimary: {
    color: "#FFFFFF",
  },
  buttonTextSecondary: {
    color: "#FF7A00",
  },
});

export default PlanCard;

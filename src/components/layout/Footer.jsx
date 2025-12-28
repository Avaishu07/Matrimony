import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Linking } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Footer = () => {
  const navigation = useNavigation();

  const quickLinks = [
    { label: "Home", screen: "Home" },
    { label: "About Us", screen: "Home" },
    { label: "Success Stories", screen: "SuccessStories" },
    { label: "Membership Plans", screen: "Plans" },
    { label: "Privacy Policy", screen: "Home" },
    { label: "Terms & Conditions", screen: "Home" },
    { label: "Contact Us", screen: "Contact" },
    { label: "FAQs", screen: "Home" },
  ];

  const communities = [
    "Hindu Matrimony",
    "Christian Matrimony",
    "Muslim Matrimony",
    "Sikh Matrimony",
    "Jain Matrimony",
    "Buddhist Matrimony",
  ];

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
  };

  const openSocialLink = (url) => {
    Linking.openURL(url).catch((err) => console.error("Failed to open URL:", err));
  };

  return (
    <View style={styles.footer}>
      <ScrollView
        horizontal={false}
        contentContainerStyle={styles.footerContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Column 1 */}
        <View style={styles.column}>
          <Text style={styles.logoText}>
            Matrimony <Text style={styles.logoHighlight}>Logo</Text>
          </Text>
          <Text style={styles.description}>
            Welcome to India's most trusted matrimonial platform dedicated to
            helping people find their perfect life partner. With thousands of
            verified profiles and personalized matchmaking, we make your journey
            to marriage simple, secure, and successful.
          </Text>
        </View>

        {/* Column 2 - Quick Links */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>QUICK LINKS</Text>
          <View style={styles.linksList}>
            {quickLinks.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.linkItem}
                onPress={() => handleNavigation(item.screen)}
              >
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.linkText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Column 3 - Explore by Community */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>EXPLORE BY COMMUNITY</Text>
          <View style={styles.linksList}>
            {communities.map((item, index) => (
              <View key={index} style={styles.linkItem}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.communityText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Column 4 - Social */}
        <View style={styles.column}>
          <Text style={styles.columnTitle}>FOLLOW US</Text>
          <Text style={styles.socialDescription}>
            Stay connected with us on social media for updates, wedding tips,
            and success stories.
          </Text>
          <View style={styles.socialIcons}>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocialLink("https://instagram.com")}
            >
              <Icon name="instagram" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocialLink("https://twitter.com")}
            >
              <Icon name="twitter" size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.socialButton}
              onPress={() => openSocialLink("https://facebook.com")}
            >
              <Icon name="facebook" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* Divider */}
      <View style={styles.divider}>
        <Text style={styles.copyright}>Copyright ©</Text>
        <Text style={styles.copyright}>2025 Matrimony. All rights reserved.</Text>
        <Text style={styles.copyrightNote}>
          Your trusted partner in finding love and lifelong happiness.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    backgroundColor: "#2b2b2b",
    paddingVertical: 48,
    paddingHorizontal: 24,
  },
  footerContent: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 40,
  },
  column: {
    flex: 1,
    minWidth: 200,
    marginBottom: 20,
  },
  logoText: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  logoHighlight: {
    color: "#F97316",
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: "#D1D5DB",
  },
  columnTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  linksList: {
    gap: 8,
  },
  linkItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  bullet: {
    color: "#F97316",
    fontWeight: "bold",
    marginRight: 8,
  },
  linkText: {
    color: "#B5B297",
    fontSize: 14,
    textDecorationLine: "underline",
  },
  communityText: {
    color: "#B5B297",
    fontSize: 14,
  },
  socialDescription: {
    fontSize: 14,
    marginBottom: 16,
    color: "#B5B297",
  },
  socialIcons: {
    flexDirection: "row",
    gap: 16,
  },
  socialButton: {
    backgroundColor: "#F97316",
    padding: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: "#374151",
    marginTop: 40,
    paddingTop: 24,
    alignItems: "center",
  },
  copyright: {
    fontSize: 14,
    color: "#9CA3AF",
    textAlign: "center",
  },
  copyrightNote: {
    fontSize: 14,
    color: "#9CA3AF",
    marginTop: 4,
    textAlign: "center",
  },
});

export default Footer;

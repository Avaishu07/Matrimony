/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Platform,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import AsyncStorage from "@react-native-async-storage/async-storage";

import NotificationSidebar from "../NotificationPanel/NotificationPanel";
import LogoutPanel from "../LogoutPanel/LogoutPanel";
import { useAuth } from "../../context/AuthContext";

import {
  useGetOwnProfileQuery,
  useGetSentInterestsQuery,
  useGetReceivedInterestsQuery,
} from "../../context/profileApi";

import { mapNavbarProfile } from "../../context/mapNavbarProfile";

const navItems = [
  { name: "Home", screen: "Home" },
  { name: "Search Profiles", screen: "SearchProfiles" },
  { name: "Brides", screen: "Brides" },
  { name: "Grooms", screen: "Grooms" },
  { name: "Success Stories", screen: "SuccessStories" },
  { name: "Membership Plans", screen: "Plans" },
  { name: "Contact Us", screen: "Contact" },
];

const Navbar = () => {
  const navigation = useNavigation();
  const { isLoggedIn, logout } = useAuth();

  const [openNotify, setOpenNotify] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  // Check login status
  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      setLoggedIn(isLoggedIn || !!token);
    };
    checkLogin();
  }, [isLoggedIn]);

  // API CALLS
  const { data: ownProfile } = useGetOwnProfileQuery();
  const { data: sentData } = useGetSentInterestsQuery();
  const { data: receivedData } = useGetReceivedInterestsQuery();

  // MAPPING
  const navbarProfile = mapNavbarProfile(
    ownProfile,
    sentData,
    receivedData
  );

  const getInitial = () => {
    const name = navbarProfile?.fullName;
    return name ? name.charAt(0).toUpperCase() : "U";
  };

  const handleNavigation = (screen) => {
    navigation.navigate(screen);
    setMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <View style={styles.navbar}>
        <View style={styles.navbarContent}>
          {/* LOGO */}
          <Text style={styles.logo}>Matrimony</Text>

          {/* DESKTOP MENU - Hidden on mobile, shown on tablet+ */}
          {Platform.OS === "web" && (
            <View style={styles.desktopMenu}>
              {navItems.map((n) => (
                <TouchableOpacity
                  key={n.name}
                  onPress={() => handleNavigation(n.screen)}
                  style={styles.navItem}
                >
                  <Text style={styles.navItemText}>{n.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* RIGHT ACTIONS */}
          <View style={styles.rightActions}>
            {loggedIn && (
              <TouchableOpacity
                onPress={() => setOpenNotify(true)}
                style={styles.iconButton}
              >
                <Icon name="bell" size={20} color="#FF8A41" />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </TouchableOpacity>
            )}

            {loggedIn ? (
              <TouchableOpacity
                onPress={() => setOpenLogout(true)}
                style={styles.profileButton}
              >
                <Text style={styles.profileInitial}>{getInitial()}</Text>
              </TouchableOpacity>
            ) : (
              Platform.OS === "web" && (
                <View style={styles.authButtons}>
                  <TouchableOpacity
                    onPress={() => handleNavigation("SignIn")}
                    style={styles.signInButton}
                  >
                    <Text style={styles.signInText}>Sign In</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => handleNavigation("SignUp")}
                    style={styles.signUpButton}
                  >
                    <Text style={styles.signUpText}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
              )
            )}

            {/* MOBILE TOGGLE */}
            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => setMenuOpen(!menuOpen)}
            >
              <Icon
                name={menuOpen ? "x" : "menu"}
                size={24}
                color="#FF8A41"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* MOBILE MENU */}
        {menuOpen && (
          <View style={styles.mobileMenu}>
            <ScrollView style={styles.mobileMenuContent}>
              {navItems.map((n) => (
                <TouchableOpacity
                  key={n.name}
                  onPress={() => handleNavigation(n.screen)}
                  style={styles.mobileMenuItem}
                >
                  <Text style={styles.mobileMenuText}>{n.name}</Text>
                </TouchableOpacity>
              ))}

              <View style={styles.mobileAuthSection}>
                {!loggedIn ? (
                  <>
                    <TouchableOpacity
                      onPress={() => handleNavigation("SignIn")}
                      style={styles.mobileSignInButton}
                    >
                      <Text style={styles.mobileSignInText}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => handleNavigation("SignUp")}
                      style={styles.mobileSignUpButton}
                    >
                      <Text style={styles.mobileSignUpText}>Sign Up</Text>
                    </TouchableOpacity>
                  </>
                ) : (
                  <TouchableOpacity
                    onPress={() => {
                      logout();
                      setMenuOpen(false);
                    }}
                    style={styles.mobileLogoutButton}
                  >
                    <Text style={styles.mobileLogoutText}>Logout</Text>
                  </TouchableOpacity>
                )}
              </View>
            </ScrollView>
          </View>
        )}
      </View>

      {/* PANELS */}
      <NotificationSidebar
        open={openNotify}
        onClose={() => setOpenNotify(false)}
      />
      <LogoutPanel
        open={openLogout}
        onClose={() => setOpenLogout(false)}
        sentCount={navbarProfile?.sentCount || 0}
        receivedCount={navbarProfile?.receivedCount || 0}
      />
    </>
  );
};

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    backgroundColor: "rgba(255, 140, 68, 0.15)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 200,
  },
  navbarContent: {
    maxWidth: 1400,
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    paddingHorizontal: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF8A41",
  },
  desktopMenu: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    display: Platform.OS === "web" ? "flex" : "none",
  },
  navItem: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  navItemText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconButton: {
    position: "relative",
    padding: 8,
    borderRadius: 20,
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#EF4444",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
  profileButton: {
    width: 36,
    height: 36,
    backgroundColor: "#FF8A41",
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  profileInitial: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  authButtons: {
    flexDirection: "row",
    gap: 12,
  },
  signInButton: {
    backgroundColor: "#FF8A41",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  signInText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  signUpButton: {
    backgroundColor: "#FF8A41",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  signUpText: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  menuButton: {
    padding: 8,
    borderRadius: 20,
  },
  mobileMenu: {
    backgroundColor: "rgba(255, 140, 68, 0.15)",
    borderTopWidth: 1,
    borderTopColor: "#FB923C",
  },
  mobileMenuContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  mobileMenuItem: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 4,
  },
  mobileMenuText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#1F2937",
  },
  mobileAuthSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#D1D5DB",
  },
  mobileSignInButton: {
    backgroundColor: "#FF8A41",
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: "center",
  },
  mobileSignInText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  mobileSignUpButton: {
    backgroundColor: "#FF8A41",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  mobileSignUpText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
  mobileLogoutButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: "center",
  },
  mobileLogoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
  },
});

export default Navbar;

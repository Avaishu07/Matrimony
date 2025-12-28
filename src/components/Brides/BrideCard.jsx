import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Feather";
import { useAuth } from "../../context/AuthContext";
import { useAddToFavoriteMutation } from "../../context/profileApi";

const BrideCard = ({ profile }) => {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();

  const [addToFavorite, { isLoading }] = useAddToFavoriteMutation();
  const [isFavorited, setIsFavorited] = useState(false);
  const [imageError, setImageError] = useState(false);

  if (!profile) return null;

  const {
    userProfileId,
    firstName,
    age,
    religion,
    caste,
    height,
    complexion,
    currentCity,
    maritalStatus,
    profilePhotoBase64,
    profilePhotoContentType,
    hasProfilePhoto,
  } = profile;

  const fullName = firstName || "Profile";

  /* HEIGHT: cm → ft/in */
  const heightInInches = height ? height / 2.54 : 0;
  const ft = Math.floor(heightInInches / 12);
  const inches = Math.round(heightInInches % 12);
  const heightText = height ? `${ft}'${inches}"` : "";

  /* IMAGE SOURCE */
  const imageSource = useMemo(() => {
    if (
      hasProfilePhoto === true &&
      profilePhotoBase64 &&
      profilePhotoContentType &&
      !imageError
    ) {
      return {
        uri: `data:${profilePhotoContentType};base64,${profilePhotoBase64}`,
      };
    }
    return require("../../assets/Bride/Img1.webp");
  }, [hasProfilePhoto, profilePhotoBase64, profilePhotoContentType, imageError]);

  /* FAVORITE HANDLER */
  const handleFavorite = async () => {
    if (!isLoggedIn) {
      navigation.navigate("SignIn");
      return;
    }

    try {
      await addToFavorite(userProfileId).unwrap();
      setIsFavorited(true);
    } catch (error) {
      console.error("Add to favorite failed", error);
      Alert.alert("Error", error?.data?.message || "Failed to add to favorites");
    }
  };

  const handleViewProfile = () => {
    navigation.navigate(
      isLoggedIn ? "OthersEmptyBiodataPage" : "PublicBiodataPage",
      { userProfileId }
    );
  };

  const profileDetails = [
    age && { label: "Age", value: `${age} Yrs` },
    religion && { label: "Religion", value: religion },
    caste && { label: "Caste", value: caste },
    complexion && { label: "Complexion", value: complexion },
    heightText && { label: "Height", value: heightText },
    currentCity && { label: "City", value: currentCity },
    maritalStatus && { label: "Marital Status", value: maritalStatus },
  ].filter(Boolean);

  return (
    <View style={styles.container}>
      {/* IMAGE */}
      <View style={styles.imageContainer}>
        <Image
          source={imageSource}
          style={styles.image}
          resizeMode="cover"
          onError={() => setImageError(true)}
        />
      </View>

      {/* DETAILS */}
      <View style={styles.detailsContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.name}>{fullName}</Text>

          {isLoggedIn && (
            <View style={styles.headerActions}>
              <TouchableOpacity
                onPress={handleFavorite}
                disabled={isFavorited || isLoading}
                style={[
                  styles.favoriteButton,
                  isFavorited && styles.favoriteButtonDisabled,
                ]}
              >
                <Icon
                  name="heart"
                  size={18}
                  color={isFavorited ? "#9CA3AF" : "#FFFFFF"}
                  solid={isFavorited}
                />
              </TouchableOpacity>

              <View style={styles.idBadge}>
                <Text style={styles.idText}>ID: {userProfileId}</Text>
              </View>
            </View>
          )}
        </View>

        {/* PROFILE DETAILS */}
        <View style={styles.detailsList}>
          {profileDetails.map((detail, index) => (
            <Text key={index} style={styles.detailItem}>
              <Text style={styles.detailLabel}>{detail.label}:</Text> {detail.value}
            </Text>
          ))}
        </View>

        {/* VIEW PROFILE BUTTON */}
        <TouchableOpacity
          style={styles.viewProfileButton}
          onPress={handleViewProfile}
        >
          <Text style={styles.viewProfileButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    overflow: "hidden",
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
    marginBottom: 24,
  },
  imageContainer: {
    width: "33.33%",
  },
  image: {
    width: "100%",
    height: 240,
  },
  detailsContainer: {
    padding: 16,
    paddingHorizontal: 32,
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  favoriteButton: {
    backgroundColor: "#EF4444",
    padding: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  favoriteButtonDisabled: {
    backgroundColor: "#D1D5DB",
  },
  idBadge: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  idText: {
    color: "#DC2626",
    fontSize: 12,
    fontWeight: "600",
  },
  detailsList: {
    marginTop: 8,
    gap: 2,
  },
  detailItem: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
  },
  detailLabel: {
    fontWeight: "600",
  },
  viewProfileButton: {
    marginTop: 12,
    backgroundColor: "#F97316",
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 6,
    alignSelf: "flex-start",
  },
  viewProfileButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
});

export default BrideCard;

import React from "react";
import { View, StyleSheet, Animated } from "react-native";

const SkeletonSearchCard = () => {
  const pulseAnim = new Animated.Value(0.3);

  React.useEffect(() => {
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    pulse.start();
    return () => pulse.stop();
  }, []);

  const opacity = pulseAnim;

  return (
    <View style={styles.container}>
      {/* Image Skeleton */}
      <View style={[styles.imageSkeleton, { opacity }]} />

      {/* Details */}
      <View style={styles.detailsContainer}>
        {/* Name + ID */}
        <View style={styles.headerRow}>
          <View style={[styles.skeletonBox, { width: "33%", opacity }]} />
          <View style={[styles.skeletonBox, { width: 64, opacity }]} />
        </View>

        {/* Profile details */}
        <View style={styles.detailsRow}>
          <View style={[styles.skeletonBox, { width: "50%", height: 12, opacity }]} />
          <View style={[styles.skeletonBox, { width: "33%", height: 12, opacity }]} />
          <View style={[styles.skeletonBox, { width: "66%", height: 12, opacity }]} />
          <View style={[styles.skeletonBox, { width: "25%", height: 12, opacity }]} />
          <View style={[styles.skeletonBox, { width: "50%", height: 12, opacity }]} />
        </View>

        {/* Button */}
        <View style={[styles.skeletonBox, { width: 128, height: 32, marginTop: 16, opacity }]} />
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
    elevation: 2,
    overflow: "hidden",
    width: "100%",
    maxWidth: 768,
    alignSelf: "center",
  },
  imageSkeleton: {
    width: "33.33%",
    height: 240,
    backgroundColor: "#D1D5DB",
  },
  detailsContainer: {
    padding: 16,
    paddingHorizontal: 32,
    flex: 1,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  detailsRow: {
    gap: 8,
  },
  skeletonBox: {
    backgroundColor: "#D1D5DB",
    borderRadius: 4,
    height: 16,
  },
});

export default SkeletonSearchCard;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import AppLayout from "../components/layout/AppLayout";
import ProfileCard from "../components/Brides/BrideCard";
import SkeletonSearchCard from "../components/SearchProfiles/SkeletonSearchCard";
import { useGetPublicProfileByIdQuery } from "../context/profileApi";

const SearchProfiles = () => {
  const [profileId, setProfileId] = useState("");
  const [searchedIds, setSearchedIds] = useState([]);
  const [profiles, setProfiles] = useState([]);

  const lastSearchedId = searchedIds[searchedIds.length - 1];

  const { data, isLoading, isError } = useGetPublicProfileByIdQuery(
    lastSearchedId,
    {
      skip: !lastSearchedId,
    }
  );

  const handleIdSearch = () => {
    const trimmedId = profileId.trim();

    if (!trimmedId) {
      Alert.alert("Error", "Enter Profile ID");
      return;
    }

    if (searchedIds.includes(trimmedId)) {
      setProfileId("");
      return;
    }

    setSearchedIds((prev) => [...prev, trimmedId]);
    setProfileId("");
  };

  useEffect(() => {
    if (data?.data && !isError) {
      setProfiles([data.data]);
    }
  }, [data, isError]);

  return (
    <AppLayout>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>
            Search <Text style={styles.titleHighlight}>Profile by ID</Text>
          </Text>

          {/* SEARCH */}
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              value={profileId}
              onChangeText={setProfileId}
              placeholder="Enter Profile ID"
              placeholderTextColor="#9CA3AF"
            />

            <TouchableOpacity style={styles.searchButton} onPress={handleIdSearch}>
              <Icon name="search" size={20} color="#FFFFFF" />
              <Text style={styles.searchButtonText}>Search Profile</Text>
            </TouchableOpacity>
          </View>

          {/* LOADER */}
          {isLoading && <SkeletonSearchCard />}

          {/* ERROR */}
          {isError && (
            <Text style={styles.errorText}>Profile not found</Text>
          )}

          {/* RESULTS */}
          <ScrollView style={styles.resultsContainer}>
            {profiles.map((profile) => (
              <ProfileCard
                key={profile.userProfileId}
                profile={profile}
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    paddingVertical: 48,
    paddingHorizontal: 16,
  },
  content: {
    maxWidth: 896,
    alignSelf: "center",
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    padding: 32,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 32,
    color: "#111827",
  },
  titleHighlight: {
    color: "#F97316",
  },
  searchContainer: {
    gap: 24,
    marginBottom: 32,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: "#111827",
  },
  searchButton: {
    backgroundColor: "#F97316",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 12,
  },
  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  errorText: {
    textAlign: "center",
    color: "#EF4444",
    marginTop: 24,
    fontSize: 16,
  },
  resultsContainer: {
    marginTop: 32,
    gap: 24,
  },
});

export default SearchProfiles;

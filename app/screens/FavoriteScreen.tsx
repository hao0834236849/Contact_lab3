import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

interface Favorite {
  number: string;
  name: string;
}

const FavoriteScreen: React.FC = () => {
  // State for favorite contacts
  const [favorites, setFavorites] = useState<Favorite[]>([
    { number: "0123456789", name: "John Doe" },
    { number: "0987654321", name: "Jane Smith" },
  ]);

  // State to store new favorite contact
  const [newFavoriteNumber, setNewFavoriteNumber] = useState("");
  const [newFavoriteName, setNewFavoriteName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Function to add a favorite contact
  const handleAddFavorite = () => {
    if (newFavoriteNumber.trim() && newFavoriteName.trim()) {
      if (!favorites.some((fav) => fav.number === newFavoriteNumber)) {
        setFavorites([
          ...favorites,
          { number: newFavoriteNumber, name: newFavoriteName },
        ]);
        setNewFavoriteNumber("");
        setNewFavoriteName("");
      } else {
        Alert.alert(
          "Error",
          "This phone number is already in the favorites list."
        );
      }
    } else {
      Alert.alert("Error", "Please enter both name and phone number.");
    }
  };

  // Function to delete a favorite contact
  const handleDeleteFavorite = (number: string) => {
    setFavorites(favorites.filter((fav) => fav.number !== number));
  };

  // Filter favorites based on search query
  const filteredFavorites = favorites.filter((fav) =>
    fav.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Contacts:</Text>

      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search by name"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.input}
        />
        <TouchableOpacity
          onPress={() => setSearchQuery("")}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>Tìm kiếm</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredFavorites}
        keyExtractor={(item) => item.number}
        renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Text style={styles.favoriteText}>
              {item.name}: {item.number}
            </Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDeleteFavorite(item.number)}
            >
              <Text style={styles.deleteText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TextInput
        placeholder="Add name"
        value={newFavoriteName}
        onChangeText={setNewFavoriteName}
        style={styles.input}
      />

      <TextInput
        placeholder="Add phone number"
        value={newFavoriteNumber}
        onChangeText={setNewFavoriteNumber}
        keyboardType="numeric"
        style={styles.input}
      />

      <Button title="Add to Favorites" onPress={handleAddFavorite} />
    </View>
  );
};

// Styles for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  favoriteItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  favoriteText: {
    fontSize: 16,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  deleteButton: {
    backgroundColor: "red",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
    marginLeft: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default FavoriteScreen;

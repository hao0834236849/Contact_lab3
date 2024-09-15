import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome6";

interface DialpadProps {
  onPressNumber: (number: string) => void;
  onDelete: () => void;
}

const Dialpad: React.FC<DialpadProps> = ({ onPressNumber, onDelete }) => {
  const buttons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"];

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>
        {buttons.map((button) => (
          <TouchableOpacity
            key={button}
            style={styles.button}
            onPress={() => onPressNumber(button)}
          >
            <Text style={styles.buttonText}>{button}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
        <FontAwesome name="delete-left" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    padding: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300, // Set a fixed width to avoid overflow
    justifyContent: "space-between",
    marginBottom: 10,
  },
  button: {
    width: "30%", // Adjusted width for better alignment
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    backgroundColor: "#f8f8f8",
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "#333",
  },
  deleteButton: {
    width: "25%",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#000000",
    borderRadius: 5,
  },
});

export default Dialpad;

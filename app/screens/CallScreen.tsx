import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  TextInput,
  Button,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Dialpad from "./DialPadScreen"; // Import the Dialpad component

interface Call {
  id: string;
  number: string;
  type: "incoming" | "outgoing";
}

const CallScreen: React.FC = () => {
  const [calls, setCalls] = useState<Call[]>([
    { id: "1", number: "0987654321", type: "incoming" },
    { id: "2", number: "0123456789", type: "outgoing" },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleCall = (id: string, number: string) => {
    Linking.openURL(`tel:${number}`).catch((err) =>
      console.error("Failed to open dialer", err)
    );

    setCalls((prevCalls) =>
      prevCalls.map((call) =>
        call.id === id
          ? {
              ...call,
              type: call.type === "incoming" ? "outgoing" : call.type,
            }
          : call
      )
    );
  };

  const handleCallFromInput = () => {
    if (newPhoneNumber.trim()) {
      Linking.openURL(`tel:${newPhoneNumber}`).catch((err) =>
        console.error("Failed to open dialer", err)
      );
      setNewPhoneNumber("");
      setIsModalVisible(false);
    }
  };

  const handlePressNumber = (number: string) => {
    setNewPhoneNumber((prev) => prev + number);
  };

  const handleDelete = () => {
    setNewPhoneNumber((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách cuộc gọi:</Text>
      <FlatList
        data={calls}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.callItem,
              item.type === "incoming" && { backgroundColor: "#ffdddd" },
            ]}
            onPress={() => handleCall(item.id, item.number)}
          >
            <Text
              style={[
                styles.callText,
                item.type === "incoming" && { color: "red" },
              ]}
            >
              {item.type === "incoming" ? "Cuộc gọi đến" : "Cuộc gọi đi"}:{" "}
              {item.number}
            </Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setIsModalVisible(true)}
      >
        <FontAwesome name="keyboard-o" size={24} color="white" />
      </TouchableOpacity>

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Nhập số điện thoại:</Text>
            <TextInput
              style={styles.input}
              value={newPhoneNumber}
              onChangeText={setNewPhoneNumber}
              keyboardType="phone-pad"
              placeholder="Số điện thoại"
            />
            <Dialpad
              onPressNumber={handlePressNumber}
              onDelete={handleDelete}
            />
            <View style={styles.buttonContainer}>
              <Button title="Gọi" onPress={handleCallFromInput} />
              <Button
                title="Hủy"
                color="red"
                onPress={() => setIsModalVisible(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  callItem: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  callText: {
    fontSize: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    backgroundColor: "#007AFF",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default CallScreen;

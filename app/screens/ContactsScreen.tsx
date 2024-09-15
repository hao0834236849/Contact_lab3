import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Contact } from "../types"; // Adjust import path as needed

type ContactsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Contacts"
>;

interface Props {
  navigation: ContactsScreenNavigationProp;
}

const ContactsScreen: React.FC<Props> = ({ navigation }) => {
  // Sample state and handlers
  const [contacts, setContacts] = React.useState<Contact[]>([
    {
      id: "1",
      name: "Nguyen Van A",
      phone: "0123456789",
      email: "example@example.com",
    },
    {
      id: "2",
      name: "Tran Thi B",
      phone: "0987654321",
      email: "example@example.com",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleAddContact = () => {
    if (newName.trim() && newPhone.trim()) {
      setContacts([
        ...contacts,
        {
          id: Math.random().toString(),
          name: newName,
          phone: newPhone,
          email: "",
        },
      ]);
      setNewName("");
      setNewPhone("");
    } else {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tên và số điện thoại");
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh bạ:</Text>
      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ContactDetail", { contact: item })
            }
          >
            <Text>
              {item.name}: {item.phone}
            </Text>
          </TouchableOpacity>
        )}
      />
      {/* Add your other components here */}
    </View>
  );
};

// Styles here
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
});

export default ContactsScreen;

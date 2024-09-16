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
  Image,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Contact } from "../types";

type ContactsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Contacts"
>;

interface Props {
  navigation: ContactsScreenNavigationProp;
}

const ContactsScreen: React.FC<Props> = ({ navigation }) => {
  // Sample state and handlers
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: "1",
      name: "Nguyen Van Ornn",
      phone: "0123456789",
      email: "example@example.com",
      avatar: "https://c4.wallpaperflare.com/wallpaper/47/627/787/elderwood-ornn-league-of-legends-league-of-legends-riot-games-goat-hd-wallpaper-preview.jpg",
    },
    {
      id: "2",
      name: "Tran Thi Ahri",
      phone: "0987654321",
      email: "example@example.com",
      avatar: "https://c4.wallpaperflare.com/wallpaper/50/914/446/spirit-blossom-ahri-league-of-legends-ahri-league-of-legends-riot-games-hd-wallpaper-preview.jpg",
    },
    {
      id: "3",
      name: "Le Tran Van Yone",
      phone: "0987654321",
      email: "example@example.com",
      avatar: "https://c4.wallpaperflare.com/wallpaper/34/608/886/yone-league-of-legends-league-of-legends-riot-games-spirit-blossom-hd-wallpaper-preview.jpg",
    },
    {
      id: "4",
      name: "HeHeHe",
      phone: "0654789321",
      email: "example@example.com",
      avatar: "https://cdn.tgdd.vn/Products/Images/2282/83640/bhx/6-lon-bia-heineken-330ml-201904241647511710.jpg",
    },
    {
      id: "5",
      name: "333",
      phone: "0753951862",
      email: "example@example.com",
      avatar: "https://cdn.tgdd.vn/Products/Images/2282/195211/bhx/6-lon-bia-333-330ml-202103162311002405.jpg",
    },
  ]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");

  const handleAddContact = () => {
    if (newName.trim() && newPhone.trim()) {
      const newContact = {
        id: Math.random().toString(),
        name: newName,
        phone: newPhone,
        email: "",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
      };
      setContacts((prevContacts) => {
        // Add new contact and sort alphabetically
        const updatedContacts = [...prevContacts, newContact];
        return updatedContacts.sort((a, b) => a.name.localeCompare(b.name));
      });
      setNewName("");
      setNewPhone("");
    } else {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ tên và số điện thoại");
    }
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== id)
    );
  };

  // Sort contacts alphabetically
  const sortedContacts = contacts.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh bạ</Text>
      <FlatList
        data={sortedContacts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("ContactDetail", { contact: item })
            }
          >
            <View style={styles.contactItemContainer}>
              {/* Display avatar */}
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.contactItemName}>{item.name}</Text>
                <Text style={styles.contactItemPhone}>{item.phone}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      {/* Add contact input and button */}
      <View style={styles.addContactContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tên liên hệ"
          value={newName}
          onChangeText={setNewName}
        />
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={newPhone}
          onChangeText={setNewPhone}
          keyboardType="phone-pad"
        />
        <Button title="Thêm liên hệ" onPress={handleAddContact} />
      </View>
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
    textAlign: "center", // Center the title
  },
  contactItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginVertical: 10,
  },
  contactItemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  contactItemPhone: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  separator: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  addContactContainer: {
    marginTop: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
});

export default ContactsScreen;

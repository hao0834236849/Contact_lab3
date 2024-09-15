import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { ContactDetailScreenRouteProp } from "../types"; // Adjust import path as needed

interface Props {
  route: ContactDetailScreenRouteProp;
}

const ContactDetailScreen: React.FC<Props> = ({ route }) => {
  const { contact } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chi tiết liên hệ</Text>
      <Text style={styles.detail}>Tên: {contact.name}</Text>
      <Text style={styles.detail}>Số điện thoại: {contact.phone}</Text>
      <Text style={styles.detail}>Email: {contact.email}</Text>
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
  detail: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ContactDetailScreen;

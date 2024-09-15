import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import FontAwesome from "react-native-vector-icons/FontAwesome";

// Screen imports
import CallScreen from "./screens/CallScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import ContactsScreen from "./screens/ContactsScreen";
import ContactDetailScreen from "./screens/ContactDetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Contacts flow
const ContactsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Contacts" component={ContactsScreen} />
  </Stack.Navigator>
);

export default function App() {
  return (
    // NavigationContainer is essential and cannot be removed

    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Cuộc gọi") {
            iconName = "phone";
          } else if (route.name === "Yêu thích") {
            iconName = "star";
          } else if (route.name === "Danh bạ") {
            iconName = "address-book";
          }

          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Cuộc gọi" component={CallScreen} />
      <Tab.Screen name="Yêu thích" component={FavoriteScreen} />
      <Tab.Screen name="Danh bạ" component={ContactsStack} />
    </Tab.Navigator>
  );
}

import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackNavigationProp as StackNavigationPropType } from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/native";

// Define the types for bottom tab navigation
export type TabParamList = {
  "Cuộc gọi": undefined;
  "Yêu thích": undefined;
  "Danh bạ": undefined;
};

// Define the types for stack navigation
export type RootStackParamList = {
  Contacts: undefined;
  ContactDetail: { contact: Contact };
};

// Define the type for a contact
export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatar: string;
}

// Define the type for tab navigation prop
export type TabNavigationProp = BottomTabNavigationProp<TabParamList>;

// Define the type for stack navigation prop
export type StackNavigationProp = StackNavigationPropType<RootStackParamList>;

// Define the type for route prop in ContactDetailScreen
export type ContactDetailScreenRouteProp = RouteProp<
  RootStackParamList,
  "ContactDetail"
>;

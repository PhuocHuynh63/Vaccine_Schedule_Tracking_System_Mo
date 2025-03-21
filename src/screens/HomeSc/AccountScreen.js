import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { SercuseService } from "@services/sercuseService";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "@routes/index";

export default function AccountScreen() {
  const navigation = useNavigation();


  const handleLogout = async () => {
    await SercuseService.remove('accessToken');
    await SercuseService.remove('userId');
    navigation.navigate(ROUTES.SIGNIN, { email: undefined });
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <FontAwesome name="user-circle-o" size={60} color="#ddd" />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>NGUYỄN THÁI AN</Text>
          <Text style={styles.userDetails}>0855055390 - Nam, 02/02/2001</Text>
        </View>
        <TouchableOpacity style={styles.notificationIcon}>
          <Feather name="bell" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        <MenuItem icon="edit" text="Edit Account" />
        <MenuItem icon="search" text="Look Up Bonus Points" />
        <MenuItem icon="lock" text="Change Password" />
        <MenuItem icon="sign-out" text="Logout" onPress={handleLogout} />
      </View>

      {/* Version Info */}
      <Text style={styles.version}>Version 1.3.1</Text>
    </View>
  );
}

// Component cho từng menu item
const MenuItem = ({ icon, text, onPress }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <FontAwesome name={icon} size={18} color="#333" style={styles.menuIcon} />
    <Text style={styles.menuText}>{text}</Text>
    <Feather name="chevron-right" size={18} color="#aaa" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#4A68FF",
    paddingVertical: 20,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  avatarContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20
  },
  userInfo: {
    marginLeft: 15,
    flex: 1,
    marginTop: 20
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  userDetails: {
    fontSize: 12,
    color: "#fff",
    marginTop: 2,
  },
  notificationIcon: {
    position: "absolute",
    right: 16,
    top: 20,
  },
  menu: {
    marginTop: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  menuIcon: {
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  version: {
    textAlign: "center",
    color: "#999",
    fontSize: 12,
    marginTop: 30,
  },
});

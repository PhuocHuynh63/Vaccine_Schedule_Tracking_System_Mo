import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <ScrollView>
      {/* Header */}
      <View
        style={{
          position: "relative",
        }}
      >
        <View
          style={{
            height: 180,
            backgroundColor: "#4865F3",
            flexDirection: "row",
            alignItems: "center",
            padding: "5%",
            position: "relative",
            zIndex: 1,
          }}
        >
          <View style={{ width: "25%", marginBottom: "16%" }}>
            <Ionicons name="notifications-outline" size={20} color="white" />
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
                backgroundColor: "#D1D5DB",
                marginBottom: "30%",
              }}
            />
            <View style={{ marginLeft: "10%", marginBottom: "30%" }}>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={{ textAlign: "center", color: "white" }}>
                Thai An
              </Text>
            </View>
          </View>
        </View>

        {/* */}
        <View
          style={{
            backgroundColor: "#D1D5DB",
            height: 150,
            marginHorizontal: 15,
            borderRadius: 10,
            position: "absolute",
            top: "16%",
            left: 0,
            right: 0,
            alignSelf: "center",
            width: "90%",
            zIndex: 2,
            elevation: 2,
          }}
        />

        {/* Icon Grid */}
        <View style={styles.gridContainer}>
          {gridItems.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.gridItem}
              onPress={() => {
                if (item.label === "Vaccine For You") {
                  navigation.navigate("ListVaccinatorProfile");
                }
              }}
              >
              <Ionicons
                style={{
                  backgroundColor: "#CACACA",
                  padding: 10,
                  borderRadius: 10,
                }}
                name={item.icon}
                size={30}
                color="black"
              />
              <Text style={styles.gridText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View
          style={{
            backgroundColor: "#D1D5DB",
            height: 40,
            elevation: 2,
            marginTop: 30,
            alignSelf: "center",
            width: "90%",
          }}
        />

        {/* News & Knowledge */}
        <View style={styles.newsSection}>
          <Text style={styles.newsTitle}>NEWS & KNOWLEDGE</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.tagsContainer}>
              <View style={[styles.tag, { backgroundColor: "#3B82F6" }]}>
                <Text style={styles.tagText}>
                  Outstanding  <Text style={styles.badge}> 2 </Text>
                </Text>
              </View>
              <View style={[styles.tag, { backgroundColor: "#EF4444" }]}>
                <Text style={styles.tagText}>
                  Injection Schedule  <Text style={styles.badge}> 20 </Text>
                </Text>
              </View>
              <View style={[styles.tag, { backgroundColor: "#EF4444" }]}>
                <Text style={styles.tagText}>
                  Infectious Diseases  <Text style={styles.badge}> 20 </Text>
                </Text>
              </View>
            </View>
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
}

// Danh sách các icon trong grid
const gridItems = [
  { label: "Vaccine    List", icon: "list-outline" },
  { label: "Order Vaccines", icon: "cart-outline" },
  { label: "Vaccination Records", icon: "document-text-outline" },
  { label: "Injection History", icon: "help-circle-outline" },
  { label: "Vaccine News", icon: "book-outline" },
  { label: "Look Up Vaccines", icon: "scan-outline" },
  { label: "Vaccination Diary", icon: "time-outline" },
  { label: "Vaccine For You", icon: "create-outline" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  header: {
    backgroundColor: "#3B82F6",
    paddingVertical: 20,
    paddingHorizontal: 15,
    alignItems: "center",
    position: "relative",
  },
  notificationIcon: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  profileCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#D1D5DB",
    marginBottom: 10,
  },
  welcomeText: {
    color: "white",
    fontSize: 14,
  },
  userName: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  placeholderCard: {
    backgroundColor: "#D1D5DB",
    height: 120,
    margin: 15,
    borderRadius: 10,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 10, // Căn chỉnh khoảng cách lề
    marginTop: 90,
  },
  gridItem: {
    width: "23%", // Điều chỉnh kích thước để có thể hiển thị 3 item trên 1 hàng
    aspectRatio: 1, // Giữ item có tỷ lệ vuông
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    marginVertical: 8,
    borderRadius: 15, // Bo góc mềm mại hơn
  },
  gridText: {
    marginTop: 5,
    fontSize: 12,
    textAlign: "center",
  },
  newsSection: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 10,
  },
  tagText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "500",
  },
  badge: {
    backgroundColor: "white",
    color: "#EF4444",
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 2,
    paddingHorizontal: 6,
    marginLeft: 5,
    overflow: "hidden",
  },
});

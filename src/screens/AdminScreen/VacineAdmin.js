import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function VacineAdmin() {
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
            padding: "5%",
            zIndex: 1,
            borderBottomLeftRadius: "10%",
            borderBottomRightRadius: "10%",
          }}
        >
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10%",
              marginBottom: "2%",
            }}
          >
            <View style={{ width: "25%" }}>
              <Text style={styles.dash}>Vaccine</Text>
            </View>

            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
                backgroundColor: "#D1D5DB",
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: "white",
              height: 40,
              borderRadius: 15,
              alignSelf: "center",
              width: "100%",
              zIndex: 2,
            }}
          ></View>
        </View>

        {/* */}

        <View
          style={{
            backgroundColor: "white",
            height: 600,
            marginHorizontal: 15,
            borderRadius: 10,
            left: 0,
            right: 0,
            alignSelf: "center",
            width: "90%",
            zIndex: 2,
            elevation: 2,
            position: "fixed",
            top: " -5%",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              height: 130,
              borderRadius: 15,
              alignSelf: "center",
              width: "95%",
              zIndex: 2,
              margin: 5,
              elevation: 2,
            }}
          >
            <Text style={{ fontSize: 18, marginLeft: 10, marginTop: '10', fontWeight: '300' }}>
            COvid Cine
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: 200,
                marginLeft: 10,
                opacity: 0.5
              }}
            >
              #575447
            </Text>
            <View
              style={{
                backgroundColor: "black",
                height: 1,
                width: "95%",
                margin: 10,
              }}
            />
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                margin: "10",
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 16, textAlign: "center", fontWeight: 700 }}
                >
                  8,776
                </Text>
                <Text style={{ textAlign: "center", fontSize: 12, margin: 0 }}>
                Total vaccine
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 16, textAlign: "center", fontWeight: 700 }}
                >
                  5,776
                </Text>
                <Text style={{ textAlign: "center", fontSize: 12, margin: 0 }}>
                Total used
                </Text>
              </View>
              <View>
                <Text
                  style={{ fontSize: 16, textAlign: "center", fontWeight: 700 }}
                >
                  3,000
                </Text>
                <Text style={{ textAlign: "center", fontSize: 12, margin: 0 }}>
                Total storage
                </Text>
              </View>
            </View>
          </View>
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
  dash: {
    color: "white",
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

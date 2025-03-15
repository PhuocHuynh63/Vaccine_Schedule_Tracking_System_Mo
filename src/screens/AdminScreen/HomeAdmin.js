import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeAdmin() {
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
            borderBottomLeftRadius: "10%",
            borderBottomRightRadius: "10%"
          }}
        >
          <View style={{ width: "25%", marginBottom: "10%" }}>
            <Text style={styles.dash}>Dashboard</Text>
          </View>
          
            <View
              style={{
                width: 35,
                height: 35,
                borderRadius: 25,
                backgroundColor: "#D1D5DB",
                marginBottom: "15%",
                marginLeft:'64%'
              }}
            />
            
          </View>
        

        {/* */}
        <View
          style={{
            backgroundColor: "white",
            height: 150,
            marginHorizontal: 15,
            borderRadius: 10,
            position: "fixed",
            top: "-11%",
            left: 0,
            right: 0,
            alignSelf: "center",
            width: "90%",
            zIndex: 2,
            elevation: 2,
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 12, margin: 8}}>Total vaccine recipients</Text>
          <Text style={{fontSize: 20, textAlign: 'center',color: '#0A56DF', fontWeight: 700}}>11,429</Text>
          <View
            style={{
              backgroundColor: 'black',
              height: 1,
              width: "95%",
              margin: 10
            }}
          />
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10'}}>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
          </View>
        </View>

        {/* bieu do */}
        <View
          style={{
            backgroundColor: "white",
            height: 150,
            marginHorizontal: 15,
            borderRadius: 10,
            position: "fixed",
            top: "-9%",
            left: 0,
            right: 0,
            alignSelf: "center",
            width: "90%",
            zIndex: 2,
            elevation: 2,
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 12, margin: 8}}>Total vaccine recipients</Text>
          <Text style={{fontSize: 20, textAlign: 'center',color: '#0A56DF', fontWeight: 700}}>11,429</Text>
          <View
            style={{
              backgroundColor: 'black',
              height: 1,
              width: "95%",
              margin: 10
            }}
          />
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10'}}>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
          </View>
        </View>

        {/* thonng ke */}
        <View
          style={{
            backgroundColor: "white",
            height: 350,
            marginHorizontal: 15,
            borderRadius: 10,
            position: "fixed",
            top: "-7%",
            left: 0,
            right: 0,
            alignSelf: "center",
            width: "90%",
            zIndex: 2,
            elevation: 2,
          }}
        >
          <Text style={{textAlign: 'center', fontSize: 12, margin: 8}}>Total vaccine recipients</Text>
          <Text style={{fontSize: 20, textAlign: 'center',color: '#0A56DF', fontWeight: 700}}>11,429</Text>
          <View
            style={{
              backgroundColor: 'black',
              height: 1,
              width: "95%",
              margin: 10
            }}
          />
          <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: '10'}}>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
            </View>
            <View>
              <Text style={{fontSize: 16, textAlign: 'center', fontWeight: 700}}>20</Text>
              <Text style={{textAlign: 'center', fontSize: 12, margin: 0}}>Vaccine</Text>
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
    color: 'white'
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

import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, Alert } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/INavigates';
import { ROUTES } from '@routes/index';
import { style } from '@themes/index';
import { fontStyles } from '@styles/fonts';
import Entypo from '@expo/vector-icons/Entypo';

const CartPage = () => {
  const route = useRoute<RouteProp<RootStackParamList, ROUTES.CART>>();
  const navigation = useNavigation();
  const { userId, selectedVaccines = [], totalPrice, userInfo, order } = route.params || {};
  const [modalVisible, setModalVisible] = useState(false);

  const handlePayment = () => {
    console.log('Processing payment for', selectedVaccines.length, 'vaccines, total:', totalPrice);

    setModalVisible(true);

    setTimeout(() => {
      setModalVisible(false);
      navigation.navigate(ROUTES.HOME_PAGE);
    }, 2000);
  };

  const formatDate = (isoDate: string) => {
    if (!isoDate) return 'N/A';
    const date = new Date(isoDate);
    return date.toLocaleDateString(); // Format to local date string (e.g., "MM/DD/YYYY")
  };

  return (
    <View style={styles.container}>
      {/* Recipient Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recipient Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Full Name</Text>
          <Text style={styles.value}>{userInfo?.fullName || 'NGUYỄN MINH HOÀNG'}</Text>
          <Entypo name="chevron-small-right" size={24} color={style.colors.blue.bg} />
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>{userInfo?.dateOfBirth || '05/10/2004'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Phone Number</Text>
          <Text style={styles.value}>{userInfo?.phone || '0859849026'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Vaccination Center</Text>
          <Text style={styles.value}>
            {userInfo?.vaccinationCenter || 'VNVC Bà Thắng Hải - Ho Chi Minh City'}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.label}>Preferred Vaccination Date</Text>
          <Text style={styles.value}>{userInfo?.expectedDate || '08/05/2025'}</Text>
        </View>
      </View>

      {/* Vaccine Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Selected Vaccines ({selectedVaccines.length})</Text>
        {selectedVaccines.length > 0 ? (
          selectedVaccines.map((vaccine, index) => (
            <View key={index} style={styles.vaccineItem}>
              <Text style={styles.vaccineName}>{vaccine.name || 'Vaxigrip Tetra Flu Vaccine'}</Text>
              <Text style={styles.vaccinePrice}>
                {(vaccine.price?.toLocaleString() || '356,000')} VND
              </Text>
            </View>
          ))
        ) : (
          <Text style={styles.noVaccinesText}>No vaccines selected.</Text>
        )}
      </View>

      {/* Order Information (New Section) */}
      {order && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Order Information</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Order ID</Text>
            <Text style={styles.value}>{order.id || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Scheduled Date</Text>
            <Text style={styles.value}>
              {order.vaccines?.[0]?.nextScheduledDate
                ? formatDate(order.vaccines[0].nextScheduledDate)
                : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.value}>{order.vaccines?.[0]?.status || 'N/A'}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Vaccines</Text>
            <Text style={styles.value}>
              {order.vaccines?.map((v) => v.vaccineId).join(', ') || 'N/A'}
            </Text>
          </View>
        </View>
      )}

      {/* Payment Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment Information</Text>
        <View style={styles.paymentRow}>
          <Text style={styles.label}>Total ({selectedVaccines.length} items)</Text>
          <Text style={styles.value}>
            {(selectedVaccines.reduce((sum, vaccine) => sum + (vaccine.price || 0), 0).toLocaleString() || '0')} VND
          </Text>
        </View>
        <View style={styles.paymentRow}>
          <Text style={styles.label}>Amount Payable</Text>
          <Text style={styles.value}>{(totalPrice?.toLocaleString() || '0')} VND</Text>
        </View>
      </View>

      {/* Total and Pay Button */}
      <View style={styles.paymentSummary}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalValue}>{(totalPrice?.toLocaleString() || '0')} VND</Text>
        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>

      {/* Success Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Purchase Successful!</Text>
            <Text style={styles.modalSubText}>Thank you for your order.</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CartPage;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  section: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 5,
  },
  sectionTitle: {
    fontSize: style.fonts.size.large,
    fontWeight: '600',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: style.fonts.size.medium,
    color: style.colors.grey.bg,
  },
  value: {
    fontSize: style.fonts.size.medium,
    fontWeight: '600',
  },
  vaccineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  vaccineIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  vaccineName: {
    fontSize: style.fonts.size.medium,
    fontWeight: '600',
    flex: 1,
    marginHorizontal: 10,
  },
  vaccinePrice: {
    fontSize: style.fonts.size.medium,
    fontWeight: '600',
    color: style.colors.blue.bg,
  },
  noVaccinesText: {
    fontSize: style.fonts.size.medium,
    color: style.colors.grey.bg,
    textAlign: 'center',
  },
  paymentSummary: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: style.colors.grey.line,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  totalLabel: {
    fontSize: style.fonts.size.medium,
    color: style.colors.grey.bg,
  },
  totalValue: {
    fontSize: style.fonts.size.xlarge,
    fontWeight: '700',
    color: '#000',
    marginRight: 10,
  },
  payButton: {
    backgroundColor: style.colors.blue.bg,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: style.sizes.borderRadius.br_5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  payButtonText: {
    color: '#FFFFFF',
    fontSize: style.fonts.size.large,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5,
  },
  modalText: {
    fontSize: style.fonts.size.xlarge,
    fontWeight: '700',
    color: style.colors.blue.bg,
    marginBottom: 10,
  },
  modalSubText: {
    fontSize: style.fonts.size.medium,
    color: style.colors.grey.bg,
  },
});
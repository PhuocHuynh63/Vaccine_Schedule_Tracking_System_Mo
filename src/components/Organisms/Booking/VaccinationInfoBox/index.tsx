import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View, FlatList, ActivityIndicator, Modal, ScrollView } from 'react-native';
import { style } from '@themes/index';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import SelectVaccinationSite from './components/Select';
import { fontStyles } from '@styles/fonts';
import { blockStyles } from '@styles/block';
import { flexBoxStyles } from '@styles/flexBox';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/INavigates';
import { ROUTES } from '@routes/index';
import { Button } from '@atoms/Button';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CalendarPicker from 'react-native-calendar-picker';
import CartService from '@services/cart/index';
import OrderService from '@services/order/index';
import SelectedVaccineCard from '@molecules/SelectedVaccineCard';
import { AsyncStorageService } from '@services/asyncStorage';

const VaccinationInfoBox = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<RouteProp<RootStackParamList, ROUTES.VACCINATOR_PROFILE>>();
  const { userId: user } = route.params || {};
  const insets = useSafeAreaInsets();

  const [showDetail, setShowDetail] = useState(false);
  const heightAnim = useRef(new Animated.Value(0)).current;
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedVaccines, setSelectedVaccines] = useState<any[]>([]);
  const [calendarModalVisible, setCalendarModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const totalPrice = selectedVaccines.reduce((sum, vaccine) => sum + (vaccine.price || 0), 0);
  const [userId, setUserId] = useState('');
  console.log(userId);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorageService.getUserId('userId');
        setUserId(storedUserId ?? '');
      } catch (error) {
        console.error('Error fetching user ID:', error);
      }
    };
    fetchUserId();
  }, [userId]);

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: showDetail ? 200 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [showDetail]);

  useEffect(() => {
    const fetchCart = async () => {
      if (userId) {
        try {
          const response = await CartService.getCartByUserId(userId, false);
          console.log('Cart Response:', response.data);
          console.log('Cart>>>>>>>>>>: ', response.data.data.vaccine);

          if (response.data && response.data.data.vaccine) {
            const mappedVaccines = response.data?.data?.vaccine?.map((vaccine) => ({
              _id: vaccine._id,
              name: vaccine.name,
              diseasePrevention: vaccine.diseasePrevention,
              price: vaccine.price,
              img: vaccine.img,
            }));
            setSelectedVaccines(mappedVaccines);
          } else {
            setSelectedVaccines([]);
          }
        } catch (err) {
          console.error('Error fetching cart:', err);
          setError('Failed to load cart');
          setSelectedVaccines([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCart();
  }, [userId]);

  const handleDeleteVaccine = async (vaccineId: string) => {
    try {
      const response = await CartService.getCartByUserId(user, false);
      const currentCart = response.data;
      if (currentCart && currentCart.vaccine) {
        const updatedVaccines = currentCart.vaccine.filter((v) => v._id.toString() !== vaccineId);
        const createCartDto = {
          user,
          vaccine: updatedVaccines.map((v) => v._id.toString()),
        };
        await CartService.createCart(user, createCartDto.vaccine);
        setSelectedVaccines(updatedVaccines);
      }
    } catch (err) {
      console.error('Error updating cart after deletion:', err);
    }
  };

  const toggleDetail = useCallback(() => {
    setShowDetail((prevState) => !prevState);
  }, []);

  const onDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
    setCalendarModalVisible(false);
  }, []);

  const handleConfirmPayment = async () => {
    if (!userId || selectedVaccines.length === 0 || !selectedDate) {
      alert('Please ensure you have selected a user, vaccines, and a date.');
      return;
    }

    try {
      // Prepare the order data with the selected date
      const orderData = {
        userId: userId,
        vaccines: selectedVaccines.map((vaccine) => ({
          vaccineId: vaccine._id,
          count: 1,
          nextScheduledDate: selectedDate.toISOString(), // Add the selected date in ISO format
        })),
      };

      // Create the order using OrderService
      const response = await OrderService.createOrder(orderData);
      const createdOrder = response.data;

      // Navigate to CartPage with the created order
      navigation.navigate(ROUTES.CART, {
        userId: user,
        selectedVaccines: selectedVaccines,
        totalPrice: totalPrice,
        userInfo: {
          fullName: "NGUYỄN MINH HOÀNG",
          dateOfBirth: "05/10/2004",
          phone: "0859849026",
          vaccinationCenter: "VNVC Bà Thắng Hải-Thành Phố Hồ Chí Minh",
          expectedDate: selectedDate ? selectedDate.toLocaleDateString() : "08/05/2025",
        },
        order: createdOrder, // Pass the created order to CartPage
      });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.boxContainer}>
          <View style={styles.boxHeader}>
            <Text style={styles.fullname}>HUỲNH MINH PHƯỚC</Text>
            <View style={styles.boxAction}>
              <TouchableOpacity activeOpacity={0.7}>
                <MaterialIcons name="edit" size={24} />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.7}>
                <Ionicons name="trash" size={24} color={style.colors.red.bg} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.detailUserContainer}>
            <TouchableOpacity style={styles.titleDetail} activeOpacity={0.8} onPress={toggleDetail}>
              <Text style={styles.textTitle}>Details of the person vaccinated</Text>
              {showDetail ? (
                <FontAwesome5 name="chevron-up" size={18} color={style.colors.blue.bg} />
              ) : (
                <FontAwesome5 name="chevron-down" size={18} color={style.colors.blue.bg} />
              )}
            </TouchableOpacity>
            {showDetail && (
              <Animated.View
                style={[
                  { gap: 5, marginTop: style.sizes.margin.m_12, marginBottom: style.sizes.margin.m_16 },
                  { height: heightAnim },
                ]}
              >
                <View style={styles.detailUserInfo}>
                  <Text style={styles.textTitleDetail}>Fullname </Text>
                  <Text style={styles.textContentDetail}>HUỲNH MINH PHƯỚC</Text>
                </View>
                <View style={styles.detailUserInfo}>
                  <Text style={styles.textTitleDetail}>Phone </Text>
                  <Text style={styles.textContentDetail}>0123456789</Text>
                </View>
                <View style={styles.detailUserInfo}>
                  <Text style={styles.textTitleDetail}>Birthday </Text>
                  <Text style={styles.textContentDetail}>06/03/1999</Text>
                </View>
                <View style={styles.detailUserInfo}>
                  <Text style={styles.textTitleDetail}>Relationship </Text>
                  <Text style={styles.textContentDetail}>Me</Text>
                </View>
                <View style={styles.detailUserInfo}>
                  <Text style={styles.textTitleDetail}>Sex </Text>
                  <Text style={styles.textContentDetail}>Male</Text>
                </View>
                <View style={styles.detailUserInfo}>
                  <Text style={styles.textTitleDetail}>Email </Text>
                  <Text style={styles.textContentDetail}>Updating</Text>
                </View>
                <View style={styles.detailUserInfo}>
                  <Text style={styles.textTitleDetail}>Address </Text>
                  <Text style={styles.textContentDetail}>
                    10 Lê Văn Việt, Phường 2, Thành Phố Thủ Đức, Tỉnh Tiền Giang
                  </Text>
                </View>
              </Animated.View>
            )}
          </View>

          <View>
            <View>
              <Text style={styles.vaccineInfo}>
                Select the desired vaccination center{' '}
                <Text style={[styles.vaccineInfo, { color: style.colors.red.bg, fontWeight: 'bold' }]}>*</Text>
              </Text>
              <SelectVaccinationSite>
                <Text style={styles.textSelect}>Select Vaccination Site</Text>
                <Entypo name="chevron-small-right" size={24} color="black" />
              </SelectVaccinationSite>
            </View>

            <View>
              <Text style={styles.vaccineInfo}>
                Select vaccination date{' '}
                <Text style={[styles.vaccineInfo, { color: style.colors.red.bg, fontWeight: 'bold' }]}>*</Text>
              </Text>
              <SelectVaccinationSite onPress={() => setCalendarModalVisible(true)}>
                <Text style={styles.textSelect}>
                  {selectedDate ? selectedDate.toLocaleDateString() : 'Select Date'}
                </Text>
                <FontAwesome name="calendar" size={18} color="black" />
              </SelectVaccinationSite>

              <Modal
                transparent={true}
                visible={calendarModalVisible}
                animationType="fade"
                onRequestClose={() => setCalendarModalVisible(false)}
              >
                <View style={styles.modalOverlay}>
                  <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                      <Text style={styles.modalTitle}>Select Vaccination Date</Text>
                      <TouchableOpacity onPress={() => setCalendarModalVisible(false)}>
                        <FontAwesome name="close" size={24} color={style.colors.blue.bg} />
                      </TouchableOpacity>
                    </View>
                    <CalendarPicker
                      onDateChange={onDateChange}
                      selectedDayColor={style.colors.blue.bg}
                      selectedDayTextColor="#FFFFFF"
                      todayBackgroundColor={style.colors.red.bg}
                      todayTextStyle={{ color: '#FFFFFF' }}
                      minDate={new Date(2024, 0, 1)}
                      maxDate={new Date(2026, 11, 31)}
                      previousComponent={<FontAwesome name="chevron-left" size={18} color={style.colors.blue.bg} />}
                      nextComponent={<FontAwesome name="chevron-right" size={18} color={style.colors.blue.bg} />}
                      textStyle={{ fontSize: 16, color: '#000000' }}
                      selectedStartDate={selectedDate}
                      width={300}
                    />
                    <View style={styles.modalFooter}>
                      <TouchableOpacity style={styles.modalButton} onPress={() => setCalendarModalVisible(false)}>
                        <Text style={styles.modalButtonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.modalButtonConfirm]}
                        onPress={() => {
                          if (selectedDate) setCalendarModalVisible(false);
                        }}
                      >
                        <Text style={styles.modalButtonConfirmText}>Confirm</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>

            <View>
              <Text style={styles.vaccineInfo}>
                Select vaccination{' '}
                <Text style={[styles.vaccineInfo, { color: style.colors.red.bg, fontWeight: 'bold' }]}>*</Text>
              </Text>
              <View style={styles.vaccineListContainer}>
                {selectedVaccines.length === 0 ? (
                  <View style={styles.cartEmpty}>
                    <FontAwesome5 name="list-alt" size={100} color="rgba(106,107,187,0.2)" />
                    <Text style={styles.textCartEmpty}>List of vaccines to buy is empty</Text>
                  </View>
                ) : (
                  <FlatList
                    data={selectedVaccines}
                    keyExtractor={(item) => item._id?.toString() || Math.random().toString()}
                    renderItem={({ item }) => (
                      <SelectedVaccineCard
                        vaccineName={item.name || 'Unknown Vaccine'}
                        vaccineType={item.diseasePrevention || 'Unknown Disease'}
                        price={item.price || 0}
                        onDelete={() => handleDeleteVaccine(item._id?.toString() || '')}
                        imageSource={{ uri: item.img || 'https://via.placeholder.com/50' }}
                      />
                    )}
                    ListEmptyComponent={
                      <Text style={styles.textCartEmpty}>No valid vaccine data to display</Text>
                    }
                    showsVerticalScrollIndicator={true}
                    nestedScrollEnabled={true}
                  />
                )}
              </View>
            </View>

            <View style={styles.actionButton}>
              <Button
                onPress={() => navigation.navigate(ROUTES.SELECT_FROM_CART, { userId: user })}
                style={styles.buttonaction}
              >
                <FontAwesome5 name="shopping-cart" size={18} color="white" style={{ marginRight: 7 }} />
                <Text style={[fontStyles.fontButton]}>Add from cart</Text>
              </Button>

              <Button
                onPress={() => navigation.navigate(ROUTES.ADD_NEW_VACCINE, { userId: userId })}
                style={[styles.buttonaction, blockStyles.oppositeBlock]}
              >
                <Text style={[fontStyles.fontButton, fontStyles.oppositeFont]}>Add new vaccine</Text>
              </Button>
            </View>

            <View style={[flexBoxStyles.centerColumn]}>
              <Feather name="chevrons-up" size={24} color="black" />
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.paymentSummaryContainer}>
        <View style={styles.paymentSummaryContent}>
          <View style={styles.totalPriceContainer}>
            <Text style={styles.totalPriceLabel}>Total</Text>
            <Text style={styles.totalPriceValue}>{totalPrice.toLocaleString()} VNĐ</Text>
          </View>
          <TouchableOpacity
            style={styles.confirmButton}
            onPress={handleConfirmPayment}
            activeOpacity={0.8}
          >
            <Text style={styles.confirmButtonText}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default VaccinationInfoBox;

// Styles remain the same as in your original code
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
  },
  boxContainer: {
    borderWidth: 1,
    borderColor: style.colors.grey.line,
    borderRadius: style.sizes.borderRadius.br_5,
    marginHorizontal: style.sizes.margin.m_20,
    marginVertical: style.sizes.margin.m_20,
  },
  boxHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: style.colors.grey.bgLight,
    borderRadius: style.sizes.borderRadius.br_5,
    padding: style.sizes.padding.p_14,
  },
  fullname: {
    fontSize: style.fonts.size.xlarge,
    fontWeight: '600',
  },
  boxAction: {
    flexDirection: 'row',
  },
  detailUserContainer: {
    padding: style.sizes.padding.p_14,
  },
  titleDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: style.fonts.size.large,
    fontWeight: '600',
    color: style.colors.blue.bg,
    marginRight: style.sizes.margin.m_12,
  },
  detailUserInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    flexWrap: 'wrap',
  },
  textTitleDetail: {
    fontWeight: '600',
    color: style.colors.grey.bg,
  },
  textContentDetail: {
    fontWeight: '600',
  },
  vaccineInfo: {
    fontSize: style.fonts.size.large,
    marginLeft: style.sizes.margin.m_12,
  },
  textSelect: {
    color: style.colors.grey.textLight,
    fontSize: style.fonts.size.large,
    textAlign: 'left',
  },
  cartEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  textCartEmpty: {
    fontSize: style.fonts.size.large,
    color: style.colors.grey.textLight,
    marginTop: style.sizes.margin.m_8,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: style.sizes.margin.m_8,
    marginBottom: style.sizes.margin.m_20,
  },
  buttonaction: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 47,
    paddingHorizontal: style.sizes.padding.p_20,
    marginHorizontal: 0,
    borderRadius: style.sizes.borderRadius.br_13,
  },
  vaccineListContainer: {
    maxHeight: 300,
    marginVertical: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: style.sizes.borderRadius.br_13,
    padding: style.sizes.padding.p_20,
    width: '90%',
    maxWidth: 350,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 1001,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: style.sizes.margin.m_16,
    paddingBottom: style.sizes.padding.p_10,
    borderBottomWidth: 1,
    borderBottomColor: style.colors.grey.line,
  },
  modalTitle: {
    fontSize: style.fonts.size.xlarge,
    fontWeight: '600',
    color: style.colors.blue.bg,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: style.sizes.margin.m_16,
    paddingTop: style.sizes.padding.p_10,
    borderTopWidth: 1,
    borderTopColor: style.colors.grey.line,
  },
  modalButton: {
    paddingVertical: style.sizes.padding.p_10,
    paddingHorizontal: style.sizes.padding.p_20,
    borderRadius: style.sizes.borderRadius.br_5,
    backgroundColor: style.colors.grey.bgLight,
    minWidth: 100,
    alignItems: 'center',
  },
  modalButtonText: {
    fontSize: style.fonts.size.medium,
    fontWeight: '600',
    color: style.colors.grey.bg,
  },
  modalButtonConfirm: {
    backgroundColor: style.colors.blue.bg,
  },
  modalButtonConfirmText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  paymentSummaryContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: style.colors.grey.line,
    paddingVertical: 15,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  paymentSummaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPriceContainer: {
    flex: 1,
  },
  totalPriceLabel: {
    fontSize: style.fonts.size.medium,
    color: style.colors.grey.bg,
    marginBottom: 4,
  },
  totalPriceValue: {
    fontSize: style.fonts.size.xlarge,
    fontWeight: '700',
    color: '#000',
  },
  confirmButton: {
    backgroundColor: style.colors.blue.bg,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: style.sizes.borderRadius.br_5,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: style.fonts.size.large,
    fontWeight: '600',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
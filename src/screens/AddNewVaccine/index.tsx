import React, { useState, useEffect } from 'react';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/INavigates';
import { ROUTES } from '@routes/index';
import VaccineCard from '@molecules/VaccineCard';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button } from '@atoms/Button';
import { style } from '@themes/index';
import { fontStyles } from '@styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VaccineService from '@services/vaccine/index';
import CartService from '@services/cart/index';

const AddNewVaccine = () => {
  const route = useRoute<RouteProp<RootStackParamList, ROUTES.VACCINATOR_PROFILE>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userId: user } = route.params || {};

  const [vaccines, setVaccines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await VaccineService.getAllVaccines();
        console.log('API Response:', response.data);
        if (response.data && response.data.data && Array.isArray(response.data.data.data)) {
          setVaccines(response.data.data.data);
        } else {
          throw new Error('Invalid data format received from API');
        }
        const storedSelected = await AsyncStorage.getItem('selectedVaccines');
        if (storedSelected) {
          setSelectedVaccines(JSON.parse(storedSelected));
        }
        console.log('User ID:', user); // Kiểm tra userId
        console.log('Selected Vaccines:', selectedVaccines); // Kiểm tra selectedVaccines
      } catch (err) {
        console.error('Error fetching vaccines:', err);
        setError(err.message || 'Failed to load vaccines');
      } finally {
        setLoading(false);
      }
    };
    fetchVaccines();
  }, []);

  const toggleVaccineSelection = (id: string, isSelected: boolean) => {
    setSelectedVaccines((prevSelected) => {
      let updatedSelected;
      if (isSelected) {
        updatedSelected = prevSelected.includes(id) ? prevSelected : [...prevSelected, id];
      } else {
        updatedSelected = prevSelected.filter((vaccineId) => vaccineId !== id);
      }
      AsyncStorage.setItem('selectedVaccines', JSON.stringify(updatedSelected)).catch((err) =>
        console.error('Error updating AsyncStorage:', err)
      );
      console.log('Updated Selected Vaccines:', updatedSelected); // Kiểm tra khi chọn
      return updatedSelected;
    });
  };

  const confirmSelection = async () => {
    console.log('Confirming with user:', user, 'selectedVaccines:', selectedVaccines); // Debug
    if (selectedVaccines.length > 0 && user) {
      try {
        const response = await CartService.createCart(user, selectedVaccines);
        console.log('Cart created:', response.data);
        navigation.navigate(ROUTES.VACCINATION_INFO, { users: [{ userId: user }] });
      } catch (err) {
        console.error('Error creating cart:', err);
        setError('Failed to create cart');
      }
    } else {
      setError('No vaccines selected or user ID missing');
    }
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0056b3" />
      </View>
    );
  }

  if (error || vaccines.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error || 'No vaccines available'}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={vaccines}
        keyExtractor={(item) => item._id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <VaccineCard
            vaccineId={item._id.toString()}
            isSelected={selectedVaccines.includes(item._id.toString())}
            onPress={toggleVaccineSelection}
          />
        )}
      />
      <View style={styles.buttonContainer}>
        <Button onPress={confirmSelection}>
          <Text style={[fontStyles.fontButton]}>Confirm</Text>
        </Button>
      </View>
    </View>
  );
};

export default AddNewVaccine;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  listContainer: { paddingBottom: 80 },
  buttonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: style.sizes.padding.p_10,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  errorText: { color: 'red', fontSize: 16, textAlign: 'center' },
});
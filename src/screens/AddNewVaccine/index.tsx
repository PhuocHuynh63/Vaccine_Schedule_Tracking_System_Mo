import React, { useState, useEffect } from 'react';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/INavigates';
import { ROUTES } from '@routes/index';
import VaccineCard from '@molecules/VaccineCard';
import SelectedVaccineCard from '@molecules/SelectedVaccineCard';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Button } from '@atoms/Button';
import { style } from '@themes/index';
import { fontStyles } from '@styles/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VaccineService from '@services/vaccine/index';

const AddNewVaccine = () => {
  const route = useRoute<RouteProp<RootStackParamList, ROUTES.VACCINATOR_PROFILE>>();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { userId: user } = route.params;

  const [vaccines, setVaccines] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVaccines, setSelectedVaccines] = useState<string[]>([]);
  const [confirmedVaccines, setConfirmedVaccines] = useState<any[]>([]);

  useEffect(() => {
    const fetchVaccines = async () => {
      try {
        const response = await VaccineService.getAllVaccines({ status: 'UNCENSORED' });
        const data = response.data;

        if (Array.isArray(data.data)) {
          setVaccines(data.data);
        } else {
          setError('Invalid data format received from API');
        }

        const storedSelected = await AsyncStorage.getItem('selectedVaccines');
        if (storedSelected) {
          setSelectedVaccines(JSON.parse(storedSelected));
        }
      } catch (error) {
        console.error('Error fetching vaccines:', error);
        setError('Failed to load vaccines');
      } finally {
        setLoading(false);
      }
    };

    fetchVaccines();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color="#0056b3" />
        </View>
      ) : error ? (
        <View style={styles.centerContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={vaccines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <VaccineCard
              vaccineId={item.id.toString()}
              isSelected={selectedVaccines.includes(item.id.toString())}
              onPress={() => {}}
            />
          )}
        />
      )}
    </View>
  );
};

export default AddNewVaccine;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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

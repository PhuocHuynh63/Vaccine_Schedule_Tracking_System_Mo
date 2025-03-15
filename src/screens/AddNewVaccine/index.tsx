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
        const response = await fetch('https://666a8f987013419182cfc970.mockapi.io/api/vaccines');
        const data = await response.json();

        if (Array.isArray(data)) {
          setVaccines(data);
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

  const toggleVaccineSelection = async (id: string, isSelected: boolean) => {
    setSelectedVaccines(prevSelected => {
      let updatedSelected;
      if (isSelected) {
        updatedSelected = prevSelected.includes(id) ? prevSelected : [...prevSelected, id];
      } else {
        updatedSelected = prevSelected.filter(vaccineId => vaccineId !== id);
      }
      // Update AsyncStorage whenever the selection changes
      AsyncStorage.setItem('selectedVaccines', JSON.stringify(updatedSelected));
      return updatedSelected;
    });
  };

  const confirmSelection = async () => {
    if (selectedVaccines.length > 0) {
      const confirmed = vaccines.filter(vaccine => selectedVaccines.includes(vaccine.id.toString()));
      setConfirmedVaccines(confirmed);
      await AsyncStorage.setItem('confirmedVaccines', JSON.stringify(confirmed));
      navigation.navigate(ROUTES.VACCINATION_INFO, { users: [{ userId: user }] });
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
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <VaccineCard
            vaccineId={item.id.toString()}
            isSelected={selectedVaccines.includes(item.id.toString())}
            onPress={toggleVaccineSelection}
          />
        )}
      />

      {confirmedVaccines.length > 0 && (
        <FlatList
          data={confirmedVaccines}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SelectedVaccineCard
              vaccineName={item.name}
              vaccineType={item.diseasePrevention}
              price={item.price}
              onDelete={async () => {
                setConfirmedVaccines(prev => prev.filter(v => v.id !== item.id));
                setSelectedVaccines(prev => {
                  const updatedSelected = prev.filter(id => id !== item.id.toString());
                  AsyncStorage.setItem('selectedVaccines', JSON.stringify(updatedSelected));
                  return updatedSelected;
                });
                AsyncStorage.setItem('confirmedVaccines', JSON.stringify(confirmedVaccines.filter(v => v.id !== item.id)));
              }}
            />
          )}
        />
      )}

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
  listContainer: {
    paddingBottom: 80,
  },
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
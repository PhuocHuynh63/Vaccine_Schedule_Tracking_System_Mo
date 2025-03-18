import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Vaccine from '@atoms/Vaccine';

const API_URL = 'http://10.0.2.2:8080/api/v1';

interface VaccineCardProps {
  onPress: (id: string, isSelected: boolean) => void;
  isSelected: boolean;
  vaccineId: string;
}

const VaccineCard = ({ onPress, isSelected, vaccineId }: VaccineCardProps) => {
  const [vaccine, setVaccine] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        const cachedData = await AsyncStorage.getItem(`vaccine_${vaccineId}`);
        if (cachedData) {
          setVaccine(JSON.parse(cachedData));
        } else {
          const response = await fetch(`${API_URL}/vaccine/${vaccineId}`);
          const data = await response.json();
          setVaccine(data);
          await AsyncStorage.setItem(`vaccine_${vaccineId}`, JSON.stringify(data));
        }
      } catch (error) {
        console.error('Error fetching vaccine:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVaccine();
  }, [vaccineId]);

  const handlePress = async () => {
    const newSelectedState = !isSelected;
    onPress(vaccineId, newSelectedState);

    try {
      const selectedVaccines = await AsyncStorage.getItem('selectedVaccines');
      let selectedArray = selectedVaccines ? JSON.parse(selectedVaccines) : [];

      if (newSelectedState) {
        if (!selectedArray.includes(vaccineId)) {
          selectedArray.push(vaccineId);
        }
      } else {
        selectedArray = selectedArray.filter((id: string) => id !== vaccineId);
      }

      await AsyncStorage.setItem('selectedVaccines', JSON.stringify(selectedArray));
    } catch (error) {
      console.error('Error saving selected vaccines:', error);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0056b3" />;
  }

  if (!vaccine) {
    return <Text style={styles.errorText}>Error loading vaccine data</Text>;
  }

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Vaccine />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{vaccine.name}</Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Disease prevention: </Text>
            {vaccine.diseasePrevention}
          </Text>
          <Text style={styles.price}>{vaccine.price} VNĐ</Text>
        </View>
      </View>
      <TouchableOpacity
        style={[styles.button, isSelected ? styles.selectedButton : styles.chooseButton]}
        onPress={handlePress}
      >
        <Text style={styles.buttonText}>{isSelected ? 'Selected' : 'Choose'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VaccineCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    color: '#555',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: '#0056b3',
    fontWeight: 'bold',
  },
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  chooseButton: {
    backgroundColor: '#0056b3',
  },
  selectedButton: {
    backgroundColor: '#34A853',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});

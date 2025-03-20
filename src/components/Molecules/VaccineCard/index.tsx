import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import Vaccine from '@atoms/Vaccine';
import VaccineService from '@services/vaccine/index'; // Thay bằng đường dẫn thực tế

interface VaccineCardProps {
  onPress: (id: string, isSelected: boolean) => void;
  isSelected: boolean;
  vaccineId: string;
}

const VaccineCard = ({ onPress, isSelected, vaccineId }: VaccineCardProps) => {
  const [vaccine, setVaccine] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVaccine = async () => {
      try {
        // Gọi hàm getVaccineById từ VaccineService
        const response = await VaccineService.getVaccineById(vaccineId);
        console.log('Vaccine Response:', response.data); // Log để kiểm tra cấu trúc

        // Kiểm tra và lấy dữ liệu vaccine từ response
        let vaccineData;
        if (response.data && response.data.data) {
          vaccineData = response.data.data; // Nếu API trả về { data: { ...vaccine } }
        } else if (response.data) {
          vaccineData = response.data; // Nếu API trả về vaccine trực tiếp
        } else {
          throw new Error('No vaccine data returned');
        }

        if (vaccineData && vaccineData._id) {
          setVaccine(vaccineData);
        } else {
          throw new Error('Invalid vaccine data format');
        }
      } catch (err) {
        console.error('Error fetching vaccine:', err);
        setError('Failed to load vaccine data');
      } finally {
        setLoading(false);
      }
    };

    fetchVaccine();
  }, [vaccineId]);

  const handlePress = () => {
    const newSelectedState = !isSelected;
    onPress(vaccineId, newSelectedState); // Gọi callback mà không tự cập nhật AsyncStorage
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0056b3" />;
  }

  if (error || !vaccine) {
    return <Text style={styles.errorText}>{error || 'Error loading vaccine data'}</Text>;
  }

  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Vaccine />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{vaccine.name || 'N/A'}</Text>
          <Text style={styles.description}>
            <Text style={styles.bold}>Disease prevention: </Text>
            {vaccine.diseasePrevention || 'N/A'}
          </Text>
          <Text style={styles.price}>{vaccine.price ? `${vaccine.price} VNĐ` : 'N/A'}</Text>
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
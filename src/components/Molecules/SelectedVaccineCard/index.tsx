// SelectedVaccineCard component (unchanged, just for reference)
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { style } from '@themes/index';

interface SelectedVaccineCardProps {
  vaccineName: string;
  vaccineType: string;
  price: number;
  onDelete: () => void;
  imageSource?: any;
}

const SelectedVaccineCard: React.FC<SelectedVaccineCardProps> = ({
  vaccineName,
  vaccineType,
  price,
  onDelete,
  imageSource
}) => {
  const defaultImage = require('../../../../assets/vacxin-qdenga.jpg');
  
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.contentContainer}>
          <Image 
            source={imageSource || defaultImage} 
            style={styles.image} 
            resizeMode="contain"
          />
          
          <View style={styles.infoContainer}>
            <Text style={styles.vaccineName} numberOfLines={2} ellipsizeMode="tail">
              {vaccineName}
            </Text>
            <View style={styles.typeContainer}>
              <Text style={styles.label}>Phòng bệnh: </Text>
              <Text style={styles.type}>{vaccineType}</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <Text style={styles.price}>{price.toLocaleString()} VNĐ</Text>
          <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
            <Ionicons name="trash" size={20} color={style.colors.red.bg} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles remain the same
const styles = StyleSheet.create({
  container: {
    marginHorizontal: style.sizes.margin.m_12,
    marginVertical: style.sizes.margin.m_8,
  },
  card: {
    borderWidth: 1,
    borderColor: style.colors.grey.line,
    borderRadius: style.sizes.borderRadius.br_5,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  contentContainer: {
    flexDirection: 'row',
    padding: style.sizes.padding.p_10,
    borderBottomWidth: 1,
    borderBottomColor: style.colors.grey.line,
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: style.sizes.margin.m_8,
    backgroundColor: '#f5f5f5',
  },
  infoContainer: {
    flex: 1,
  },
  vaccineName: {
    fontSize: style.fonts.size.medium,
    fontWeight: '600',
    marginBottom: style.sizes.margin.m_8,
    color: '#333',
  },
  typeContainer: {
    flexDirection: 'row',
  },
  label: {
    fontSize: style.fonts.size.small,
    color: style.colors.grey.textLight,
  },
  type: {
    fontSize: style.fonts.size.small,
    color: style.colors.grey.text,
    fontWeight: '500',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: style.sizes.padding.p_8,
    paddingHorizontal: style.sizes.padding.p_10,
    backgroundColor: style.colors.grey.bgLight,
  },
  price: {
    fontSize: style.fonts.size.medium,
    fontWeight: '600',
    color: style.colors.blue.bg,
  },
  deleteButton: {
    padding: style.sizes.padding.p_4,
  },
});

export default SelectedVaccineCard;
import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { IComponents } from 'src/types/IComponents';
import { style } from '@themes/index';
import Avatar from '@atoms/Avatar';
import UserService from '@services/user/index'; // Adjust the import path as needed

interface CardProfileProps extends IComponents.ICARDPROFILE {
  userId: string; // Add userId as a prop
}

const CardProfile = ({ onPress, userId }: CardProfileProps) => {
  // State to store user data
  const [user, setUser] = useState<{
    fullName?: string;
    role?: string;
    email?: string;
  }>({});

  // Fetch user data when the component mounts
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserService.findAUser(userId);
        const userData = response.data.data; // Assuming the response structure matches the JSON you provided
        setUser({
          fullName: userData.fullName,
          role: userData.role,
          email: userData.email,
        });
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    if (userId) {
      fetchUser();
    }
  }, [userId]);

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.card} activeOpacity={0.7} onPress={onPress}>
        <View style={styles.right}>
          <Avatar />
        </View>
        <View style={styles.left}>
          <View>
            {/* Display the user's full name */}
            <Text style={styles.name}>{user.fullName || 'Loading...'}</Text>
            {/* Display the user's role */}
            <Text style={styles.description}>{user.role || 'Role not available'}</Text>
            {/* Display the user's email */}
            <Text style={styles.description}>{user.email || 'Email not available'}</Text>
          </View>
          <FontAwesome6 name="angle-right" size={18} color="black" />
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CardProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: 'row',
    marginHorizontal: style.sizes.margin.m_16,
    marginBottom: style.sizes.margin.m_16,
    paddingBottom: style.sizes.padding.p_8,
    borderBottomWidth: 1,
    borderBottomColor: style.colors.grey.bgLight,
  },
  right: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  left: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: style.sizes.margin.m_16,
    marginRight: style.sizes.margin.m_8,
  },
  info: {
    flexDirection: 'column',
  },
  name: {
    fontWeight: '700',
    fontSize: style.fonts.size.large,
  },
  description: {
    color: style.colors.grey.text,
  },
});
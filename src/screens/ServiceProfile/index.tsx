import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from 'src/types/INavigates';
import { ROUTES } from '@routes/index';
import { Search } from '@atoms/Search';
import CardProfile from '@molecules/CardProfile';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet, View, Text } from 'react-native';
import { ButtonOpacity } from '@atoms/ButtonOpacity';
import { style } from '@themes/index';
import { fontStyles } from '@styles/fonts';

// Example list of user IDs (in a real app, this would come from an API)
const userIds = [
  '67d6f1f219d9d05dclbfd6c', // From your JSON example
];

const ListVaccinatorProfile = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <Search placeholder="Find a vaccinator" />

      <ScrollView>
        {userIds.map((userId) => (
          <CardProfile
            key={userId}
            userId={userId} // Pass the userId to CardProfile
            onPress={() =>
              navigation.navigate(ROUTES.VACCINATOR_PROFILE, { userId })
            }
          />
        ))}
      </ScrollView>

      <View style={styles.buttonContainer}>
        <ButtonOpacity>
          <Text style={[fontStyles.fontButton]}>Add service profile</Text>
        </ButtonOpacity>
      </View>
    </View>
  );
};

export default ListVaccinatorProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  blockInfo: {},
  buttonContainer: {
    boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.25)',
    paddingVertical: style.sizes.padding.p_10,
  },
});
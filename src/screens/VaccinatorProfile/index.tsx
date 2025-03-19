import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { ROUTES } from '@routes/index';
import { formatDate } from '@utils/helper/date';
import { RootStackParamList } from 'src/types/INavigates';
import BlockInfo from '@molecules/BlockInfo';
import { Button } from '@atoms/Button';
import { style } from '@themes/index';
import { fontStyles } from '@styles/fonts';
import { SercuseService } from '@services/sercuseService';
import { decodeToken } from '@utils/helper/decodeToken';

const VaccinatorProfile = () => {
    const route = useRoute<RouteProp<RootStackParamList, ROUTES.VACCINATOR_PROFILE>>();
    const { userId: user } = route.params;
    
        const userRole = decodeToken().role
    
    

    const navigation = useNavigation<NavigationProp<RootStackParamList>>();

    const data = [
        { title: 'ID', content: '123' },
        { title: 'Fullname', content: 'Huynh Minh Phuoc' },
        { title: 'Phone', content: '0123 456 789' },
        { title: 'Birthday', content: formatDate('2025-02-03T00:00:00Z') },
        { title: 'Relationship', content: 'Me' },
        { title: 'Sex', content: 'Male' },
        { title: 'Address', content: 'Ho Chi Minh City' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView style={styles.blockInfoContainer}>
                {data.map((item, index) => (
                    <BlockInfo key={index} title={item.title} content={item.content} />
                ))}
            </ScrollView>

            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate(ROUTES.VACCINATION_INFO, { userId: user })}>
                    <Text style={[fontStyles.fontButton]}>Choose the person to vaccinate</Text>
                </Button>
            </View>
        </View>
    )
}

export default VaccinatorProfile

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    blockInfoContainer: {
    },
    buttonContainer: {
        boxShadow: '0px -1px 4px rgba(0, 0, 0, 0.25)',
        paddingVertical: style.sizes.padding.p_10,
    }
})
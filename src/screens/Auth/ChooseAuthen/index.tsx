import { Animated, PanResponder, StyleSheet, Text, View } from 'react-native'
import React, { useRef } from 'react'
import { style } from '@themes/index'

import { AuthStyles } from '@styles/auth'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/INavigates'
import { ROUTES } from '@routes/index'
import ButtonAction from '../components/ButtonAction'
import { LinearGradient } from 'expo-linear-gradient'


const ChooseAuthenScreen = () => {

    //#region PanResponder
    const scale = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;
    const contentTranslateY = useRef(new Animated.Value(0)).current;

    const panResponder = useRef(
        PanResponder.create({
            onMoveShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderMove(_, gestureState) {
                if (gestureState.dy > 0) {
                    const newScale = Math.min(1.1, 1 + gestureState.dy / 800);
                    scale.setValue(newScale);

                    const newTranslateY = Math.min(100, gestureState.dy / 3);
                    contentTranslateY.setValue(newTranslateY);
                } else {
                    const newTranslateY = Math.max(-300, gestureState.dy / 3);
                    translateY.setValue(newTranslateY);
                    contentTranslateY.setValue(newTranslateY);
                }
            },
            onPanResponderRelease: () => {
                Animated.parallel([
                    Animated.spring(scale, {
                        toValue: 1,
                        useNativeDriver: true,
                    }),
                    Animated.spring(translateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }),
                    Animated.spring(contentTranslateY, {
                        toValue: 0,
                        useNativeDriver: true,
                    }),
                ]).start();
            },
        })
    ).current;
    // #endregion

    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

    return (
        <LinearGradient
            style={[AuthStyles.main]}
            colors={['#0A56DF', '#497ee2']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 2 }}
            {...panResponder.panHandlers}
        >

            <Animated.Image
                source={{ uri: 'https://res.cloudinary.com/dwyzqcunj/image/upload/v1739522069/image_1_msk4z8.png' }}
                style={[styles.banner, { transform: [{ scale }, { translateY }] }]}
            />

            <Animated.View style={[styles.content, { transform: [{ translateY: contentTranslateY }] }]}>
                <Text style={styles.textSlogan}>
                    Let Your Children {"\n"} Be Healthy
                </Text>
                <View style={styles.actionLogin}>
                    <ButtonAction onPress={() => navigation.navigate(ROUTES.SIGNIN, { email: undefined })}>Sign In</ButtonAction>
                </View>
            </Animated.View>
        </LinearGradient>
    )
}

export default ChooseAuthenScreen

const styles = StyleSheet.create({
    banner: {
        flex: 2,
    },
    content: {
        flex: 1.7,
    },
    textSlogan: {
        color: style.colors.white.bg,
        fontSize: style.fonts.size.superXLarge,
        textAlign: "center",
        marginTop: 30,
        fontWeight: "bold",
        marginBottom: 60
    },
    actionLogin: {
        gap: 25,
        flex: 1
    }
})
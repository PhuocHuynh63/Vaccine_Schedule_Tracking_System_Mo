import React, { useEffect } from 'react';
import { View, Text, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Shield, Heart, Activity } from 'lucide-react-native';
import { useCheckTokenSplash } from '@utils/hooks/useCheckToken';

const SplashScreen = () => {

    useCheckTokenSplash()

    return (
        <View className="flex-1">
            <StatusBar translucent backgroundColor="transparent" />
            <LinearGradient
                className="flex-1 justify-center items-center w-full h-full"
                colors={['#0A56DF', '#497ee2']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 2 }}
            >
                <View className="w-4/5 items-center">
                    <View className="flex-row mb-8">
                        <Shield width={40} height={40} color="#ffffff" className="mx-2" />
                        <Heart width={40} height={40} color="#ffffff" className="mx-2" />
                        <Activity width={40} height={40} color="#ffffff" className="mx-2" />
                    </View>

                    <Text className="text-4xl font-bold text-white mb-2 text-center">
                        VaccineCare
                    </Text>
                    <Text className="text-lg text-white mb-10 text-center opacity-90">
                        Protecting Health Through Immunization
                    </Text>

                    <View className="bg-white/20 rounded-xl p-5 w-full mb-8">
                        <Text className="text-white text-base mb-2">• Track immunization records</Text>
                        <Text className="text-white text-base mb-2">• Schedule vaccination appointments</Text>
                        <Text className="text-white text-base mb-2">• Get reminders for upcoming vaccines</Text>
                        <Text className="text-white text-base mb-2">• Access health information</Text>
                    </View>
                </View>

                <Text className="absolute bottom-8 text-white opacity-70">
                    © 2025 VaccineCare
                </Text>
            </LinearGradient>
        </View>
    );
};

export default SplashScreen;
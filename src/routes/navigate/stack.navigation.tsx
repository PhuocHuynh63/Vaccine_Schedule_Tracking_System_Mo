import React from 'react'
import { StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { ROUTES } from '..';
import AntDesign from '@expo/vector-icons/AntDesign';
import { iconStyles } from '@styles/icon';
import HeaderBooking from '@organisms/Booking/HeaderBooking';
import VaccinatorProfile from '@screens/VaccinatorProfile';
import ListVaccinatorProfile from '@screens/ServiceProfile';
import VaccinationInfo from '@screens/VaccinationInfo';
import ChooseAuthenScreen from '@screens/Auth/ChooseAuthen';
import SignInScreen from '@screens/Auth/SignIn';
import PasswordScreen from '@screens/Auth/Password';
import AddNewVaccine from '@screens/AddNewVaccine';
import ForgotPasswordScreen from '@screens/Auth/ForgotPassword';
import OTPScreen from '@screens/Auth/OTP';
import SelectFromCart from '@screens/SelectFromCart'
import BottomTabNavigator from './bottomTab.navigation';

const Stack = createStackNavigator();

const StackNavigation = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={ROUTES.LIST_VACCINATOR_PROFILE}
                component={ListVaccinatorProfile}
                options={{
                    header: () =>
                        <HeaderBooking
                            children={'Booking'}
                            icon={<AntDesign name="edit" style={iconStyles.icon} />}
                        />
                }}
            />
            <Stack.Screen
                name={ROUTES.CHOOSE_AUTHEN}
                component={ChooseAuthenScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.HOME_PAGE}
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.SIGNIN}
                component={SignInScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name={ROUTES.PASSWORD}
                component={PasswordScreen}
                options={{ headerShown: false }}
            />
            
            <Stack.Screen
                name={ROUTES.FORGOTPASSWORD}
                component={ForgotPasswordScreen}
                options={{
                    header: () =>
                        <HeaderBooking
                            children='Forgot Password'
                        />
                }}
            />
            <Stack.Screen
                name={ROUTES.OTP}
                component={OTPScreen}
                options={{
                    header: () =>
                        <HeaderBooking
                            children='Forgot Password'
                        />
                }}
            />
            
            <Stack.Screen
                name={ROUTES.VACCINATOR_PROFILE}
                component={VaccinatorProfile}
                options={{
                    header: () =>
                        <HeaderBooking
                            children={'Information on the person vaccinated'}
                            icon={<AntDesign name="edit" style={iconStyles.icon} />}
                        />
                }}
            />
            <Stack.Screen
                name={ROUTES.VACCINATION_INFO}
                component={VaccinationInfo}
                options={{
                    header: () =>
                        <HeaderBooking
                            children={'Information about the person being vaccinated'}
                            icon={<AntDesign name="edit" style={iconStyles.icon} />}
                        />
                }}
            />
            <Stack.Screen
                name={ROUTES.SELECT_FROM_CART}
                component={SelectFromCart}
                options={{
                    header: () =>
                        <HeaderBooking
                            children={'Select from cart'}
                            icon={<AntDesign name="edit" style={iconStyles.icon} />}
                        />
                }}
            />
            <Stack.Screen
                name={ROUTES.ADD_NEW_VACCINE}
                component={AddNewVaccine}
                options={{
                    header: () =>
                        <HeaderBooking
                            children={'Add new vaccine'}
                            icon={<AntDesign name="edit" style={iconStyles.icon} />}
                        />
                }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigation

const styles = StyleSheet.create({})
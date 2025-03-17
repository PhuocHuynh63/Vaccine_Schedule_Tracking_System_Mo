import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ROUTES } from '@routes/index';

// Define the shape of userInfo
type UserInfo = {
    fullName?: string;
    dateOfBirth?: string;
    phone?: string;
    vaccinationCenter?: string;
    expectedDate?: string;
};

// Define the shape of a vaccine (you can adjust this based on your actual data structure)
type Vaccine = {
    id: string;
    name: string;
    price: number;
    diseasePrevention?: string;
};

type RootStackParamList = {
    [ROUTES.CHOOSE_AUTHEN]: undefined;
    [ROUTES.SIGNIN]: undefined;
    [ROUTES.PASSWORD]: { email: string };
    [ROUTES.REGISTER_ACCOUNT]: { email: string };
    [ROUTES.FORGOTPASSWORD]: undefined;
    [ROUTES.OTP]: { email: string };
    [ROUTES.HOME_PAGE]: undefined;
    [ROUTES.LIST_VACCINATOR_PROFILE]: undefined;
    [ROUTES.SELECT_FROM_CART]: { userId: string };
    [ROUTES.ADD_NEW_VACCINE]: { userId: string };
    [ROUTES.CART]: {
        userId: string;
        selectedVaccines?: Vaccine[]; // Array of vaccines
        totalPrice?: number; // Total price in VND
        userInfo?: UserInfo; // User information object
    };
    [ROUTES.VACCINATOR_PROFILE]: { userId: string };
    [ROUTES.VACCINATION_INFO]: {
        users: [{ userId: string }];
        selectedVaccines?: string[];
    };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
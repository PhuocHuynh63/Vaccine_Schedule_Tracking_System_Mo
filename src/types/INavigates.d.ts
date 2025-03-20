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

type Order = {
    id?: string; // Changed from orderId to id to match the server response
    userId?: string;
    vaccines?: {
        vaccineId: string;
        countDoseNumber?: number;
        injectionHistory?: any[];
        nextScheduledDate?: string;
        status?: string;
    }[];
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
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
        selectedVaccines?: Vaccine[];
        totalPrice?: number;
        userInfo?: UserInfo;
        order?: Order; // Use the updated Order type
    };
    [ROUTES.VACCINATOR_PROFILE]: { userId: string };
    [ROUTES.VACCINATION_INFO]: {
        userId: string;
        selectedVaccines?: string[];
    };
};

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList { }
    }
}
import { NavigationProp, useNavigation, StackActions } from "@react-navigation/native"
import { ROUTES } from "@routes/index"
import { SercuseService } from "@services/sercuseService"
import { useEffect } from "react"
import { RootStackParamList } from "src/types/INavigates"

export const useCheckTokenSplash = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    useEffect(() => {
        const checkToken = async () => {
            const token = await SercuseService.get("accessToken");
            setTimeout(() => {
                if (token) {
                    navigation.dispatch(
                        StackActions.replace(ROUTES.HOME_PAGE)
                    );
                } else {
                    navigation.dispatch(
                        StackActions.replace(ROUTES.CHOOSE_AUTHEN)
                    );
                }
            }, 2000);
        };

        checkToken();
    }, []);

    return null
}
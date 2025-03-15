import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomLinearGradient from '@atoms/LinearGradient'
import { Controller, useForm } from 'react-hook-form'
import { blockStyles } from '@styles/block'
import { flexBoxStyles } from '@styles/flexBox'
import { fontStyles } from '@styles/fonts'
import ButtonAction from '../components/ButtonAction'
import { style } from '@themes/index'
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/INavigates'
import { ROUTES } from '@routes/index'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import UserService from '@services/user'
import { SercuseService } from '@services/sercuseService'

const PasswordScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, ROUTES.PASSWORD>>();

    //#region React Hook Form
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        mode: "onChange",
    })

    useEffect(() => {
        if (route.params?.email) {
            reset({ email: route.params.email, password: "" })
        }
    }, [route.params?.email, reset])

    const passwordValue = watch('password')
    const onSubmit = async (data: any) => {
        const res = await UserService.login(data)

        if (res.data.statusCode === 201) {
            const token = res.data.data.access_token
            await SercuseService.set('accessToken', token)
            console.log('🔐 Here\'s your value 🔐 \n' + token);

            navigation.navigate(ROUTES.HOME_PAGE)
        }
        reset();
    }
    //#endregion

    // #region Toggle password visibility
    const [showPassword, setShowPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)
    // #endregion

    return (
        <CustomLinearGradient>
            <View style={styles.title}>
                <Image source={{ uri: 'https://media.istockphoto.com/id/1433173566/vector/mobile-phone-unlocked-notification-button-and-password-field-notice-vector-concept-of.jpg?s=612x612&w=0&k=20&c=Wgfl5Sa6cf3oHVxP0EtHvkUQfhdhHEoM_qdhjGEFnrQ=' }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={{ color: style.colors.white.text, fontSize: 18 }}>Welcome back!</Text>
                <Text style={[fontStyles.fontButton, styles.titleMain]}>HUYNH MINH PHUOC</Text>
                <Text style={{ color: style.colors.white.text, fontSize: 15 }}>{route.params.email}</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                <View style={styles.containerForm}>
                    <Controller
                        control={control}
                        name='email'
                        render={({ field }) => <TextInput {...field} style={{ display: 'none' }} />}
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: true,
                            minLength: 6,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <Text style={blockStyles.label}>Password</Text>
                                <View style={[blockStyles.input, flexBoxStyles.centerRowSpaceBetween]}>
                                    <TextInput
                                        secureTextEntry={!showPassword}
                                        placeholder="Password"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                    />
                                    <FontAwesome5 name={`${showPassword ? 'eye' : 'eye-slash'}`} size={17} color="black" onPress={handleShowPassword} />
                                </View>
                            </View>
                        )}
                        name="password"
                    />

                    <ButtonAction
                        style={[styles.button, blockStyles.main]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={!passwordValue || !isValid}
                    >
                        <Text style={{ color: style.colors.white.bg }}>Next</Text>
                    </ButtonAction>

                    <View style={[flexBoxStyles.centerRowSpaceBetween, { marginHorizontal: 30 }]}>
                        <View style={flexBoxStyles.centerRow}>
                            <Entypo name="cycle" size={16} color={style.colors.blue.bg} style={{ marginRight: 5 }} />
                            <Text style={[fontStyles.oppositeFont, { fontSize: 14 }]} onPress={() => navigation.goBack()}>Change email</Text>
                        </View>
                        {/* TODO: Forgot password */}
                        <Text style={[fontStyles.oppositeFont, { fontSize: 14 }]} onPress={() => navigation.navigate(ROUTES.FORGOTPASSWORD)}>Forgot password?</Text>
                    </View>
                </View>

                <View style={styles.spacing}>
                </View>
            </View>
        </CustomLinearGradient >
    )
}

export default PasswordScreen


const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    title: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1.8,
        gap: 8,
    },
    titleMain: {
        fontSize: 24,
    },
    form: {
        flex: 2.8,
        gap: 20,
    },
    containerForm: {
        gap: 20,
        backgroundColor: style.colors.white.bg,
        borderRadius: style.sizes.borderRadius.br_13,
        marginHorizontal: 30,
        paddingVertical: 30,
    },
    button: {
        height: 45
    },
    spacing: {
        flex: 3
    }
})

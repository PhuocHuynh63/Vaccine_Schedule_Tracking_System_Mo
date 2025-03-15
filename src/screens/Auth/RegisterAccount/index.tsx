"use client"

import { Image, StyleSheet, Text, TextInput, View } from "react-native"
import { useState } from "react"
import CustomLinearGradient from "@atoms/LinearGradient"
import { Controller, useForm } from "react-hook-form"
import { blockStyles } from "@styles/block"
import { flexBoxStyles } from "@styles/flexBox"
import { fontStyles } from "@styles/fonts"
import ButtonAction from "../components/ButtonAction"
import { style } from "@themes/index"
import { type NavigationProp, type RouteProp, useNavigation, useRoute } from "@react-navigation/native"
import type { RootStackParamList } from "src/types/INavigates"
import type { ROUTES } from "@routes/index"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import Entypo from "@expo/vector-icons/Entypo"

const RegisterAccount = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()
    const route = useRoute<RouteProp<RootStackParamList, ROUTES.REGISTER_ACCOUNT>>()

    //#region React Hook Form
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        reset,
    } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        mode: "onChange",
    })

    const password = watch("password")
    const confirmPassword = watch("confirmPassword")

    const onSubmit = (data: any) => {
        console.log(data)
        // TODO: Register user with email and password
        // You can add your registration logic here
        reset()
        // Navigate to success screen or home screen after registration
    }
    //#endregion

    // #region Toggle password visibility
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const handleShowPassword = () => setShowPassword(!showPassword)
    const handleShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword)
    // #endregion

    return (
        <CustomLinearGradient>
            <View style={styles.title}>
                <Image
                    source={{
                        uri: "https://cdn.prod.website-files.com/6642dc4d079fead3f94f5a55/664d91a1c6be636fff0a2f5d_intl-remittance-4.png",
                    }}
                    style={{ width: 100, height: 100, borderRadius: 50 }}
                />
                <Text style={[fontStyles.fontButton, styles.titleMain]}>Create Account</Text>
                <Text style={{ color: style.colors.white.text, fontSize: 15 }}>{route.params.email}</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
                <View style={styles.containerForm}>
                    <Controller
                        control={control}
                        rules={{
                            required: "Password is required",
                            minLength: {
                                value: 6,
                                message: "Password must be at least 6 characters",
                            },
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
                                        style={{ flex: 1 }}
                                    />
                                    <FontAwesome5
                                        name={`${showPassword ? "eye" : "eye-slash"}`}
                                        size={17}
                                        color="black"
                                        onPress={handleShowPassword}
                                    />
                                </View>
                                {errors.password && (
                                    <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>{errors.password.message}</Text>
                                )}
                            </View>
                        )}
                        name="password"
                    />

                    <Controller
                        control={control}
                        rules={{
                            required: "Confirm password is required",
                            validate: (value) => value === password || "Passwords do not match",
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View>
                                <Text style={blockStyles.label}>Confirm Password</Text>
                                <View style={[blockStyles.input, flexBoxStyles.centerRowSpaceBetween]}>
                                    <TextInput
                                        secureTextEntry={!showConfirmPassword}
                                        placeholder="Confirm Password"
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        value={value}
                                        style={{ flex: 1 }}
                                    />
                                    <FontAwesome5
                                        name={`${showConfirmPassword ? "eye" : "eye-slash"}`}
                                        size={17}
                                        color="black"
                                        onPress={handleShowConfirmPassword}
                                    />
                                </View>
                                {errors.confirmPassword && (
                                    <Text style={{ color: "red", fontSize: 12, marginTop: 5 }}>{errors.confirmPassword.message}</Text>
                                )}
                            </View>
                        )}
                        name="confirmPassword"
                    />

                    <ButtonAction
                        style={[styles.button, blockStyles.main]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={!password || !confirmPassword || !isValid}
                    >
                        <Text style={{ color: style.colors.white.bg }}>Create Account</Text>
                    </ButtonAction>

                    <View style={[flexBoxStyles.centerRow, { justifyContent: "center" }]}>
                        <Entypo name="cycle" size={16} color={style.colors.blue.bg} style={{ marginRight: 5 }} />
                        <Text style={[fontStyles.oppositeFont, { fontSize: 14 }]} onPress={() => navigation.goBack()}>
                            Change email
                        </Text>
                    </View>
                </View>

                <View style={styles.spacing}></View>
            </View>
        </CustomLinearGradient>
    )
}

export default RegisterAccount

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    title: {
        alignItems: "center",
        justifyContent: "center",
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
        height: 45,
    },
    spacing: {
        flex: 3,
    },
})


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { blockStyles } from '@styles/block'
import { flexBoxStyles } from '@styles/flexBox'
import { TextInput } from 'react-native-gesture-handler'
import { style } from '@themes/index'
import ButtonAction from '../components/ButtonAction'
import { AuthStyles } from '@styles/auth'
import { fontStyles } from '@styles/fonts'
import { NavigationProp, useNavigation } from '@react-navigation/native'
import { RootStackParamList } from 'src/types/INavigates'
import { ROUTES } from '@routes/index'

const ForgotPasswordScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>()

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
        },
        mode: "onChange",
    })

    const emailValue = watch('email')
    const onSubmit = (data: any) => {
        navigation.navigate(ROUTES.OTP, { email: data.email })
        reset()
    }
    //#endregion

    return (
        <View style={[AuthStyles.main]}>
            <View style={styles.text}>
                <Text style={fontStyles.titleHeading}>Input Email</Text>
                <Text>Input the email address you registered to reset your password. The system will send an OTP authenication to this phone number.</Text>
            </View>

            <View>
                <View>
                    <Controller
                        control={control}
                        rules={{
                            required: "Email is required.",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email address."
                            },
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                            <View style={[blockStyles.input, flexBoxStyles.centerRowSpaceBetween, { marginBottom: 20 }]}>
                                <TextInput
                                    placeholder="Input your mail"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            </View>

                        )}
                        name="email"
                    />

                    <ButtonAction
                        style={[blockStyles.main]}
                        onPress={handleSubmit(onSubmit)}
                        disabled={!emailValue || !isValid}
                    >
                        <Text style={{ color: style.colors.white.bg }}>Send request</Text>
                    </ButtonAction>
                </View>
            </View>
        </View>
    )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    text: {
        marginHorizontal: 25,
        marginVertical: 20,
        gap: 8
    }
})
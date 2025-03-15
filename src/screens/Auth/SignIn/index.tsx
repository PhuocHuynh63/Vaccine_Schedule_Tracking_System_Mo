import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { fontStyles } from '@styles/fonts'
import { Controller, useForm } from 'react-hook-form'
import { blockStyles } from '@styles/block'
import { flexBoxStyles } from '@styles/flexBox'
import ButtonAction from '../components/ButtonAction'
import { style } from '@themes/index'
import CustomLinearGradient from '@atoms/LinearGradient'
import { NavigationProp, useNavigation } from '@react-navigation/core'
import { RootStackParamList } from 'src/types/INavigates'
import { ROUTES } from '@routes/index'
import UserService from '@services/user'

const SignInScreen = () => {

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
  const onSubmit = async (data: any) => {
    const isEmailExist = await UserService.isEmailExists(data.email)
    if (isEmailExist) {
      navigation.navigate(ROUTES.PASSWORD, { email: data.email })
    } else {
      navigation.navigate(ROUTES.REGISTER_ACCOUNT, { email: data.email })
    }
    reset()
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
        <Image source={{ uri: 'https://cdn.prod.website-files.com/6642dc4d079fead3f94f5a55/664d91a1c6be636fff0a2f5d_intl-remittance-4.png' }}
          style={{ width: 100, height: 100 }}
        />
        <Text style={[fontStyles.fontButton, styles.titleMain]}>Input Email</Text>
        <Text style={{ color: style.colors.white.text, fontSize: 15 }}>Use your email to register or log in.</Text>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <View style={styles.containerForm}>
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
              <View>
                <Text style={blockStyles.label}>Email</Text>
                <View style={[blockStyles.input, flexBoxStyles.centerRowSpaceBetween]}>
                  <TextInput
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                </View>
              </View>
            )}
            name="email"
          />

          <ButtonAction
            style={[styles.button, blockStyles.main]}
            onPress={handleSubmit(onSubmit)}
            disabled={!emailValue || !isValid}
          >
            <Text style={{ color: style.colors.white.bg }}>Next</Text>
          </ButtonAction>
        </View>

        <View style={styles.spacing}>
        </View>
      </View>
    </CustomLinearGradient >
  )
}

export default SignInScreen

const styles = StyleSheet.create({
  main: {
    flex: 1,
  },
  title: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1.5,
    gap: 13,
  },
  titleMain: {
    fontSize: 24,
  },
  form: {
    flex: 2.8,
    gap: 20,
  },
  containerForm: {
    gap: 30,
    backgroundColor: style.colors.white.bg,
    borderRadius: style.sizes.borderRadius.br_13,
    marginHorizontal: 20,
    paddingVertical: 30,
  },
  button: {
    height: 45
  },
  spacing: {
    flex: 3
  }
})


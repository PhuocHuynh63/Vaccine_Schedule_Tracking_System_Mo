import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { style } from '@themes/index';

const Vaccine = ({ img }: any) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: img }} style={{ width: 46, height: 46, borderRadius: 44 }} />
        </View>
    )
}

export default Vaccine

const styles = StyleSheet.create({
    container: {
        height: 52,
        width: 52,
        borderRadius: 52,
        borderWidth: 1,
        borderColor: style.colors.grey.line,
        justifyContent: 'center',
        alignItems: 'center',
    },
    background: {
        height: 46,
        width: 46,
        borderRadius: 44,
        backgroundColor: style.colors.grey.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        fontSize: style.fonts.size.superXLarge,
        color: style.colors.grey.bgDark,
    }
})
import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Button } from '@atoms/Button'
import { style } from '@themes/index'

const SelectVaccinationSite = ({ children, onPress  }: { children: React.ReactNode; onPress?: () => void; }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            {children}
        </TouchableOpacity>
    )
}

export default SelectVaccinationSite

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: style.colors.grey.line,
        padding: 10,
        marginHorizontal: style.sizes.margin.m_12,
        marginTop: style.sizes.margin.m_8,
        marginBottom: style.sizes.margin.m_20,
        borderRadius: style.sizes.borderRadius.br_7,
    },

})
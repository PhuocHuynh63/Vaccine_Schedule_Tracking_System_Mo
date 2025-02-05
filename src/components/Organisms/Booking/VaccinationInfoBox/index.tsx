import React, { useEffect, useRef, useState } from 'react'
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { style } from '@themes/index'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Feather from '@expo/vector-icons/Feather';
import SelectVaccinationSite from './components/Select';
import { fontStyles } from '@styles/fonts';
import ButtonAction from './components/Button';
import { blockStyles } from '@styles/block';
import { flexBoxStyles } from '@styles/flexBox';

const VaccinationInfoBox = () => {

    /**
     * close or open detail user info
     */
    const [showDetail, setShowDetail] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(heightAnim, {
            toValue: showDetail ? 200 : 0,
            duration: 300,
            useNativeDriver: false
        }).start();
    }, [showDetail]);

    const toggleDetail = () => {
        setShowDetail(prevState => !prevState);
    };
    //----------------------End----------------------//

    return (
        <View style={styles.container}>
            <View style={styles.boxContainer}>
                <View style={styles.boxHeader}>
                    <Text style={styles.fullname}>HUỲNH MINH PHƯỚC</Text>
                    <View style={styles.boxAction}>
                        <TouchableOpacity activeOpacity={0.7}>
                            <MaterialIcons name="edit" size={24} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7}>
                            <Ionicons name="trash" size={24} color={style.colors.red.bg} />
                        </TouchableOpacity>
                    </View>
                </View>


                <View style={styles.detailUserContainer}>
                    <TouchableOpacity style={styles.titleDetail} activeOpacity={0.8} onPress={toggleDetail}>
                        <Text style={styles.textTitle}>Details of the person vaccinated</Text>
                        {
                            showDetail ?
                                <FontAwesome5 name="chevron-up" size={18} color={style.colors.blue.bg} /> :
                                <FontAwesome5 name="chevron-down" size={18} color={style.colors.blue.bg} />
                        }
                    </TouchableOpacity>
                    {
                        showDetail &&
                        <Animated.View style={[{ gap: 5, marginTop: style.sizes.margin.m_12, marginBottom: style.sizes.margin.m_16 }, { height: heightAnim }]}>
                            <View style={styles.detailUserInfo}>
                                <Text style={styles.textTitleDetail}>Fullname </Text>
                                <Text style={styles.textContentDetail}>HUỲNH MINH PHƯỚC</Text>
                            </View>
                            <View style={styles.detailUserInfo}>
                                <Text style={styles.textTitleDetail}>Phone </Text>
                                <Text style={styles.textContentDetail}>0123456789</Text>
                            </View>
                            <View style={styles.detailUserInfo}>
                                <Text style={styles.textTitleDetail}>Birthday </Text>
                                <Text style={styles.textContentDetail}>06/03/1999</Text>
                            </View>
                            <View style={styles.detailUserInfo}>
                                <Text style={styles.textTitleDetail}>Relationship </Text>
                                <Text style={styles.textContentDetail}>Me</Text>
                            </View>
                            <View style={styles.detailUserInfo}>
                                <Text style={styles.textTitleDetail}>Sex </Text>
                                <Text style={styles.textContentDetail}>Male</Text>
                            </View>
                            <View style={styles.detailUserInfo}>
                                <Text style={styles.textTitleDetail}>Email </Text>
                                <Text style={styles.textContentDetail}>Updating</Text>
                            </View>
                            <View style={styles.detailUserInfo}>
                                <Text style={styles.textTitleDetail}>Address </Text>
                                <Text style={styles.textContentDetail}>10 Lê Văn Việt, Phường 2, Thành Phố Thủ Đức, Tỉnh Tiền Giang</Text>
                            </View>
                        </Animated.View>
                    }
                </View>


                <View>
                    <View>
                        <Text style={styles.vaccineInfo}>
                            Select the desired vaccination center <Text style={[styles.vaccineInfo, { color: style.colors.red.bg, fontWeight: 'bold' }]}>*</Text>
                        </Text>

                        <SelectVaccinationSite>
                            <Text style={styles.textSelect}>Select Vaccination Site</Text>
                            <Entypo name="chevron-small-right" size={24} color="black" />
                        </SelectVaccinationSite>
                    </View>

                    <View>
                        <Text style={styles.vaccineInfo}>
                            Select vaccination date <Text style={[styles.vaccineInfo, { color: style.colors.red.bg, fontWeight: 'bold' }]}>*</Text>
                        </Text>

                        <SelectVaccinationSite>
                            <Text style={styles.textSelect}>Select Date</Text>
                            <FontAwesome name="calendar" size={18} color="black" />
                        </SelectVaccinationSite>
                    </View>

                    <View>
                        <Text style={styles.vaccineInfo}>
                            Select vaccination <Text style={[styles.vaccineInfo, { color: style.colors.red.bg, fontWeight: 'bold' }]}>*</Text>
                        </Text>

                        <View style={styles.cartEmpty}>
                            <FontAwesome5 name="list-alt" size={100} color="rgba(106,107,187,0.2)" />
                            <Text style={styles.textCartEmpty}>List of vaccines to buy is empty</Text>
                        </View>
                    </View>

                    <View style={styles.actionButton}>
                        <ButtonAction>
                            <FontAwesome5 name="shopping-cart" size={18} color={style.colors.white.bg} style={{ marginRight: 7 }} />
                            <Text style={[fontStyles.fontButton]}>Add to cart</Text>
                        </ButtonAction>
                        <ButtonAction style={[blockStyles.oppositeBlock]}>
                            <Text style={[fontStyles.fontButton, fontStyles.oppositeFont]}>Add new vaccine</Text>
                        </ButtonAction>
                    </View>

                    <View style={[flexBoxStyles.centerColumn]}>
                        <Feather name="chevrons-up" size={24} color="black" />
                    </View>
                </View>



            </View>
        </View>
    )
}

export default VaccinationInfoBox

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    boxContainer: {
        borderWidth: 1,
        borderColor: style.colors.grey.line,
        borderRadius: style.sizes.borderRadius.br_5,
        marginHorizontal: style.sizes.margin.m_20,
        marginVertical: style.sizes.margin.m_20,
    },
    boxHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: style.colors.grey.bgLight,
        borderRadius: style.sizes.borderRadius.br_5,
        padding: style.sizes.padding.p_14,
    },
    fullname: {
        fontSize: style.fonts.size.xlarge,
        fontWeight: '600',
    },
    boxAction: {
        flexDirection: 'row',
    },
    detailUserContainer: {
        padding: style.sizes.padding.p_14,
    },
    titleDetail: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    textTitle: {
        fontSize: style.fonts.size.large,
        fontWeight: '600',
        color: style.colors.blue.bg,
        marginRight: style.sizes.margin.m_12,
    },
    detailUserInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        flexWrap: 'wrap',
    },
    textTitleDetail: {
        fontWeight: '600',
        color: style.colors.grey.bg,
    },
    textContentDetail: {
        fontWeight: '600',
    },
    vaccineInfo: {
        fontSize: style.fonts.size.large,
        marginLeft: style.sizes.margin.m_12,
    },
    textSelect: {
        color: style.colors.grey.textLight,
        fontSize: style.fonts.size.large,
        textAlign: 'left',
    },
    cartEmpty: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 30,
    },
    textCartEmpty: {
        fontSize: style.fonts.size.large,
        color: style.colors.grey.textLight,
        marginTop: style.sizes.margin.m_8,
    },
    actionButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: style.sizes.margin.m_8,
        marginBottom: style.sizes.margin.m_20,
    },

})
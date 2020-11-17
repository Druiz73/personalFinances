import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
//redux
import { useSelector, useDispatch } from 'react-redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';
//components
import Header from '../../components/Header'

type ExchangesScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.Exchanges>;

interface ExchangesScreenProps {
    navigation: ExchangesScreenNavigationProps;
}

const Exchanges: React.FC<ExchangesScreenProps> = (props) => {
    const { navigation } = props;

    const [exchanges, setExchanges] = useState('')
    const dispatch = useDispatch();

    useEffect(() => {

    })

    return (
        <View style={styles.navigation}>
            <View >
                <Header title="Monedas" Navigation={() => navigation.navigate(AppScreens.Home)} />
            </View>
            <View style={styles.body}>

            </View>
            <View style={styles.footerExchange}>
                <Icon5 style={styles.iconAdd} onPress={() => navigation.navigate(AppScreens.NewExchanges)} name={'plus'} size={30} color="#2C1FE8" />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    navigation: {
        flex: 1,
        backgroundColor: '#2C1FE8',
    },
    title: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 20
    },
    body: {
        flex: 9,
        backgroundColor: 'white'
    },
    iconBack: {
        margin: 15
    },
    footerExchange: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: 'center',
        backgroundColor: "#FFFF",
        padding: 30,

    },
    iconAdd: {
        marginRight: 15
    }
})
export default Exchanges;
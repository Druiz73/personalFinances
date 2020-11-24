import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';
import IconAdd from '../../components/IconAdd';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, startGetCurrency, startRemoveCurrency } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';
//components
import Header from '../../components/Header'
import ItemList from '../../components/ItemList'

type CurrencyScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.Currency>;

interface CurrencyScreenProps {
    navigation: CurrencyScreenNavigationProps;
    currencies: [];
    currency: Object;
    delete: Function
}

const Exchanges: React.FC<CurrencyScreenProps> = (props) => {
    const { navigation } = props;

    const dispatch = useDispatch();

    const { currencies } = useSelector(
        (state: ApplicationState) => state.CurrencyReducer
    );

    useEffect(() => {
        if (currencies.length == 0) {
            dispatch(startGetCurrency());
        }
    }, [currencies])

    //funcion para eliminar categoria
    const deleteCurrency = (id: string) => {
        dispatch(startRemoveCurrency(id));
    }

    //muestra las categorias
    const renderItem = () => {
        return (
            <FlatList
                data={currencies}
                renderItem={({ item }) => (
                    <ItemList
                        title={item.name}
                        onRemove={() => deleteCurrency(item.id)}
                        subtitle={item.abreviature}
                    />
                )}
                keyExtractor={currency => (currency.id).toString()}
            />
        )
    };

    return (
        <View style={styles.navigation}>
            <View >
                <Header title="Monedas" />
            </View>
            <View style={styles.body}>
                {
                    currencies.length > 0 ?
                        <View >
                            {
                                renderItem()
                            }
                        </View>
                        :
                        <Text >no existen categorias</Text>
                }
            </View>
            <TouchableOpacity style={styles.footerExchange}>
                <IconAdd size={30} name="plus" color="blue" linkTo={() => navigation.navigate(AppScreens.NewCurrency)} />
            </TouchableOpacity>
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
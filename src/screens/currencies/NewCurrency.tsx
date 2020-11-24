import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import { TextField } from '../../components/TextField';
import Button from '../../components/Button';
import Header from '../../components/Header';
import Toast from 'react-native-simple-toast';
//redux
import { useDispatch, useSelector } from 'react-redux';
import { startAddCurrency, ApplicationState } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';


type NewExchangeScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.NewCurrency>;

interface NewExchangeScreenProps {
    navigation: NewExchangeScreenNavigationProps;
}


const NewExchange: React.FC<NewExchangeScreenProps> = (props) => {

    const { navigation } = props;
    const dispatch = useDispatch();

    const [ExchangeState, setExchange] = useState('')
    const [Abreviature, setAbreviature] = useState('')

    const { message } = useSelector(
        (state: ApplicationState) => state.CurrencyReducer
    );

    useEffect(() => {
        if (message) {
            Toast.show(message, Toast.SHORT)
        }
    }, [message])


    const onTapSaveExchange = (ExchangeState: string, Abreviature: string) => {
        if (ExchangeState == '' || Abreviature == '') {
            Toast.show("Datos invalidos", Toast.SHORT, [Toast.CENTER])
        } else {
            dispatch(startAddCurrency(ExchangeState, Abreviature))
            setTimeout(() => {
                navigation.navigate(AppScreens.Currency)
            }, 500);
        }
    };


    return (
        <View>
            <View>
                <Header title="New Exchange" />
            </View>
            <View style={styles.body}>
                <TextField textContentType="name" placeholder='Agregar Categoria' onTextChange={setExchange} />
                <TextField textContentType="name" placeholder='Abreviatura' onTextChange={setAbreviature} />
            </View>
            <Button title='Agregar' onTap={() => onTapSaveExchange(ExchangeState, Abreviature)}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        color: '#FFF',
        textAlign: 'center',
        marginTop: 40
    },
    body: {},
    iconBack: {
        margin: 15
    }
})
export default NewExchange;
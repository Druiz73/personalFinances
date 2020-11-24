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
import { startAddClient, ApplicationState } from '../../redux';
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

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Birthday, setBirthday] = useState(Date.now())

    const { message } = useSelector(
        (state: ApplicationState) => state.CurrencyReducer
    );

    useEffect(() => {
        if (message) {
            Toast.show(message, Toast.SHORT)
        }
    }, [message])


    const onTapSaveExchange = (Name: string, Email: string, Birthday: number) => {
        if (Name == '' || Email == '') {
            Toast.show("Datos invalidos", Toast.SHORT, [Toast.CENTER])
        } else {
            dispatch(startAddClient(Name, Email, Birthday))
            setTimeout(() => {
                navigation.navigate(AppScreens.Clients)
            }, 500);
        }
    };


    return (
        <View>
            <View>
                <Header title="New Client" />
            </View>
            <View style={styles.body}>
                <TextField placeholder='Nombre' onTextChange={setName} />
                <TextField placeholder='Email' onTextChange={setEmail} />
                <TextField placeholder='Birthday' onTextChange={setBirthday} />
            </View>
            <Button title='Agregar' onTap={() => onTapSaveExchange(Name, Email, Birthday)} />
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
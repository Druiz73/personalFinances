import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
//components
import { TextField } from '../../components/TextField';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, startEditCurrency } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';



type EditCurrencyScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.EditCurrency>;

interface EditCurrencyScreenProps {
    navigation: EditCurrencyScreenNavigationProps;
}


const EditCurrency: React.FC<EditCurrencyScreenProps> = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const [name, setname] = useState('')
    const [abreviature, setAbreviature] = useState('')

    const { currency, message } = useSelector(
        (state: ApplicationState) => state.CurrencyReducer
    );

    const onTapSaveEdit = () => {
        if (name == '') {
            Toast.show("Datos invalidos", Toast.SHORT, [Toast.TOP])
        } else {
            dispatch(startEditCurrency(currency.id, name, abreviature));
            setTimeout(() => {
                Toast.show(message, Toast.SHORT, [Toast.TOP])
                navigation.navigate(AppScreens.Currency)
            }, 500);
        }
    }

    return (
        <View>
            <Header title="Edit Currency" />
            <View style={styles.body}>
                <TextField textContentType="name" placeholder={currency.name} onTextChange={setname} />
                <TextField textContentType="name" placeholder={currency.abreviature} onTextChange={setAbreviature} />
            </View>
            <Button title='Guardar' onTap={onTapSaveEdit}></Button>
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

export default EditCurrency;
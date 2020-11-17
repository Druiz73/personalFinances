import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { TextField } from '../../components/TextField';
import { Button } from '../../components/Button';
import Header from '../../components/Header';
//redux
import { useDispatch } from 'react-redux';

//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';

type NewExchangeScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.NewExchanges>;

interface NewExchangeScreenProps {
    navigation: NewExchangeScreenNavigationProps;
}


const NewExchange: React.FC<NewExchangeScreenProps> = (props) => {

    const { navigation } = props;
    const dispatch = useDispatch();

    const [ExchangeState, setExchange] = useState('')

    console.log(ExchangeState)
    const onTapSaveExchange = (ExchangeState: String) => {
        // dispatch(startAddExchange(ExchangeState))
    };


    return (
        <View>
            <View style={styles.navigation}>
                <Header title="New Exchange" Navigation={navigation.goBack} />
            </View>
            <View style={styles.body}>
                <TextField placeholder='Agregar Categoria' onTextChange={setExchange} />
            </View>
            <Button title='Agregar' onTap={() => onTapSaveExchange(ExchangeState)}></Button>
        </View>
    )
}

const styles = StyleSheet.create({
    navigation: {
        backgroundColor: '#2C1FE8',
        height: 170,
    },
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
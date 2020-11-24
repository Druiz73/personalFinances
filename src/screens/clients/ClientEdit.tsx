import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
//components
import { TextField } from '../../components/TextField';
import Header from '../../components/Header';
import Button from '../../components/Button';
import Toast from 'react-native-simple-toast';
//redux
import { useSelector, useDispatch } from 'react-redux';
import { ApplicationState, startEditClient } from '../../redux';
//navigation
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList, AppScreens } from '../../useNavigation';



type EditClientScreenNavigationProps = StackNavigationProp<StackParamList, AppScreens.ClientEdit>;

interface EditClientScreenProps {
    navigation: EditClientScreenNavigationProps;
}


const ClientEdit: React.FC<EditClientScreenProps> = (props) => {
    const { navigation } = props;
    const dispatch = useDispatch();

    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [date_of_birth, setDateofbirth] = useState('')

    const { client } = useSelector(
        (state: ApplicationState) => state.ClientReducer
    );

    const onTapSaveEdit = () => {

        if (name == '' || email == '' || date_of_birth == '') {
            Toast.show("Datos invalidos", Toast.SHORT, [Toast.TOP])
        } else {
            dispatch(startEditClient(client.id, name, email, parseInt(date_of_birth)))
            setTimeout(() => {
                navigation.navigate(AppScreens.Clients)
            }, 500);
        }

    }

    return (
        <View>
            <Header title="Edit Client" />
            <View style={styles.body}>
                <TextField textContentType="name" placeholder={client.name} onTextChange={setname} />
                <TextField textContentType="emailAddress" placeholder={client.email} onTextChange={setEmail} />
                <TextField textContentType="oneTimeCode" placeholder={(client.date_of_birth).toString()} onTextChange={setDateofbirth} />
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

export default ClientEdit;